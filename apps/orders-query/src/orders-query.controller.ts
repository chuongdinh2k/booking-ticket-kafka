import { Controller, Get } from '@nestjs/common';
import { OrdersQueryService } from './orders-query.service';

@Controller()
export class OrdersQueryController {
  constructor(private readonly ordersQueryService: OrdersQueryService) {}

  @Get()
  getHello(): string {
    return this.ordersQueryService.getHello();
  }
}
