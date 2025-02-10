import { Controller, Get, Inject } from '@nestjs/common';
import { OrderProcessorService } from './order-processor.service';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Controller()
export class OrderProcessorController {
  constructor(
    private readonly orderProcessorService: OrderProcessorService,
    @Inject('ORDER_SERVICE') private client: ClientKafka,
  ) {}

  @MessagePattern('order.created')
  async processOrder(data: any) {
    console.log('Order created', data);
    return { status: 'Order processed', data: data };
  }

  @Get()
  getHello(): string {
    return this.orderProcessorService.getHello();
  }
}
