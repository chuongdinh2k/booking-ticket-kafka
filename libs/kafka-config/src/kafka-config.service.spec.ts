import { Test, TestingModule } from '@nestjs/testing';
import { KafkaConfigService } from './kafka-config.service';

describe('KafkaConfigService', () => {
  let service: KafkaConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KafkaConfigService],
    }).compile();

    service = module.get<KafkaConfigService>(KafkaConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
