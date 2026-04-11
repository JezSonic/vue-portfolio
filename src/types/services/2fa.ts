export interface I2FAPrepareResponse {
    /**
     * QR Code in SVG format.
     */
    qr_code: string;
}

export interface I2FACode {
    code: number;
}

export interface I2FARecoveryCode {
    code: string;
    used_at: number|null
}

export interface I2FAConfirmResponse {
    recovery_codes: I2FARecoveryCode[]
}