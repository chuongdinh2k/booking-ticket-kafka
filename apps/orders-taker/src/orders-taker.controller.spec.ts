import { Test, TestingModule } from '@nestjs/testing';
import { OrdersTakerController } from './orders-taker.controller';
import { OrdersTakerService } from './orders-taker.service';

describe('OrdersTakerController', () => {
  let ordersTakerController: OrdersTakerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersTakerController],
      providers: [OrdersTakerService],
    }).compile();

    ordersTakerController = app.get<OrdersTakerController>(
      OrdersTakerController,
    );
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(ordersTakerController.getHello()).toBe('Hello World!');
  //   });
  // });
});
