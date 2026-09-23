export type UserRole = 'admin' | 'guest';
export declare class User {
    id: number;
    username: string;
    password_hash: string;
    role: UserRole;
    created_at: Date;
    updated_at: Date;
}
