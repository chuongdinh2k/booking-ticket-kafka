import { Controller, Get, Inject } from '@nestjs/common';
import { OrderProcessorService } from './order-processor.service';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';

@Controller()
export class OrderProcessorController {
  constructor(
    private readonly orderProcessorService: OrderProcessorService,
    @Inject('ORDER_SERVICE') private client: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.client.connect();
    this.client.subscribeToResponseOf('order.created');
  }
  @MessagePattern('order.created')
  async processOrder(data: any) {
    try {
      const result = await this.orderProcessorService.processorOder(data.data);
      return { status: 'Order processed', data: result };
    } catch (error) {
      console.error('Error processing order:', error);
      return { status: 'Error', message: error.message };
    }
  }

  @Get()
  getHello(): string {
    return this.orderProcessorService.getHello();
  }
}
