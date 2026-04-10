import { Router, type IRouter } from "express";
import { desc, eq, sql } from "drizzle-orm";
import { db, responsesTable } from "@workspace/db";
import { SubmitAnswersBody, GetResponseParams } from "@workspace/api-zod";
import { getDiagnosis } from "../lib/ayurveda";

const router: IRouter = Router();

router.post("/submit-answers", async (req, res): Promise<void> => {
  const parsed = SubmitAnswersBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { answers } = parsed.data;
  const { scores, output } = getDiagnosis(answers as Record<string, string>);

  const [stored] = await db
    .insert(responsesTable)
    .values({
      answers,
      result: output.dosha,
      vataScore: scores.vata,
      pittaScore: scores.pitta,
      kaphaScore: scores.kapha,
    })
    .returning();

  req.log.info({ id: stored.id, result: output.dosha }, "Diagnosis saved");

  res.status(201).json({
    id: stored.id,
    result: output.dosha,
    vataScore: scores.vata,
    pittaScore: scores.pitta,
    kaphaScore: scores.kapha,
    description: output.description,
    recommendations: output.recommendations,
    createdAt: stored.createdAt.toISOString(),
  });
});

router.get("/responses", async (req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(responsesTable)
    .orderBy(desc(responsesTable.createdAt));

  res.json(
    rows.map((r) => ({
      id: r.id,
      answers: r.answers,
      result: r.result,
      vataScore: r.vataScore,
      pittaScore: r.pittaScore,
      kaphaScore: r.kaphaScore,
      createdAt: r.createdAt.toISOString(),
    }))
  );
});

router.get("/responses/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetResponseParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .select()
    .from(responsesTable)
    .where(eq(responsesTable.id, params.data.id));

  if (!row) {
    res.status(404).json({ error: "Response not found" });
    return;
  }

  res.json({
    id: row.id,
    answers: row.answers,
    result: row.result,
    vataScore: row.vataScore,
    pittaScore: row.pittaScore,
    kaphaScore: row.kaphaScore,
    createdAt: row.createdAt.toISOString(),
  });
});

router.get("/stats", async (_req, res): Promise<void> => {
  const rows = await db.select().from(responsesTable);
  const total = rows.length;
  const vataCount = rows.filter((r) => r.result === "Vata").length;
  const pittaCount = rows.filter((r) => r.result === "Pitta").length;
  const kaphaCount = rows.filter((r) => r.result === "Kapha").length;

  res.json({ total, vataCount, pittaCount, kaphaCount });
});

export default router;
