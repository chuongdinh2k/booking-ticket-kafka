import { Module } from '@nestjs/common';
import { OrdersQueryController } from './orders-query.controller';
import { OrdersQueryService } from './orders-query.service';
import { DbConfigModule, Order, Ticket } from '@app/db-config';
import { RedisConfigModule } from '@app/redis-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RedisConfigModule,
    DbConfigModule,
    TypeOrmModule.forFeature([Order, Ticket]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [OrdersQueryController],
  providers: [OrdersQueryService],
})
export class OrdersQueryModule {}
