import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderProcessorService {
  getHello(): string {
    return 'Hello World!';
  }
}
