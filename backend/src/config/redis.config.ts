/* eslint-disable prettier/prettier */
interface RedisConfigOptions {
  host: string;
  port: number;
  password: string;
}

export const redisConfigConstant: RedisConfigOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || '',
};
