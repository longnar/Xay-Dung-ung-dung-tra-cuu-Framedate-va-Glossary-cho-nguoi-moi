"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
            if (!origin)
                return callback(null, true);
            const appUrl = process.env.APP_URL;
            if (allowedOrigins.includes(origin) ||
                (appUrl && origin === appUrl) ||
                origin.endsWith('.onrender.com')) {
                return callback(null, true);
            }
            if (process.env.NODE_ENV !== 'production' && !process.env.RENDER) {
                return callback(null, true);
            }
            callback(new Error('CORS policy: Truy cập từ Origin này bị từ chối.'));
        },
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
    }));
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Idol Showdown Wiki NestJS API')
        .setDescription('Tài liệu API hệ thống tra cứu Frame Data và Glossary cho game Idol Showdown')
        .setVersion('2.0.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const PORT = Number(process.env.PORT) || 5000;
    const isProduction = process.env.NODE_ENV === 'production' || !!process.env.RENDER;
    const HOST = process.env.HOST || (isProduction ? '0.0.0.0' : '127.0.0.1');
    await app.listen(PORT, HOST);
    console.log('==================================================');
    console.log(`  NestJS API Server running on: http://localhost:${PORT}`);
    console.log(`  Swagger API Docs available at: http://localhost:${PORT}/api/docs`);
    console.log('==================================================');
}
bootstrap();
//# sourceMappingURL=main.js.map