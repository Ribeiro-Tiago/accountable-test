import { Router, Response, Request } from "express";

import * as controller from "../controllers/government.controller";
import { executer } from "../utils/executer/executer";

const router = Router();

router.get("/balance", async (_req: Request, res: Response) => executer(res, controller.getGovtBalance));

export default router;
