import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  //   @IsNotEmpty()
  //   quantity: number;
  @IsArray()
  @IsNotEmpty()
  tickets: number[];

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  price: number;
}
