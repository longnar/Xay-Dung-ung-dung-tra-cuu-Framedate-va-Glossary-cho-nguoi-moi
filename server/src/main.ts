import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Hỗ trợ reverse proxy của Render để trích xuất IP thực chính xác từ header X-Forwarded-For
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', 1);

  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:5000',
    'http://127.0.0.1:5000',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Cho phép requests không có origin (ví dụ server-to-server, mobile app, postman, curl)
      if (!origin) return callback(null, true);

      const appUrl = process.env.APP_URL;
      if (
        allowedOrigins.includes(origin) ||
        (appUrl && origin === appUrl) ||
        origin.endsWith('.onrender.com')
      ) {
        return callback(null, true);
      }

      // Cho phép trong dev nếu biến môi trường chưa khắt khe
      if (process.env.NODE_ENV !== 'production' && !process.env.RENDER) {
        return callback(null, true);
      }

      callback(new Error('CORS policy: Truy cập từ Origin này bị từ chối.'));
    },
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Configure Swagger API Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Idol Showdown Wiki NestJS API')
    .setDescription('Tài liệu API hệ thống tra cứu Frame Data và Glossary cho game Idol Showdown')
    .setVersion('2.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const PORT = Number(process.env.PORT) || 5000;
  // Render và các dịch vụ Cloud bắt buộc phải lắng nghe trên 0.0.0.0 để router/port scanner có thể định tuyến.
  // Khi chạy local, nếu trong file .env có HOST=127.0.0.1 và không phải Render thì sẽ khóa chặt chỉ cho máy local truy cập.
  const isLocalhostOnly = process.env.HOST === '127.0.0.1' && !process.env.RENDER && !process.env.RENDER_SERVICE_ID;
  const HOST = isLocalhostOnly ? '127.0.0.1' : '0.0.0.0';

  await app.listen(PORT, HOST);

  console.log('==================================================');
  console.log(`  NestJS API Server running on: http://localhost:${PORT}`);
  console.log(`  Swagger API Docs available at: http://localhost:${PORT}/api/docs`);
  console.log('==================================================');
}
bootstrap();
