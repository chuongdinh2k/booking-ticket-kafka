import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AppEvent } from './event.entity';
import { TicketStatus } from '../enums/ticket.enum';
import { TicketTypeEntity } from './ticket-type.entity';
import { Order } from './order.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  seat: string;

  @Column({ type: 'int' })
  status: TicketStatus;

  @ManyToOne(() => AppEvent, (event) => event.tickets)
  @JoinColumn({ name: 'event_id' })
  event: AppEvent;

  @ManyToOne(() => TicketTypeEntity, (tickeType) => tickeType.tickets)
  ticket_type: TicketTypeEntity;

  @ManyToOne(() => Order, (order) => order.tickets)
  order: Order;
}
