import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config();

console.log('MONGODB_URI:', process.env.MONGODB_URI);

connectDB();

