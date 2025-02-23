import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisConfigService } from './redis-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get<string>('REDIS_HOST', 'redis'),
        port: configService.get<number>('REDIS_PORT', 6379),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RedisConfigService],
  exports: [RedisConfigService, CacheModule],
})
export class RedisConfigModule {}
