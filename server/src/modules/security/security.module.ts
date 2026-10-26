import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityAuditLog } from '../../entities/security-audit-log.entity';
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';
import { SecurityMiddleware } from './security.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([SecurityAuditLog])],
  controllers: [SecurityController],
  providers: [SecurityService],
  exports: [SecurityService],
})
export class SecurityModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecurityMiddleware).forRoutes('*');
  }
}
