import { NestFactory } from '@nestjs/core';
import { OrdersQueryModule } from './orders-query.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersQueryModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
