import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppEvent } from './event.entity';
import { TicketType } from '../enums/ticket.enum';

@Entity()
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
}
