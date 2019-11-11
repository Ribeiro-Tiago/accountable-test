import { Router } from "express";

import govtRoutes from "./government.route";

const router = Router();

/** GET /health-check - Check service health */
router.get("/health-check", (_req, res) => res.send("OK"));

router.use("/government", govtRoutes);

export default router;
