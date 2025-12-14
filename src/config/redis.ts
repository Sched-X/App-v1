import dotenv from 'dotenv';
import Redis from 'ioredis';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, './../../.env') });

let redis: Redis | null = null;

export const connectRedis = async () => {
  redis = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  });

  redis.on('connect', () => {
    console.log('Redis connected...');
  });

  redis.on('error', (error) => {
    console.error('Redis connection failed:', error);
  });
};

export { redis };
