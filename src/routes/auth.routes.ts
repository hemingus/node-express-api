import { Router } from "express";
import { login, refresh, logout } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post(
    "/login",
    validate({ body: loginSchema }),
    login
);

router.get("/refresh", refresh);

router.post(
    "/logout",
    requireAuth,
    logout
);

export default router;
