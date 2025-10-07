import type { I2FAConfirmResponse } from "@/types/services/2fa";

/**
 * Sanitize a 2FA code by stripping all non-digit characters.
 */
export function sanitizeTwoFaCode(code: string): string {
  return (code || "").replace(/\D/g, "");
}

/**
 * Check that the 2FA confirmation response contains at least one recovery code.
 */
export function isValid2FAConfirmResponse(resp: I2FAConfirmResponse | null | undefined): boolean {
  return !!(resp && Array.isArray(resp.recovery_codes) && resp.recovery_codes.length > 0);
}
