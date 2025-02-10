import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateEventDto } from './dtos/create-ticket.dto';

@Controller()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  getHello(): string {
    return this.ticketsService.getHello();
  }

  @Post('/events')
  createEvent(@Body() body: CreateEventDto): any {
    return this.ticketsService.createEvent(body);
  }

  @Get('/events/:id')
  getEvents(@Param('id') id: number): any {
    return this.ticketsService.getEvents(id);
  }
}
