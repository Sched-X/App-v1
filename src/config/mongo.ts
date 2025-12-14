import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, './../../.env') });

const mongoURI = process.env.MONGO_URI as string;

export const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connection established...');
  } catch (error) {
    console.error(`MongoDB connection failed: ${error}`);
  }
};
