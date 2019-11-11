import { Router, Response, Request } from "express";

import * as controller from "../controllers/trader.controller";
import { executer } from "../utils/executer/executer";

const router = Router();

router.get("/", async (req: Request, res: Response) => executer(res, controller.listTraders, req.query.page));

router.get("/:id", async (req: Request, res: Response) => executer(res, controller.traderDetails, req.params.id));

router.post("/", async (_req: Request, res: Response) => executer(res, controller.createTrader));

export default router;
