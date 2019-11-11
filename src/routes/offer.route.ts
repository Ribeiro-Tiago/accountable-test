import { Router, Response, Request } from "express";

import * as controller from "../controllers/offer.controller";
import { executer } from "../utils/executer/executer";

const router = Router();

router.get("/", async (_req: Request, res: Response) => executer(res, controller.listOffers));

router.get("/:id", async (req: Request, res: Response) => executer(res, controller.offerDetails, req.params.id));

router.post("/", async (req: Request, res: Response) => executer(res, controller.createOffer, req.body));

router.post("/accept", async (_req: Request, res: Response) => executer(res, controller.acceptOffer));

export default router;
