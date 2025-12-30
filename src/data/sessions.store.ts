/**
 * Lagrer aktive innlogginger (session IDs) i minnet.
 * Hver `sid` representerer en gyldig login/session.
 */

export const activeSessions = new Set<string>();

export function addSession(sid: string): void {
    activeSessions.add(sid);
}

export function removeSession(sid: string): void {
    activeSessions.delete(sid);
}

export function isSessionActive(sid: string): boolean {
    return activeSessions.has(sid);
}
