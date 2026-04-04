/* eslint-disable prettier/prettier */
import { Module, Global, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = new Redis({
          host: process.env.REDIS_HOST,
          port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
          password: process.env.REDIS_PASSWORD,
        });

        const logger = new Logger('RedisModule');
        client.on('connect', () => logger.log('✅ Redis connected'));
        client.on('error', (err) => logger.error('❌ Redis error:', err));

        return client;
      },
    },
    RedisService,
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}
