import { Module } from '@nestjs/common';
import { OrderProcessorController } from './order-processor.controller';
import { OrderProcessorService } from './order-processor.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'ORDER_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: `order-consumer-${uuidv4()}`,
              brokers: [`localhost:9092`],
            },
          },
          consumer: {
            groupId: 'order-consumer',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],

  controllers: [OrderProcessorController],
  providers: [OrderProcessorService],
})
export class OrderProcessorModule {}
