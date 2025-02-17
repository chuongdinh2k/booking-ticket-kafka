import { Order } from '@app/db-config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersTakerService {
  constructor(
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
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
}
