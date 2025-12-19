import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

const secret: Secret = JWT_SECRET;

/**
 * Payload vi legger i både access- og refresh-token
 * sub = subject (f.eks. username eller userId)
 * sid = session-id for invalidasjon
 */
export interface AuthJwtPayload extends JwtPayload {
    sub: string;
    sid: string;
}

/**
 * Signerer et JWT-token
 */
export function signToken(payload: AuthJwtPayload, expiresIn: `${number}${"s" | "m" | "h" | "d"}` | number): string {
    const options: SignOptions = { expiresIn: expiresIn as any };
    return jwt.sign(payload, secret, options);
}

/**
 * Verifiserer og dekoder et JWT-token
 * Kaster error hvis token er ugyldig/utløpt
 */
export function verifyToken(token: string): AuthJwtPayload {
    return jwt.verify(token, secret) as AuthJwtPayload;
}