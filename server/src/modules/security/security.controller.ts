import { Controller, Get, Post, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SecurityService } from './security.service';
import { JwtAuthGuard, RolesGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Admin Security')
@Controller('api/admin/security')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@ApiBearerAuth()
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Get('logs')
  @ApiOperation({ summary: 'Lấy danh sách nhật ký bảo mật và cảnh báo IP xâm nhập' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Số lượng bản ghi tối đa (mặc định 50)' })
  async getLogs(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 50;
    const logs = await this.securityService.getRecentLogs(parsedLimit);
    return {
      status: 'success',
      total: logs.length,
      data: logs,
    };
  }

  @Post('test-webhook')
  @ApiOperation({ summary: 'Kiểm tra cấu hình kết nối Discord Webhook' })
  async testWebhook(@Req() req: any) {
    const ip = this.securityService.extractRealIp(req);
    return this.securityService.testDiscordWebhook(ip);
  }
}
