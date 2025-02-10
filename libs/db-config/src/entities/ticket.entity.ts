import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { AppEvent } from './event.entity';
import { TicketStatus } from '../enums/ticket.enum';
import { Order } from './order.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  date: Date;

  @Column({ type: 'int' })
  status: TicketStatus;

  @ManyToOne(() => AppEvent, (event) => event.tickets)
  @JoinColumn({ name: 'event_id' })
  event: AppEvent;

  @ManyToOne(() => Order, (order) => order.tickets)
  order: Order;
}
