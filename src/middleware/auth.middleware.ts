import { Request, Response, NextFunction } from "express";
import { verifyToken, AuthJwtPayload } from "../utils/jwt.js";
import { isSessionActive } from "../data/sessions.store.js";

export interface AuthenticatedRequest extends Request {
    user?: AuthJwtPayload;
}

/**
 * Middleware som beskytter endepunkter
 * Krever:
 *  - Authorization: Bearer <accessToken>
 * Sjekker:
 *  - token gyldig
 *  - session aktiv (sid)
 */

export function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Missing Authorization header" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = verifyToken(token);

        if (!isSessionActive(payload.sid)) {
            res.status(401).json({ error: "Session is no longer active" });
            return;
        }

        req.user = payload;
        next();
    } catch {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}

