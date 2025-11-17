'use client';

import { useState } from 'react';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Button } from 'ui'; // Assuming 'ui' package is correctly configured
import { createClient } from '../../lib/supabase/client'; // Import client-side Supabase client
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setMessage(`Login failed: ${error.message}`);
      } else {
        setMessage('Login successful! Redirecting to KniSoci...');
        // In a real app, you'd redirect to /knisoci dashboard
        window.location.href = '/knisoci';
      }
    } catch (err: any) {
      setMessage(`An unexpected error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-matte-dark text-silver-accent py-12 flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg border border-silver-dark">
          <h1 className="text-3xl font-bold text-silver-light mb-6 text-center">Login to KniSoci</h1>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-silver-light text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-silver-light"
                placeholder="your@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-silver-light text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-silver-light"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <Button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
            {message && (
              <p className={`mt-4 text-center ${message.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
                {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-silver-light hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}