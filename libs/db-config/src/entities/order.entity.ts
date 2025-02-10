import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Ticket } from './ticket.entity';
import { OrderStatus } from '../enums/order.enum';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  quantity: number;

  @Column({
    type: 'int',
  })
  status: OrderStatus;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @OneToMany(() => Ticket, (ticket) => ticket.order)
  tickets: Ticket[];
}
