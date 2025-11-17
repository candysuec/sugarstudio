import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'Website API is healthy' });
}
