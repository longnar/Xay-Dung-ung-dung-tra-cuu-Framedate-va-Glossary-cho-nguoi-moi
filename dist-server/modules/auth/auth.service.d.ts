import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
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
