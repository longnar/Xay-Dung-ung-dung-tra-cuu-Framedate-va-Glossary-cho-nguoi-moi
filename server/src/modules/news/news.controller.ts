import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './dto/create-news.dto';
import { JwtAuthGuard, RolesGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('News')
@Controller('api')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('news')
  @ApiOperation({ summary: 'Lấy danh sách bản cập nhật (patch notes)' })
  getAllPatches() {
    return this.newsService.getAllPatches();
  }

  @Get('news/:id')
  @ApiOperation({ summary: 'Lấy chi tiết bản cập nhật theo ID' })
  getPatchById(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.getPatchById(id);
  }

  @Post('admin/news')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tạo bản cập nhật mới (Admin)' })
  createPatch(@Body() dto: CreateNewsDto) {
    return this.newsService.createPatch(dto);
  }

  @Put('admin/news/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật bản cập nhật (Admin)' })
  updatePatch(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateNewsDto) {
    return this.newsService.updatePatch(id, dto);
  }

  @Delete('admin/news/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa bản cập nhật (Admin)' })
  deletePatch(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.deletePatch(id);
  }
}
