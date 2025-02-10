import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import {
  AppEvent,
  DbConfigModule,
  Ticket,
  TicketTypeEntity,
} from '@app/db-config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    DbConfigModule,
    TypeOrmModule.forFeature([Ticket, AppEvent, TicketTypeEntity]),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
