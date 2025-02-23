import {
  AppEvent,
  Ticket,
  TicketStatus,
  TicketType,
  TicketTypeEntity,
} from '@app/db-config';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto, CreateTicketDto } from './dtos/create-ticket.dto';
import { RedisConfigService } from '@app/redis-config';
import { faker } from '@faker-js/faker';
import { title } from 'process';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(AppEvent)
    private readonly AppEvent: Repository<AppEvent>,
    @InjectRepository(Ticket)
    private readonly Ticket: Repository<Ticket>,
    @InjectRepository(TicketTypeEntity)
    private readonly TicketType: Repository<TicketTypeEntity>,
    private readonly redisService: RedisConfigService,
  ) {}

  async createEvent(event: CreateEventDto): Promise<AppEvent> {
    return this.AppEvent.save(event);
  }

  getHealth(): string {
    return 'OK';
  }

  async generateEvent(): Promise<AppEvent[]> {
    console.log('generating event');
    const numberEvents = 100;
    const listEvents: AppEvent[] = [];
    for (let i = 0; i < numberEvents; i++) {
      let newEventData = {
        name: faker.company.name(),
        description: faker.lorem.sentence(),
        start_date: faker.date.future(),
        end_date: faker.date.future(),
        location: faker.address.city(),
        title: faker.music.album(),
        thumbnail: faker.image.url(),
        open_date: faker.date.past(),
        close_date: faker.date.future(),
      };
      const newEvent = this.AppEvent.create(newEventData);
      listEvents.push(newEvent);
    }
    console.log('listEvents', listEvents);
    return this.AppEvent.save(listEvents);
  }

  async getEvents(id: number): Promise<AppEvent[]> {
    return this.AppEvent.find({
      where: { id },
    });
  }

  async getTicketDetail(id: number): Promise<Ticket | null> {
    return this.Ticket.findOne({
      where: { id },
      relations: ['event', 'ticket_type'],
    });
  }

  async createTicket(ticket: CreateTicketDto): Promise<any> {
    const eventExist = await this.AppEvent.findOne({
      where: { id: ticket.event_id },
    });
    if (!eventExist) {
      throw new Error('Event does not exist');
    }
    const ticketTypeExist = await this.TicketType.findOne({
      where: {
        type: ticket.type,
        event: {
          id: ticket.event_id,
        },
      },
    });
    if (ticketTypeExist) {
      throw new Error('Ticket type already exists');
    }
    const newTicketTypeRecord = this.TicketType.create({
      ...ticket,
      event: eventExist,
      avail_number: ticket.amount,
    });
    const ticketTypeRecord = await this.TicketType.save(newTicketTypeRecord);
    for (let i = 0; i < ticket.amount; i++) {
      const newTicket = new Ticket();
      newTicket.event = eventExist;
      newTicket.ticket_type = ticketTypeRecord;
      newTicket.status = TicketStatus.AVAILABLE;
      newTicket.uuid = `ticket-${eventExist?.id}-${ticketTypeRecord.type}-${i}`;
      newTicket.seat = `${ticketTypeRecord.type}-${i}`;
      await this.Ticket.save(newTicket);
    }
    return ticketTypeRecord;
  }

  async getRemainingTickets(eventId: number): Promise<number> {
    const cacheField = 'remainingTickets';
    let totalRemainingTicket = 0;
    let remainingTickets = await this.redisService.getCache(
      eventId.toString(),
      cacheField,
    );
    if (!remainingTickets) {
      totalRemainingTicket = await this.Ticket.count({
        where: { status: TicketStatus.AVAILABLE, event: { id: eventId } },
      });
      await this.redisService.setCache(
        eventId.toString(),
        cacheField,
        totalRemainingTicket.toString(),
      );
    } else {
      totalRemainingTicket = parseInt(remainingTickets);
    }
    return totalRemainingTicket;
  }
}
