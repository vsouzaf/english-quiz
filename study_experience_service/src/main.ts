import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/health/health.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT!);
}
bootstrap();
