import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import { isSessionActive } from "../data/sessions.store.js";
import { logger } from "../utils/logger.js";

/**
 * Middleware som beskytter endepunkter
 * Krever:
 *  - Authorization: Bearer <accessToken>
 * Sjekker:
 *  - token gyldig
 *  - session aktiv (sid)
 */

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        logger.auth("MISSING_TOKEN");
        res.status(401).json({ error: "Missing Authorization header" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = verifyToken(token);

        if (!isSessionActive(payload.sid)) {
            logger.auth("INVALID_SESSION", { sid: payload.sid });
            res.status(401).json({ error: "Session is no longer active" });
            return;
        }

        req.user = payload;
        next();
    } catch {
        logger.auth("INVALID_TOKEN");
        res.status(401).json({ error: "Invalid or expired token" });
    }
}

