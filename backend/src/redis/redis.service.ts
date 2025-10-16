/* eslint-disable prettier/prettier */
import { Injectable, Inject, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);

  constructor(@Inject('REDIS_CLIENT') private readonly client: Redis) {}

  // ================= Strings =================
  async set(key: string, value: string|number, ttlInSeconds?: number) {
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

  // ================= Hashes =================
  async hset(key: string, data: Record<string, string>) {
    try {
      return this.client.hset(key, data);
    } catch (err) {
      this.logger.error(`Failed to hset key: ${key}`, err);
    }
  }

  async hgetall(key: string) {
    try {
      return this.client.hgetall(key);
    } catch (err) {
      this.logger.error(`Failed to hgetall key: ${key}`, err);
    }
  }

  async hdel(key: string, field: string) {
    try {
      return this.client.hdel(key, field);
    } catch (err) {
      this.logger.error(`Failed to hdel field: ${field} in key: ${key}`, err);
    }
  }

  // ================= Lists =================
  async lpush(key: string, value: string) {
    try {
      return this.client.lpush(key, value);
    } catch (err) {
      this.logger.error(`Failed to lpush value to key: ${key}`, err);
    }
  }

  async rpush(key: string, value: string) {
    try {
      return this.client.rpush(key, value);
    } catch (err) {
      this.logger.error(`Failed to rpush value to key: ${key}`, err);
    }
  }

  async lpop(key: string) {
    try {
      return this.client.lpop(key);
    } catch (err) {
      this.logger.error(`Failed to lpop key: ${key}`, err);
    }
  }

  async rpop(key: string) {
    try {
      return this.client.rpop(key);
    } catch (err) {
      this.logger.error(`Failed to rpop key: ${key}`, err);
    }
  }

  async lrange(key: string, start: number, end: number) {
    try {
      return this.client.lrange(key, start, end);
    } catch (err) {
      this.logger.error(`Failed to lrange key: ${key}`, err);
    }
  }

  // ================= Sets =================
  async sadd(key: string, member: string) {
    try {
      return this.client.sadd(key, member);
    } catch (err) {
      this.logger.error(`Failed to sadd member: ${member} to key: ${key}`, err);
    }
  }

  async smembers(key: string) {
    try {
      return this.client.smembers(key);
    } catch (err) {
      this.logger.error(`Failed to smembers key: ${key}`, err);
    }
  }

  async srem(key: string, member: string) {
    try {
      return this.client.srem(key, member);
    } catch (err) {
      this.logger.error(
        `Failed to srem member: ${member} from key: ${key}`,
        err,
      );
    }
  }

  // ================= Sorted Sets =================
  async zadd(key: string, score: number, member: string) {
    try {
      return this.client.zadd(key, score, member);
    } catch (err) {
      this.logger.error(
        `Failed to zadd member: ${member} with score: ${score} to key: ${key}`,
        err,
      );
    }
  }

  async zrange(key: string, start: number, end: number, withScores = false) {
    try {
      if (withScores) return this.client.zrange(key, start, end, 'WITHSCORES');
      return this.client.zrange(key, start, end);
    } catch (err) {
      this.logger.error(`Failed to zrange key: ${key}`, err);
    }
  }

  async zrem(key: string, member: string) {
    try {
      return this.client.zrem(key, member);
    } catch (err) {
      this.logger.error(
        `Failed to zrem member: ${member} from key: ${key}`,
        err,
      );
    }
  }
}
