import { JWTPayload } from "jose";
import { UserJWTPayload } from "./UserJWTPayload.interface";

export interface UserStore {
    user: UserJWTPayload;
    isAuthBoolean: () => boolean;
    setUser: (user: UserJWTPayload) => void;
    removeUser: () => void;
}