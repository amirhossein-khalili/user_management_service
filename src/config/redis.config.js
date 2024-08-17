import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const redis = new Redis({
  host: process.env.REDIS_HOST | 'localhost',
  port: process.env.REDIS_PORT | 6379,
  // password: process.env.REDIS_PASSWORD | '',
  db: process.env.REDIS_DB | 0,
});

export { redis };
