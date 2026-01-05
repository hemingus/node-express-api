import type { AuthJwtPayload } from "../utils/jwt.js";

// Adder "user" til Request-typen fra Express. For å holde styr på hvem requesten kommer fra.
 
declare global {
    namespace Express {
        interface Request {
            user: AuthJwtPayload;
        }
    }
}

export {};