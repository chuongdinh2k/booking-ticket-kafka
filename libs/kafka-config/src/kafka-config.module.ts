import { Module } from '@nestjs/common';
import { KafkaConfigService } from './kafka-config.service';

@Module({
  providers: [KafkaConfigService],
  exports: [KafkaConfigService],
})
export class KafkaConfigModule {}
