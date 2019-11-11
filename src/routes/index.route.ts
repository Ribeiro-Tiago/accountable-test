import { Router } from "express";

import govtRoutes from "./government.route";
import traderRoutes from "./trader.route";

const router = Router();

/** GET /health-check - Check service health */
router.get("/health-check", (_req, res) => res.send("OK"));

router.use("/government", govtRoutes);

router.use("/trader", traderRoutes);

export default router;
