import { TicketType } from '@app/db-config';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDateString,
  IsEnum,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsDateString()
  open_date: Date;

  @IsNotEmpty()
  @IsDateString()
  close_date: Date;

  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  thumbnail: string;
}

export class CreateTicketDto {
  @IsNotEmpty()
  event_id: number;

  @IsNotEmpty()
  @IsEnum(TicketType)
  type: TicketType;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
