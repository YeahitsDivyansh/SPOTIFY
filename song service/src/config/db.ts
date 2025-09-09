import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DB_URL) {
    throw new Error('DB_URL environment variable is not defined');
}
export const sql = neon(process.env.DB_URL);
