import mongoose, { Mongoose } from 'mongoose';
import dns from 'dns';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
  cached = (global as any).mongoose = { 
    conn: null, promise: null 
  }
}

// Monitor mongoose connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

export const connectToDatabase = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    
    if(cached.conn) {
      console.log('Using cached connection');
      return cached.conn;
    }

    if(!MONGODB_URL) {
      console.error('MONGODB_URL is not defined in environment variables');
      throw new Error('Missing MONGODB_URL');
    }

    console.log('Creating new connection...');
    
    mongoose.set('debug', true); // Enable mongoose debug mode

    // Add DNS debug logging
    if (process.env.NODE_ENV !== 'production') {
      const [_, __, hostname] = MONGODB_URL.split('@')[1].split('/')[0].split('.');
      console.log('Resolving DNS for MongoDB host...');
      try {
        const addresses = await new Promise<string[]>((resolve, reject) => {
          dns.resolve(hostname, (err: NodeJS.ErrnoException | null, addresses: string[]) => {
            if (err) reject(err);
            else resolve(addresses);
          });
        });
        console.log('DNS resolved addresses:', addresses);
      } catch (dnsError) {
        console.error('DNS resolution failed:', dnsError);
      }
    }

    cached.promise = 
      cached.promise || 
      mongoose.connect(MONGODB_URL, { 
        dbName: 'imaginify', 
        bufferCommands: false,
        connectTimeoutMS: 60000, // Increased to 60 seconds
        socketTimeoutMS: 60000,  // Increased to 60 seconds
        maxPoolSize: 10,
        retryWrites: true,
        w: 'majority',
        serverSelectionTimeoutMS: 60000, // Add server selection timeout
      })

    console.log('Awaiting connection...');
    cached.conn = await cached.promise;
    console.log('Successfully connected to MongoDB');

    return cached.conn;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('MongoDB connection error details:', {
        name: error.name,
        message: error.message,
        code: (error as any).code,
        stack: error.stack
      });
    } else {
      console.error('Unknown MongoDB connection error:', error);
    }
    throw error;
  }
}