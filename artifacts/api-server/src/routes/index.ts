import { Router, type IRouter } from "express";
import healthRouter from "./health";
import diagnosisRouter from "./diagnosis";

const router: IRouter = Router();

router.use(healthRouter);
router.use(diagnosisRouter);

export default router;
