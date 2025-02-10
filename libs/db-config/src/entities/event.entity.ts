import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Ticket } from './ticket.entity';
import { TicketTypeEntity } from './ticket-type.entity';

@Entity()
export class AppEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  start_date: Date;

  @Column()
  title: string;

  @Column()
  end_date: Date;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];

  @OneToMany(() => TicketTypeEntity, (ticketType) => ticketType.event)
  type_of_ticket: TicketTypeEntity[];
}
