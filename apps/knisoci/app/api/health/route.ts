import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'KniSoci API is healthy' });
}
