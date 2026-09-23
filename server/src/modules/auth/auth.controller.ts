import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Đăng nhập hệ thống (Admin)' })
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công và trả về JWT token.' })
  @ApiResponse({ status: 401, description: 'Tên đăng nhập hoặc mật khẩu không chính xác.' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Đăng ký tài khoản người dùng' })
  @ApiResponse({ status: 201, description: 'Tạo tài khoản người dùng thành công.' })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
