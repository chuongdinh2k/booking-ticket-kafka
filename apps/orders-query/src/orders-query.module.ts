import { Module } from '@nestjs/common';
import { OrdersQueryController } from './orders-query.controller';
import { OrdersQueryService } from './orders-query.service';
import { DbConfigModule } from '@app/db-config';

@Module({
  imports: [DbConfigModule],
  controllers: [OrdersQueryController],
  providers: [OrdersQueryService],
})
export class OrdersQueryModule {}
