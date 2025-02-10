import { AppEvent, Ticket, TicketType, TicketTypeEntity } from '@app/db-config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dtos/create-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(AppEvent)
    private readonly AppEvent: Repository<AppEvent>,
    @InjectRepository(Ticket)
    private readonly Ticket: Repository<Ticket>,
    @InjectRepository(TicketTypeEntity)
    private readonly TicketType: Repository<TicketTypeEntity>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  // create event
  async createEvent(event: CreateEventDto): Promise<AppEvent> {
    return this.AppEvent.save(event);
  }

  async getEvents(id: number): Promise<AppEvent[]> {
    return this.AppEvent.find({
      where: { id },
    });
  }
}
