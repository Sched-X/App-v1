import { app } from './app';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectPostgres } from './config/postgres';
import { connectMongo } from './config/mongo';
import { connectRedis } from './config/redis';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, 'e2e.env') });

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
