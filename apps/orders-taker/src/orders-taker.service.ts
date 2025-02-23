import { Order } from '@app/db-config';
import { ClientKafka } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/create-order.dto';
import { topicOrderCreated } from './utils/constants';
@Injectable()
export class OrdersTakerService {
  constructor(
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
    @Inject('ORDER_SERVICE') private readonly client: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  getOrder(id: number): Promise<Order | null> {
    return this.OrderRepository.findOne({
      where: { id },
      relations: ['tickets'],
    });
  }

  createOrder(createOderDto: CreateOrderDto): any {
    const { tickets, user_id, price } = createOderDto;
    this.client.emit(topicOrderCreated, {
      data: {
        tickets,
        user_id,
        price,
      },
    });
    return { status: 'message sent', tickets, user_id, price };
  }

  generateOrder(): any {
    const lengthTickets = 1000;
    for (let i = 10; i < lengthTickets; i++) {
      let orderRequestData = {
        tickets: [i],
        user_id: 1,
        price: 100,
      };
      const res = this.createOrder(orderRequestData);
      console.log('res', res);
    }
    return 'Order generation completed';
  }
}
