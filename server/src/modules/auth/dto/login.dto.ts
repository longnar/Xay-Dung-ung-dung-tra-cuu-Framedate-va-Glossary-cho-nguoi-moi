import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin', description: 'Tên đăng nhập' })
  @IsNotEmpty({ message: 'Username is required.' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'admin123', description: 'Mật khẩu' })
  @IsNotEmpty({ message: 'Password is required.' })
  @IsString()
  password: string;
}
