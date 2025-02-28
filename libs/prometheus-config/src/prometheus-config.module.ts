import { Module } from '@nestjs/common';
import { PrometheusService } from './prometheus-config.service';
import { PrometheusController } from './prometheus-config.controller';

@Module({
  controllers: [PrometheusController],
  providers: [PrometheusService],
  exports: [PrometheusService],
})
export class PrometheusModule {}
