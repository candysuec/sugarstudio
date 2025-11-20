import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'Candyland API is healthy' });
}
