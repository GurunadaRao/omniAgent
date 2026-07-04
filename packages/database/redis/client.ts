import Redis, { RedisOptions } from 'ioredis';

let redisInstance: Redis | null = null;

export function getRedisClient(): Redis {
  if (redisInstance) {
    return redisInstance;
  }

  const options: RedisOptions = {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    maxRetriesPerRequest: null, // Required by BullMQ
    retryStrategy(times) {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
  };

  redisInstance = new Redis(options);

  redisInstance.on('connect', () => {
    console.log('Redis client successfully connected');
  });

  redisInstance.on('error', (err) => {
    console.error('Redis client error:', err);
  });

  return redisInstance;
}
