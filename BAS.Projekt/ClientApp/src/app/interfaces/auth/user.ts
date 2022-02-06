import { UserRole } from './role';
export class User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    role: string;
    userRole: UserRole;
    sub: string;
    jti: string;
    token: string;
    exp: number;
    iat: string;
    hasConfirmedEmail: boolean;
}