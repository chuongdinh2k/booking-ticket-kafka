import { IsString, IsNotEmpty, MaxLength, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
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
