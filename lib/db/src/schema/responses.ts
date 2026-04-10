import { pgTable, text, serial, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const responsesTable = pgTable("users_responses", {
  id: serial("id").primaryKey(),
  answers: jsonb("answers").notNull(),
  result: text("result").notNull(),
  vataScore: integer("vata_score").notNull().default(0),
  pittaScore: integer("pitta_score").notNull().default(0),
  kaphaScore: integer("kapha_score").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertResponseSchema = createInsertSchema(responsesTable).omit({ id: true, createdAt: true });
export type InsertResponse = z.infer<typeof insertResponseSchema>;
export type Response = typeof responsesTable.$inferSelect;
