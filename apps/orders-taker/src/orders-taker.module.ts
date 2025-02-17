import { Module } from '@nestjs/common';
import { OrdersTakerController } from './orders-taker.controller';
import { OrdersTakerService } from './orders-taker.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { Order, DbConfigModule } from '@app/db-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisConfigModule } from '@app/redis-config';

@Module({
  imports: [
    RedisConfigModule,
    DbConfigModule,
    TypeOrmModule.forFeature([Order]),
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
  controllers: [OrdersTakerController],
  providers: [OrdersTakerService],
})
export class OrdersTakerModule {}
