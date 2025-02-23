import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Order } from './entities/order.entity';
import { Ticket } from './entities/ticket.entity';
import { AppEvent } from './entities/event.entity';
import { TicketTypeEntity } from './entities/ticket-type.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST', 'mysql'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get<string>('DB_USERNAME', 'chuong'),
        password: configService.get<string>('DB_PASSWORD', 'chuong123'),
        database: configService.get<string>('DB_DATABASE', 'booking_tickets'),
        entities: [Order, AppEvent, Ticket, User, TicketTypeEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Order, Ticket, TicketTypeEntity, AppEvent]),
  ],
})
export class DbConfigModule {}
//dasdas
