// filepath: /Users/nelisoftwares/Documents/microservices/book-tickets-kafka/libs/redis-config/src/redis-config.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import * as Redis from 'ioredis';

@Injectable()
export class RedisConfigService {
  private redisClient: Redis.Redis;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    const redisHost = process.env.REDIS_HOST || 'localhost';
    const redisPort = parseInt(process.env.REDIS_PORT ?? '6379', 10);

    this.redisClient = new Redis.default({
      host: redisHost,
      port: redisPort,
      maxRetriesPerRequest: null,
    });

    this.redisClient.on('connect', () => {
      console.log('Redis connection established!');
    });

    this.redisClient.on('error', (err) => {
      console.error('Redis connection error', err);
    });
  }

  async checkConnection(): Promise<string> {
    try {
      await this.redisClient.ping();
      console.log('Redis connection successful');
      return 'Redis connection successful';
    } catch (error) {
      console.error(`Redis connection failed: ${error.message}`);
      return `Redis connection failed: ${error.message}`;
    }
  }

  async setCache(prefix: string, key: string, value: string): Promise<boolean> {
    try {
      await this.redisClient.set(`${prefix}:${key}`, value);
      return true;
    } catch (error) {
      console.error(`Failed to set cache for key ${key}: ${error.message}`);
      return false;
    }
  }

  async getCache(prefix: string, key: string): Promise<string | null> {
    return this.redisClient.get(`${prefix}:${key}`);
  }

  async delCache(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async setWithExpiry(
    prefix: string,
    key: string,
    value: string,
    expiry: number,
  ): Promise<void> {
    await this.redisClient.set(`${prefix}:${key}`, value, 'EX', expiry);
  }
}
