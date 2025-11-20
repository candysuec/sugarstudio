import { NextResponse } from 'next/server';

export async function GET() {
  // Placeholder for triggering orchestrator job
  console.log('Triggering orchestrator job...');
  return NextResponse.json({ message: 'Orchestrator job triggered (placeholder)' });
}
