import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 여기가 엔트리 포인트
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
