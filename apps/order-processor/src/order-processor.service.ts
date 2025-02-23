import { Order, Ticket, TicketStatus } from '@app/db-config';
import { OrderStatus } from '@app/db-config/enums/order.enum';
import { RedisConfigService } from '@app/redis-config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderProcessorService {
  constructor(
    @InjectRepository(Order)
    private readonly OrderRepository: Repository<Order>,
    @InjectRepository(Ticket)
    private readonly TicketRepository: Repository<Ticket>,
    private readonly dataSource: DataSource,
    private redisService: RedisConfigService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async processorOder(createOrderDto: {
    tickets: number[];
    price: number;
    user_id: number;
  }): Promise<any> {
    return this.dataSource.transaction(async (manager) => {
      let eventId;
      // Create the order
      const order = this.OrderRepository.create({
        uuid: uuid(),
        quantity: createOrderDto.tickets.length,
        status: OrderStatus.PENDING,
        price: createOrderDto.price,
        user: { id: createOrderDto.user_id },
        tickets: [],
      });

      for (const ticketId of createOrderDto.tickets) {
        const ticket = await this.TicketRepository.findOne({
          where: { id: ticketId },
          relations: ['event'],
        });

        if (!ticket) {
          throw new Error(`Ticket with ID ${ticketId} not found`);
        }
        eventId = ticket.event.id;
        ticket.status = TicketStatus.RESERVED;
        order.tickets.push(ticket);
        await manager.save(ticket);
      }
      const savedOrder = await manager.save(order);

      if (eventId) {
        // calculate remaining tickets
        const remainingTickets = await this.TicketRepository.count({
          where: { status: TicketStatus.AVAILABLE, event: { id: eventId } },
        });
        // store remaining tickets
        await this.redisService.setCache(
          eventId,
          'remainingTickets',
          remainingTickets.toString(),
        );
      }

      console.log('Order saved', savedOrder);
      return savedOrder;
    });
  }
}
