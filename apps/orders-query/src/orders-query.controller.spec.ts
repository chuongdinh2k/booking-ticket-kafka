import { Test, TestingModule } from '@nestjs/testing';
import { OrdersQueryController } from './orders-query.controller';
import { OrdersQueryService } from './orders-query.service';

describe('OrdersQueryController', () => {
  let ordersQueryController: OrdersQueryController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersQueryController],
      providers: [OrdersQueryService],
    }).compile();

    ordersQueryController = app.get<OrdersQueryController>(OrdersQueryController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(ordersQueryController.getHello()).toBe('Hello World!');
    });
  });
});
