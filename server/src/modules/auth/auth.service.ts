import { Injectable, BadRequestException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from '../../entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    if (user.role !== 'admin') {
      throw new ForbiddenException('Access denied. Only administrators are allowed to log in here.');
    }

    const payload = { id: user.id, username: user.username, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const { username, password, role } = registerDto;

    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new BadRequestException('Username is already taken.');
    }

    const userRole = role === 'admin' ? 'admin' : 'guest';
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      username,
      password_hash: hashedPassword,
      role: userRole,
    });

    const savedUser = await this.userRepository.save(newUser);

    return {
      message: 'User registered successfully.',
      user: {
        id: savedUser.id,
        username: savedUser.username,
        role: savedUser.role,
      },
    };
  }
}
