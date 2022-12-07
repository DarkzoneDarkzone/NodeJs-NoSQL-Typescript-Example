import { dbHost, dbPort, dbName, dbTimeZone } from './config';

import { ConnectOptions } from 'mongodb';
import mongoose from 'mongoose';
export const connectDB = async()=> {
    await mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`);
    console.log('MongoDb Connected');   
}