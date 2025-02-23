import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateEventDto, CreateTicketDto } from './dtos/create-ticket.dto';

@Controller()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('/health')
  getHealth(): string {
    return this.ticketsService.getHealth();
  }
  @Post('/events')
  createEvent(@Body() body: CreateEventDto): any {
    return this.ticketsService.createEvent(body);
  }
  @Get('/events/:id')
  getEvents(@Param('id') id: number): any {
    return this.ticketsService.getEvents(id);
  }

  @Post('/events/tickets')
  createTicket(@Body() body: CreateTicketDto): any {
    return this.ticketsService.createTicket(body);
  }

  @Get('/events/tickets/:id')
  getTicket(@Param('id') id: number): any {
    return this.ticketsService.getTicketDetail(id);
  }

  @Get('/events/:id/remainingTickets')
  getRemainingTickets(@Param('id') id: number): any {
    return this.ticketsService.getRemainingTickets(id);
  }

  @Post('/events/generated-100')
  generateEvents(): any {
    return this.ticketsService.generateEvent();
  }
}
