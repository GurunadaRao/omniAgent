import { getRedisClient } from '../../../../../packages/database/redis/client';

const redis = getRedisClient();

export class LockManager {
  private static getLockKey(taskId: string): string {
    return `lock:task:${taskId}`;
  }

  /**
   * Acquires a lock for a given task ID.
   * @param taskId Unique task identifier
   * @param ttl Time-to-live in milliseconds
   * @returns Boolean indicating if lock was successfully acquired
   */
  static async acquireLock(taskId: string, ttl: number = 30000): Promise<boolean> {
    const lockKey = this.getLockKey(taskId);
    const value = 'locked';
    
    // PX sets expiration in milliseconds, NX sets only if key doesn't exist
    const result = await redis.set(lockKey, value, 'PX', ttl, 'NX');
    return result === 'OK';
  }

  /**
   * Releases the lock for a given task ID.
   * @param taskId Unique task identifier
   */
  static async releaseLock(taskId: string): Promise<void> {
    const lockKey = this.getLockKey(taskId);
    await redis.del(lockKey);
  }
}
