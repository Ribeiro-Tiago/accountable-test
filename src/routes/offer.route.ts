import { Router, Response, Request } from "express";

import * as controller from "../controllers/offer.controller";
import { executer } from "../utils/executer/executer";

const router = Router();

/**
 * GET /?page=1
 * page not required
 */
router.get("/", async (req: Request, res: Response) => executer(res, controller.listOffers, req.query.page));

router.get("/:id", async (req: Request, res: Response) => executer(res, controller.offerDetails, req.params.id));

router.post("/", async (req: Request, res: Response) => executer(res, controller.createOffer, req.body));

/**
 * GET /accept?buyer=some-id
 */
router.post("/:id/accept", async (req: Request, res: Response) =>
	executer(res, controller.acceptOffer, req.params.id, req.query.buyer));

export default router;
