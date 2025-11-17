import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from '../../types/supabase'; // Assuming you have a types/supabase.ts generated

export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `cookies().set()` method can only be called in a Server Component or Route Handler
            // that is part of a Next.js App Router route.
            // This error is typically not a problem if you're only setting cookies in a Server Component or Route Handler.
            console.warn('Could not set cookie from server component:', error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // The `cookies().set()` method can only be called in a Server Component or Route Handler
            // that is part of a Next.js App Router route.
            // This error is typically not a problem if you're only removing cookies in a Server Component or Route Handler.
            console.warn('Could not remove cookie from server component:', error);
          }
        },
      },
    }
  );
}
