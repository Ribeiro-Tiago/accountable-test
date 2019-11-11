import { Router, Response, Request } from "express";

import * as controller from "../controllers/trader.controller";

const router = Router();

router.post("/", async (_req: Request, res: Response) => res.json(await controller.createTrader()));

export default router;
