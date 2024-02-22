import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { exp3 } from './example/exp3';

async function bootstrap() {
    exp3();
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
