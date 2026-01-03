import { Request, Response } from "express";
import { v4 as uuid } from "uuid";
import { signToken, verifyToken } from "../utils/jwt.js";
import { addSession, removeSession, isSessionActive } from "../data/sessions.store.js";
import { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { users } from "../data/users.store.js";

export function login(req: Request, res: Response): void {
    const { username, password } = req.body as { username: string; password: string };

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        res.status(401).json({
            error: {
                code: "INVALID_CREDENTIALS",
                message: "Invalid username or password",
            },
        });
        return;
    }

    const sid = uuid();
    addSession(sid);

    const payload = { sub: username, sid };

    const accessToken = signToken(payload, "15m");
    const refreshToken = signToken(payload, "7d");

    res.status(200).json({ accessToken, refreshToken });
}

export function refresh(req: Request, res: Response): void {
    const refreshToken = req.headers["x-refreshtoken"] as string | undefined;

    if (!refreshToken) {
        res.status(401).json({ error: "Missing refresh token" });
        return;
    }

    try {
        const payload = verifyToken(refreshToken);

        if (isSessionActive(payload.sid)) {
            res.status(401).json({ error: "Session is no longer active" });
            return;
        }

        const newAccessToken = signToken(
            { sub: payload.sub, sid: payload.sid },
            "15m"
        );

        res.status(200).json({ accessToken: newAccessToken });
    } catch {
        res.status(401).json({ error: "Invalid refresh token" });
    }
}

export function logout(req: AuthenticatedRequest, res: Response): void {
    if (req.user) {
        removeSession(req.user.sid);
    }

    res.sendStatus(204);
}
