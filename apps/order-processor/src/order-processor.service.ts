import { Order, Ticket, TicketStatus } from '@app/db-config';
import { OrderStatus } from '@app/db-config/enums/order.enum';
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
      // Create the order
      const order = this.OrderRepository.create({
        uuid: uuid(),
        quantity: createOrderDto.tickets.length,
        status: OrderStatus.PENDING,
        price: createOrderDto.price,
        user: { id: createOrderDto.user_id },
      });
      const savedOrder = await manager.save(order);

      // Update the ticket status to RESERVED
      // const ticket = await this.TicketRepository.findOne(
      //   createOrderDto.ticketId,
      // );
      // ticket.status = TicketStatus.RESERVED;
      for (const ticketId of createOrderDto.tickets) {
        const ticket = await this.TicketRepository.findOne({
          where: { id: ticketId },
        });
        if (!ticket) {
          throw new Error(`Ticket with ID ${ticketId} not found`);
        }
        ticket.status = TicketStatus.RESERVED;
        await manager.save(ticket);
      }
      console.log('Order saved', savedOrder);
      return savedOrder;
    });
  }
}
