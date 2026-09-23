import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMoveDto {
  @ApiProperty({ example: 'Gawr Gura', description: 'Tên nhân vật' })
  @IsNotEmpty({ message: 'CHAR_NAME is required.' })
  @IsString()
  CHAR_NAME: string;

  @ApiProperty({ example: 'Trident Thrust', description: 'Tên đòn đánh' })
  @IsNotEmpty({ message: 'CHAR_MOVE is required.' })
  @IsString()
  CHAR_MOVE: string;

  @ApiPropertyOptional({ example: 800 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  DAMAGE?: number;

  @ApiPropertyOptional({ example: 6 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  START_UP?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  ACTIVE?: number;

  @ApiPropertyOptional({ example: 14 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  RECOVERY?: number;

  @ApiPropertyOptional({ example: -2 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  ADV_ON_BLOCK?: number;

  @ApiPropertyOptional({ example: 4 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  ADV_ON_HIT?: number;

  @ApiPropertyOptional({ example: 'Upper body invulnerable on frames 1-4' })
  @IsOptional()
  @IsString()
  INVULNERABILITY?: string;
}

export class UpsertBaseStatsDto {
  @ApiPropertyOptional({ example: 1000 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  HP?: number;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  WALKSPEED?: number;

  @ApiPropertyOptional({ example: 4 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  JUMP_START_UP?: number;

  @ApiPropertyOptional({ example: 3 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  DASH_START_UP?: number;

  @ApiPropertyOptional({ example: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  BACKDASH?: number;

  @ApiPropertyOptional({ example: 'Shining Trident' })
  @IsOptional()
  @IsString()
  REVERSAL?: string;
}
