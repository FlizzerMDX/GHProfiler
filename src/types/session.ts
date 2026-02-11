import { User } from "./user";

export interface Session{
    user: User,
    expires: string,
    accessToken: string,
}