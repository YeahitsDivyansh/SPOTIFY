import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';
import adminRoutes from './route.js';
import cloudinary from 'cloudinary';
import cors from 'cors';
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

// ✅ Cloudinary config (keys must match .env exactly)
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME ?? '',
  api_key: process.env.CLOUD_API_KEY ?? '',
  api_secret: process.env.CLOUD_API_SECRET ?? '',
});


const app = express();

// ✅ Global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Initialize DB tables
async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS albums (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(100) NOT NULL,
        thumbnail VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS songs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(100) NOT NULL,
        thumbnail VARCHAR(255),
        audio VARCHAR(255) NOT NULL,
        album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
}

// ✅ Routes
app.use('/api/v1', adminRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 7000;

// ✅ Start server after DB init
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
});
