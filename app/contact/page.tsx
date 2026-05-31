'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#050509] px-4 py-16 text-white">
        <section className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-black md:text-6xl">Contact Us</h1>
          <p className="mt-4 text-white/60">
            Have a suggestion or want a new tool? Send us a message.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-10 rounded-3xl border border-white/10 bg-white/[0.06] p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-xl border border-white/10 bg-black/40 p-4 outline-none" placeholder="Your name" />
              <input className="rounded-xl border border-white/10 bg-black/40 p-4 outline-none" placeholder="Email address" />
            </div>

            <input className="mt-4 w-full rounded-xl border border-white/10 bg-black/40 p-4 outline-none" placeholder="Subject" />

            <textarea className="mt-4 min-h-[150px] w-full rounded-xl border border-white/10 bg-black/40 p-4 outline-none" placeholder="Message" />

            <button className="mt-5 rounded-xl bg-gradient-to-r from-red-500 to-purple-600 px-6 py-3 font-semibold">
              Send Message
            </button>

            {sent && <p className="mt-4 text-green-400">Message submitted successfully.</p>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}