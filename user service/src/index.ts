import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes.js';
import cors from 'cors';

dotenv.config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: 'Spotify',
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/v1', userRoutes);

app.get('/', (req, res) => {
    res.send('Server is Working');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDb();
})