import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import songRoutes from './route.js';
import redis from 'redis';

dotenv.config();

export const redisClient = redis.createClient({
    password: process.env.Redis_Password as string,
    socket: {
        host: "redis-14517.c16.us-east-1-2.ec2.redns.redis-cloud.com",
        port: 14517
    }
});

redisClient.connect().then(() => {
    console.log("Connected to Redis");
}).catch((err) => {
    console.error("Redis connection error:", err);
});

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/v1', songRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Song service listening on port ${PORT}`);
});