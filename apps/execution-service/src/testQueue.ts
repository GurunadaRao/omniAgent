import { Worker } from 'bullmq';
import { getRedisClient } from '../../../packages/database/redis/client';
import { taskQueue } from './queue/bullmq/queueSetup';
import { taskQueueEvents } from './queue/bullmq/queueEvents';
import { LockManager } from './queue/scheduler/lockManager';

// Initialize events listener
taskQueueEvents.on('waiting', ({ jobId }) => {
  console.log(`[Test] Job ${jobId} is waiting in the queue.`);
});

async function runTest() {
  console.log('--- Starting BullMQ Foundation Test ---');
  
  const redis = getRedisClient();
  
  // Test 1: Task Lock Mechanism
  console.log('[Test] Testing LockManager...');
  const lockKey = 'test-task-123';
  const acquired = await LockManager.acquireLock(lockKey, 5000);
  console.log(`[Test] Lock acquired: ${acquired}`); // Expected: true
  
  const acquiredAgain = await LockManager.acquireLock(lockKey, 5000);
  console.log(`[Test] Lock acquired again (should fail): ${acquiredAgain}`); // Expected: false
  
  await LockManager.releaseLock(lockKey);
  console.log('[Test] Lock released.');
  
  const acquiredAfterRelease = await LockManager.acquireLock(lockKey, 5000);
  console.log(`[Test] Lock acquired after release: ${acquiredAfterRelease}`); // Expected: true
  await LockManager.releaseLock(lockKey);

  // Test 2: Queue & Worker Execution Flow
  console.log('[Test] Adding job to task-queue...');
  const job = await taskQueue.add('test-job', { foo: 'bar' });
  console.log(`[Test] Job added: ${job.id}`);

  // Spin up a temporary worker to process the job
  console.log('[Test] Starting worker...');
  const worker = new Worker(
    'task-queue',
    async (activeJob) => {
      console.log(`[Worker] Processing job ${activeJob.id} with data:`, activeJob.data);
      return { success: true, message: 'Processed successfully!' };
    },
    { connection: redis }
  );

  // Keep process alive briefly to observe events
  await new Promise((resolve) => setTimeout(resolve, 6000));
  
  console.log('[Test] Closing worker and connections...');
  await worker.close();
  await redis.quit();
  console.log('--- Test Completed ---');
  process.exit(0);
}

runTest().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});
