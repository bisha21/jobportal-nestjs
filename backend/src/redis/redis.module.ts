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
          host: 'redis-13412.c232.us-east-1-2.ec2.redns.redis-cloud.com',
          port: 13412,
          password: 'qdyb1BwpdrIbNyzK0BgL6lI5OETH3Mpf',
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
