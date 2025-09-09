import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import songRoutes from './route.js';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/v1', songRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Song service listening on port ${PORT}`);
});