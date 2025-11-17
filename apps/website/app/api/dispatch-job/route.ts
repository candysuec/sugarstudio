import { NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server'; // Server-side Supabase client
import { serverConfig } from 'foundation/config/server'; // Assuming foundation is correctly configured

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { type, payload } = await request.json();

    // Forward the job to the Orchestrator
    const orchestratorResponse = await fetch(`${serverConfig.apiBaseUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Potentially add an API key or token for Orchestrator authentication
        'X-API-KEY': process.env.ORCHESTRATOR_API_KEY || '',
      },
      body: JSON.stringify({ type, payload, userId: session.user.id }),
    });

    if (!orchestratorResponse.ok) {
      const errorData = await orchestratorResponse.json();
      return NextResponse.json({ message: 'Failed to dispatch job to Orchestrator', error: errorData }, { status: orchestratorResponse.status });
    }

    const responseData = await orchestratorResponse.json();
    return NextResponse.json({ message: 'Job dispatched successfully', data: responseData });
  } catch (error: any) {
    console.error('Error dispatching job:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}
