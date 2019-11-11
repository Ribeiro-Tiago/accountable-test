import { Router } from "express";

import govtRoutes from "./government.route";
import traderRoutes from "./trader.route";
import offerRoutes from "./offer.route";

const router = Router();

/** GET /health-check - Check service health */
router.get("/health-check", (_req, res) => res.send("OK"));

router.use("/government", govtRoutes);
router.use("/trader", traderRoutes);
router.use("/offer", offerRoutes);

export default router;
