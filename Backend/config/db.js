import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/youtube_clone');
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(`⚠️ MongoDB connection warning: ${err.message}. Backend will run with fallback mode.`);
  }
};

export default connectDB;

