import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppEvent } from './event.entity';
import { TicketType } from '../enums/ticket.enum';
import { Ticket } from './ticket.entity';

@Entity('ticket-type')
export class TicketTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
  })
  type: TicketType;

  @Column()
  amount: number;

  @Column()
  avail_number: number;

  @Column({
    type: 'float',
  })
  price: number;

  @ManyToOne(() => AppEvent, (event) => event.tickets)
  @JoinColumn({ name: 'event_id' })
  event: AppEvent;

  @OneToMany(() => Ticket, (ticket) => ticket.ticket_type)
  tickets: Ticket[];
}
