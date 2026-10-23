import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsDateString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({ example: 'Balance Patch v5.3.0', description: 'Tiêu đề bản cập nhật' })
  @IsNotEmpty({ message: 'Title is required.' })
  @IsString()
  @MaxLength(150)
  title: string;

  @ApiProperty({ example: 'He thong (System)\n  - ...', description: 'Nội dung bản cập nhật' })
  @IsNotEmpty({ message: 'Content is required.' })
  @IsString()
  content: string;

  @ApiPropertyOptional({ example: 'v5.3.0', description: 'Phiên bản (mặc định v5.x)' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  version?: string;

  @ApiPropertyOptional({ example: '2026-10-23', description: 'Ngày phát hành YYYY-MM-DD (mặc định hôm nay)' })
  @IsOptional()
  @IsDateString()
  release_date?: string;

  @ApiPropertyOptional({ example: false, description: 'Bản cập nhật lớn' })
  @IsOptional()
  @IsBoolean()
  is_major?: boolean;
}

export class UpdateNewsDto extends PartialType(CreateNewsDto) {}
