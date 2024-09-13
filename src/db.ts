// db.ts
import mongoose from 'mongoose';

const uri = "mongodb://localhost:27017/myDatabase";

// Connect to MongoDB using Mongoose
export async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB with Mongoose');
  } catch (error) {
    console.error('Failed to connect to MongoDB with Mongoose', error);
    throw error;
  }
}
