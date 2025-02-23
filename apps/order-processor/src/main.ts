import { NestFactory } from '@nestjs/core';
import { OrderProcessorModule } from './order-processor.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrderProcessorModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `consumer-${uuidv4()}`,
          brokers: ['kafka:29092'],
        },
        consumer: {
          groupId: 'order-consumer',
        },
      },
    },
  );
  console.log('Order Processor is running');
  await app.listen();
}
bootstrap();
