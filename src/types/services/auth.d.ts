/**
 * Enum representing supported OAuth providers.
 */
export enum EOAuthProvider {
    Google = 'google',
    GitHub = 'github'
}

/**
 * Interface representing Google OAuth user data.
 */
export interface IGoogleUserData {
    name: string|null;
    email: string;
    nickname: string|null;
    avatar_url: string|null;
}

/**
 * Interface representing GitHub OAuth user data.
 */
export interface IGitHubUserData {
    login: string;
    avatar_url: string|null;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    stars_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
    name: string;
    company: string;
    website: string;
    blog: string;
    location: string;
    email: string;
    hireable: boolean;
    bio: string;
    twitter_username: string;
    notification_email: string;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
}

/**
 * Interface for OAuth callback verification request body.
 */
export interface IOAuthCallbackRequestBody {
    ip_address: string;
}

/**
 * Interface for user registration request body.
 */
export interface IRegisterRequestBody {
    email: string;
    name: string;
    password: string;
}

/**
 * Interface for user login request body.
 */
export interface ILoginRequestBody {
    email: string;
    password: string;
    ip_address: string;
}

/**
 * Interface for password reset request body.
 */
export interface IPasswordResetRequestBody {
    email: string;
}

/**
 * Interface for password reset confirmation request body.
 */
export interface IPasswordResetConfirmRequestBody {
    token: string;
    password: string;
}

/**
 * Interface for password reset token verification request body.
 */
export interface IPasswordResetTokenVerifyRequestBody {
    token: string;
}

export interface IVerifyTokenResponse {
    content: boolean;
    creating_password: boolean
}

/**
 * Interface for token refresh request body.
 */
export interface IRefreshTokenRequestBody {
    refresh_token: string;
}
