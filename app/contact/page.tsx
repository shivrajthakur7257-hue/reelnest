'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CircleCheck as CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    // Simulate sending
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    toast.success('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-purple-600/20 border border-red-500/20 mb-6">
            <Mail className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Get in <span className="neon-text">Touch</span>
          </h1>
          <p className="text-gray-400">
            Have questions or feedback? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          className="glass rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {sent ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Message Sent!</h3>
              <p className="text-sm text-gray-400 mb-6">We&apos;ll get back to you as soon as possible.</p>
              <button
                onClick={() => setSent(false)}
                className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-purple-600 text-white text-sm font-semibold rounded-xl hover:shadow-neon-red transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <motion.button
                type="submit"
                disabled={sending}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-neon-red disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {sending ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass rounded-xl p-5 flex items-center gap-3">
            <Mail className="w-5 h-5 text-red-400" />
            <div>
              <p className="text-sm font-medium text-white">Email</p>
              <p className="text-xs text-gray-400">support@reelnest.com</p>
            </div>
          </div>
          <div className="glass rounded-xl p-5 flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <div>
              <p className="text-sm font-medium text-white">Response Time</p>
              <p className="text-xs text-gray-400">Within 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
