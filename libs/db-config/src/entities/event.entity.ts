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

  @Column({
    name: 'start_date',
  })
  start_date: Date;

  @Column()
  title: string;

  @Column({
    name: 'end_date',
  })
  end_date: Date;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  thumbnail: string;

  @Column({
    name: 'open_date',
    nullable: true,
  })
  open_date: Date;

  @Column({
    name: 'close_date',
    nullable: true,
  })
  close_date: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];

  @OneToMany(() => TicketTypeEntity, (ticketType) => ticketType.id)
  type_of_ticket: TicketTypeEntity[];
}
