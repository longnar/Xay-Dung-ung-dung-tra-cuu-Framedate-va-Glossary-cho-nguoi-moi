import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        message: string;
        token: string;
        user: {
            id: number;
            username: string;
            role: "admin";
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        user: {
            id: number;
            username: string;
            role: import("../../entities/user.entity").UserRole;
        };
    }>;
}
