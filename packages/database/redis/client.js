"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisClient = getRedisClient;
const ioredis_1 = __importDefault(require("ioredis"));
let redisInstance = null;
function getRedisClient() {
    if (redisInstance) {
        return redisInstance;
    }
    const options = {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        maxRetriesPerRequest: null, // Required by BullMQ
        retryStrategy(times) {
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
    };
    redisInstance = new ioredis_1.default(options);
    redisInstance.on('connect', () => {
        console.log('Redis client successfully connected');
    });
    redisInstance.on('error', (err) => {
        console.error('Redis client error:', err);
    });
    return redisInstance;
}
//# sourceMappingURL=client.js.map