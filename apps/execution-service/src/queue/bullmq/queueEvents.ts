import { QueueEvents } from 'bullmq';
import { getRedisClient } from '../../../../../packages/database/redis/client';
import { QueueStatusEvent } from '../../../../../packages/events/queue-events';
import { taskQueue } from './queueSetup';

const redis = getRedisClient();

export const taskQueueEvents = new QueueEvents('task-queue', {
  connection: redis,
});

taskQueueEvents.on('active', async ({ jobId, prev }) => {
  console.log(`Job ${jobId} is now active (previous state: ${prev})`);
  await emitQueueStatus();
});

taskQueueEvents.on('completed', async ({ jobId, returnvalue }) => {
  console.log(`Job ${jobId} completed. Result:`, returnvalue);
  await emitQueueStatus();
});

taskQueueEvents.on('failed', async ({ jobId, failedReason }) => {
  console.error(`Job ${jobId} failed. Reason:`, failedReason);
  await emitQueueStatus();
});

async function emitQueueStatus() {
  const [activeCount, waitingCount] = await Promise.all([
    taskQueue.getActiveCount(),
    taskQueue.getWaitingCount(),
  ]);

  const event: QueueStatusEvent = {
    queueName: 'task-queue',
    activeCount,
    waitingCount,
    timestamp: Date.now(),
  };

  // Log status or publish to Redis PubSub
  console.log(`[QueueStatusEvent]`, JSON.stringify(event));
}
