import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { exp1 } from './example/exp1';

async function bootstrap() {
    exp1();
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
