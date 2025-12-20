import { Router } from "express";

const router = Router();

/**
 * Public health check
 * GET /v1/health
 */
router.get("/", (_req, res) => {
    res.status(200).json({ ok: true });
});

export default router;
