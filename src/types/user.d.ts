export interface IUserData {
    id: number;
    name: string;
    email: string;
    email_verified_at: string|null;
    created_at: string;
    updated_at: string;
    google?: IGoogleUserData;
    github?: IGitHubUserData;
    profile_settings: IProfileSettings;
}

export interface IGoogleUserData {
    name: string|null;
    email: string;
    nickname: string|null;
    avatar_url: string|null;
}

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

export interface IProfileSettings {
    is_public: boolean;
    avatar_source: string;
}