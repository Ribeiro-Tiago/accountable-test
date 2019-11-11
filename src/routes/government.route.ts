import { Router, Response, Request } from "express";

import * as controller from "../controllers/government.controller";

const router = Router();

router.get("/balance", async (_req: Request, res: Response) => res.json(await controller.getGovtBalance()));

export default router;
