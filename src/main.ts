import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
    // 使用fastify驱动
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        // 启用跨域访问
        cors: true,
        // 只使用error和warn这两种输出，避免在控制台冗余输出
        logger: ['error', 'warn'],
    });
    app.setGlobalPrefix('api');
    await app.listen(3001, () => {
        console.log('api: http://localhost:3001');
    });
}
bootstrap();
