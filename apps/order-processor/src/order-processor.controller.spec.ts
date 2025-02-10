import { Test, TestingModule } from '@nestjs/testing';
import { OrderProcessorController } from './order-processor.controller';
import { OrderProcessorService } from './order-processor.service';

describe('OrderProcessorController', () => {
  let orderProcessorController: OrderProcessorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderProcessorController],
      providers: [OrderProcessorService],
    }).compile();

    orderProcessorController = app.get<OrderProcessorController>(OrderProcessorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(orderProcessorController.getHello()).toBe('Hello World!');
    });
  });
});
