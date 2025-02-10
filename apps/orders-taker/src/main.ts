import { NestFactory } from '@nestjs/core';
import { OrdersTakerModule } from './orders-taker.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { kafkaConfig } from '@app/kafka-config/kafka-config';

async function bootstrap() {
  const app = await NestFactory.create(OrdersTakerModule);

  app.connectMicroservice<MicroserviceOptions>(kafkaConfig);

  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
