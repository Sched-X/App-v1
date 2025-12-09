import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI as string;

export const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connection established...');
  } catch (error) {
    console.error(`MongoDB connection failed: ${error}`);
  }
};
