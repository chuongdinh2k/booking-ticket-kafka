// filepath: /Users/nelisoftwares/Documents/microservices/book-tickets-kafka/apps/order-processor/src/main.ts
import { NestFactory } from '@nestjs/core';
import { OrderProcessorModule } from './order-processor.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import * as express from 'express';
import * as client from 'prom-client';

async function bootstrap() {
  // Create the microservice
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

  // Create an HTTP server for Prometheus metrics
  const metricsApp = express();
  const register = new client.Registry();
  client.collectDefaultMetrics({ register });

  metricsApp.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
  });

  metricsApp.listen(9100, () => {
    console.log('Metrics server is running on port 9100');
  });

  console.log('Order Processor is running');
  await app.listen();
}

bootstrap();
