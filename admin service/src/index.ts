import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = 7000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
