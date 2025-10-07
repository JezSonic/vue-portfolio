import { IGoogleUserData, IGitHubUserData } from "@/types/services/auth.d.ts";

/**
 * Interface representing user data.
 */
export interface IUserData {
    id: number;
    name: string;
    email: string;
    email_verified_at: string|null;
    created_at: string;
    updated_at: string;
    has_password: boolean;
    google?: IGoogleUserData;
    github?: IGitHubUserData;
    profile_settings: IProfileSettings;
    has_two_factor_enabled: boolean;
}

/**
 * Interface representing user profile settings.
 */
export interface IProfileSettings {
    is_public: boolean;
    avatar_source: string;
    theme: string;
    language: string;
    notifications: INotificationSettings;
}

/**
 * Interface representing user notification preferences.
 */
export interface INotificationSettings {
    email_notifications: boolean;
    email_marketing: boolean;
    email_security_alerts: boolean;
}

/**
 * Interface representing a user login history entry.
 */
export interface ILoginHistory {
    ip_address: string;
    user_agent: string;
    login_method: string;
    location?: string;
    performed_at: string;
}

/**
 * Interface representing data for updating a user profile.
 * Extends IProfileSettings with an additional name field.
 */
export interface IProfileUpdateData extends IProfileSettings {
    name: string
}

/**
 * Enum representing possible statuses for user data export operations.
 */
export enum EUserExportDataStatus {
    QUEUED = 'queued',
    PROCESSING = 'processing',
    COMPLETED = 'completed',
    FAILED = 'failed',
    NOT_FOUND = 'not_found'
}
