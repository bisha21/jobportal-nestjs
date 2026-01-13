/* eslint-disable prettier/prettier */
import { Injectable, Inject, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(@Inject('REDIS_CLIENT') private readonly client: Redis) {}

  async set(key: string, value: string | number, ttlInSeconds?: number) {
    try {
      if (ttlInSeconds) return this.client.set(key, value, 'EX', ttlInSeconds);
      return this.client.set(key, value);
    } catch (err) {
      this.logger.error(`Failed to set key: ${key}`, err);
    }
  }

  async get(key: string) {
    try {
      return this.client.get(key);
    } catch (err) {
      this.logger.error(`Failed to get key: ${key}`, err);
    }
  }

  async del(key: string) {
    try {
      return this.client.del(key);
    } catch (err) {
      this.logger.error(`Failed to delete key: ${key}`, err);
    }
  }

  async expire(key: string, ttlInSeconds: number) {
    try {
      return this.client.expire(key, ttlInSeconds);
    } catch (err) {
      this.logger.error(`Failed to set expire for key: ${key}`, err);
    }
  }
}
