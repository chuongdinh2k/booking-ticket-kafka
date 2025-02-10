import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersQueryService {
  getHello(): string {
    return 'Hello World!';
  }
}
