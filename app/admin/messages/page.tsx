'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Rahul',
      email: 'rahul@example.com',
      message: 'YouTube download not working.',
      date: '2026-05-21',
    },
    {
      id: 2,
      name: 'Amit',
      email: 'amit@example.com',
      message: 'Please add Facebook video download.',
      date: '2026-05-20',
    },
  ]);

  const remove = (id: number) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Messages</h1>
      <p className="text-gray-400 mt-1">Contact form messages.</p>

      <div className="grid gap-4 mt-8">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="bg-white/5 border border-white/10 rounded-2xl p-5"
          >
            <div className="flex justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{msg.name}</h2>
                <p className="text-gray-400 text-sm">{msg.email}</p>
              </div>

              <button
                onClick={() => remove(msg.id)}
                className="text-red-400 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <p className="mt-4 text-gray-300">{msg.message}</p>
            <p className="text-gray-500 text-sm mt-3">{msg.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}