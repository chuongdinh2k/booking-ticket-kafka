import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersTakerService {
  getHello(): string {
    return 'Hello World!';
  }
}
