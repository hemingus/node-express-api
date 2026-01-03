import { z } from "zod";

/**
 * Login request body
 * POST /v1/auth/login
 */
export const loginSchema = z.object({
    username: z
    .string()
    .min(3, "Username must be at least 3 characters"),
    password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

/**
 * Refresh token request headers
 * GET /v1/auth/refresh
 * 
 * Logout request headers
 * POST /v1/auth/logout
 */

export const refreshTokenHeaderSchema = z.object({
    "x-refreshtoken": z.string().min(1, "Refresh token is required")
});

