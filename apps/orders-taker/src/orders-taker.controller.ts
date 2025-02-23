import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { OrdersTakerService } from './orders-taker.service';
import { ClientKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Kafka } from 'kafkajs';
import { Admin } from '@nestjs/microservices/external/kafka.interface';
import { topicOrderCreated } from './utils/constants';
import { CreateOrderDto } from './dtos/create-order.dto';
import { RedisConfigService } from '@app/redis-config';

@Controller()
export class OrdersTakerController {
  private admin: Admin;
  constructor(
    private readonly ordersTakerService: OrdersTakerService,
    @Inject('ORDER_SERVICE') private readonly client: ClientKafka,
    private redisService: RedisConfigService,
  ) {}

  async onModuleInit() {
    const kafka = new Kafka({
      clientId: 'orders-taker',
      // brokers: [`${this.configService.get<string>('KAFKA_BROKER_IP')}:9092`],
      // brokers: [`kafka:9092`],
      brokers: [process.env.KAFKA_BROKER || 'kafka:29092'],
    });
    this.admin = kafka.admin();
    const topics = await this.admin.listTopics();
    const topicList: {
      topic: string;
      numPartitions: number;
      replicationFactor: number;
    }[] = [];
    if (!topics.includes(topicOrderCreated)) {
      topicList.push({
        topic: topicOrderCreated,
        numPartitions: 10,
        replicationFactor: 1,
      });
    }
    if (topicList.length) {
      await this.admin.createTopics({
        topics: topicList,
      });
    }
  }

  @Post('/ping-redis')
  async getHealth(@Body() body: any): Promise<boolean> {
    const { key, value } = body;
    const status = await this.redisService.setCache('orders', key, value);
    // const result = await this.redisService.checkConnection();
    return status;
  }

  @Post('/cache')
  async setCache(@Body() body: any): Promise<void> {
    const { key, value } = body;
    await this.redisService.setWithExpiry('orders', key, value, 60);
  }
  //test redis
  @Get('/cache/:key')
  async getCache(@Param('key') key: string): Promise<string | null> {
    return (await this.redisService.getCache('orders', key)) ? 'true' : 'false';
  }

  @Post('/orders')
  async createOrder(@Body() body: CreateOrderDto) {
    return this.ordersTakerService.createOrder(body);
  }

  @Post('/orders/generated')
  async generateOrders() {
    return this.ordersTakerService.generateOrder();
  }

  @Get('/orders/:id')
  async getOrders(@Param('id') id: number) {
    return this.ordersTakerService.getOrder(id);
  }
}
