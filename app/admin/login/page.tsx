'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const login = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem('reelnest_admin', 'true');
      router.push('/admin');
    } else {
      setError('Wrong admin password');
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] flex items-center justify-center px-4 text-white">
      <form
        onSubmit={login}
        className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-2xl flex items-center justify-center mb-5">
          <Lock className="text-red-500" size={32} />
        </div>

        <h1 className="text-3xl font-bold text-center">ReelNest Admin</h1>
        <p className="text-gray-400 text-center mt-2 mb-8">
          Login to manage your website
        </p>

        <label className="text-sm text-gray-300">Password</label>

        <div className="relative mt-2">
          <input
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 pr-12 outline-none focus:border-red-500"
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-3 text-gray-400"
          >
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

        <button
          type="submit"
          className="w-full mt-6 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}