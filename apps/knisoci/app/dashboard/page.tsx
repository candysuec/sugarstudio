'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../../lib/supabase/edge'; // Assuming a client-side Supabase client for KniSoci
import { Button } from 'ui'; // Shared UI Button component
import Link from 'next/link';

export default function KniSociDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [orchestratorMessage, setOrchestratorMessage] = useState('');

  useEffect(() => {
    const supabase = createClient();
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();
  }, []);

  const triggerOrchestratorJob = async () => {
    setOrchestratorMessage('Dispatching job to Orchestrator...');
    try {
      const response = await fetch('/api/dispatch-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'MONITOR_BRAND_HEALTH',
          payload: { userId: user?.id, brandId: 'some-brand-id' }, // Example payload
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setOrchestratorMessage(`Job dispatched: ${data.message}`);
      } else {
        setOrchestratorMessage(`Failed to dispatch job: ${data.message}`);
      }
    } catch (error: any) {
      setOrchestratorMessage(`Error dispatching job: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-matte-dark text-silver-accent py-12 flex items-center justify-center">
        <p>Loading user data...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-matte-dark text-silver-accent py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-silver-light mb-8 text-center">KniSoci Dashboard</h1>

        {user ? (
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-silver-dark mb-8">
            <h2 className="text-2xl font-semibold text-silver-light mb-4">Welcome, {user.email}!</h2>
            <p className="text-lg mb-4">This is your brand intelligence hub.</p>
            <p className="text-sm text-silver-dark">User ID: {user.id}</p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-silver-light mb-4">Orchestrator Actions</h3>
              <Button onClick={triggerOrchestratorJob}>Trigger Brand Health Scan</Button>
              {orchestratorMessage && <p className="mt-4 text-sm">{orchestratorMessage}</p>}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg mb-4">Please log in to access the KniSoci dashboard.</p>
            <Link href="/login">
              <Button>Go to Login</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}