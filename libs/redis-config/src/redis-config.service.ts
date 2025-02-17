import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import * as Redis from 'ioredis';

@Injectable()
export class RedisConfigService {
  private redisClient: Redis.Redis;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.redisClient = new Redis.Redis();
  }
  async checkConnection(): Promise<string> {
    try {
      await this.redisClient.ping();
      return 'Redis connection successful';
    } catch (error) {
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
