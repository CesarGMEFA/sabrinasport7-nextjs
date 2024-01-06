export interface UserJWTPayload {
    id: string;
    username: string;
    iat?: number;
    exp?: number;
}