import dotenv from 'dotenv';
import { app } from './app';
import { connectPostgres } from './config/postgres';
import { connectMongo } from './config/mongo';
import { connectRedis } from './config/redis';

dotenv.config();

const port = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectMongo();
    await connectPostgres();
    await connectRedis();
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

startServer();
