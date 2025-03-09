import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    hasMongoURL: !!process.env.MONGODB_URL,
    mongoURLFirstChars: process.env.MONGODB_URL ? process.env.MONGODB_URL.substring(0, 10) + '...' : 'not found'
  });
} 