"use client";

import React from "react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-16">
        <header className="border-b border-zinc-800 pb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            KniSoci · Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold">
            Welcome back to your content command center.
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            This is a placeholder dashboard view. The underlying AI workflows and
            Supabase data are wired in behind the scenes, but this UI is kept
            minimal while we stabilise the rest of the system.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <h2 className="text-sm font-medium text-zinc-100">
              Recent activity
            </h2>
            <p className="mt-2 text-xs text-zinc-400">
              Activity feed and analytics will appear here in a later phase.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <h2 className="text-sm font-medium text-zinc-100">
              Quick actions
            </h2>
            <ul className="mt-2 space-y-1 text-xs text-zinc-400">
              <li>• Generate new content ideas</li>
              <li>• Draft a post from your brand book</li>
              <li>• Review brand consistency checks</li>
            </ul>
          </div>
        </section>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4 text-xs text-zinc-500">
          <span>Early dashboard placeholder · v0.1</span>
          <div className="flex gap-3">
            <Link
              href="/"
              className="underline-offset-2 hover:text-zinc-300 hover:underline"
            >
              Back to Digital Sugar Studio
            </Link>
            <Link
              href="/signup"
              className="underline-offset-2 hover:text-zinc-300 hover:underline"
            >
              Go to signup
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}