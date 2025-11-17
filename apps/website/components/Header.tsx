'use client';

import Link from 'next/link';
import { Header as SharedHeader, Button } from 'ui'; // Assuming 'ui' package is correctly configured
import { createClient } from '../lib/supabase/client'; // Import client-side Supabase client
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function Header() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, router]);

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push('/login');
    setLoading(false);
  };

  return (
    <SharedHeader title="KniBrand Ecosystem">
      <nav className="flex items-center space-x-4">
        <Link href="/" className="text-silver-accent hover:text-silver-light">
          Home
        </Link>
        <Link href="/about" className="text-silver-accent hover:text-silver-light">
          About
        </Link>
        <Link href="/features" className="text-silver-accent hover:text-silver-light">
          Features
        </Link>
        <Link href="/pricing" className="text-silver-accent hover:text-silver-light">
          Pricing
        </Link>
        <Link href="/contact" className="text-silver-accent hover:text-silver-light">
          Contact
        </Link>
        {loading ? (
          <span className="text-silver-accent">Loading...</span>
        ) : user ? (
          <>
            <Link href="/knisoci">
              <Button>Go to KniSoci</Button>
            </Link>
            <Button onClick={handleLogout} disabled={loading}>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </nav>
    </SharedHeader>
  );
}