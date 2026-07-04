import { Queue, QueueOptions } from 'bullmq';
import { getRedisClient } from '../../../../../packages/database/redis/client';

const redis = getRedisClient();

const queueOptions: QueueOptions = {
  connection: redis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },
};

export const taskQueue = new Queue('task-queue', queueOptions);
export const dlqQueue = new Queue('dead-letter-queue', queueOptions);
