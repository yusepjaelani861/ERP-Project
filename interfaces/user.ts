export interface UserLogin {
    user: {
        id: string;
        role_id: string;
        name: string;
        phone_number?: string;
        email: string;
        avatar?: string;
        status: string;
        created_at: string;
        updated_at: string;
    };
    token: string;
    expiredIn: number;
}