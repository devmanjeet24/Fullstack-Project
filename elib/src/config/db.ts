// import mongoose from "mongoose";


// const connectDB = async() => {
//     mongoose.connect
// }



import mongoose from 'mongoose';
import { config } from './config';

// Connection string (replace with your Compass string if different)
 

const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseURL as string);
    console.log('MongoDB connected successfully! ✅');
  } catch (error) {
    // Type assertion for error
    if (error instanceof Error) {
      console.error('MongoDB connection failed ❌:', error.message);
    } else {
      console.error('MongoDB connection failed ❌:', error);
    }
  }
};

export default connectDB;

