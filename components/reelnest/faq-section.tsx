'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'Is ReelNest free to use?',
    answer:
      'Yes, ReelNest is completely free. You can download Instagram Reels, Stories, YouTube videos, and convert to MP3 without any cost or signup.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No account is needed. Just paste the URL and download. We believe in keeping things simple and fast.',
  },
  {
    question: 'What video qualities are supported?',
    answer:
      'We support multiple resolutions including 144p, 360p, 720p, and 1080p. The available qualities depend on the source video.',
  },
  {
    question: 'Is it safe to use ReelNest?',
    answer:
      'Absolutely. We do not store any personal data or downloaded content. All processing happens securely and your privacy is our priority.',
  },
  {
    question: 'Can I download private Instagram content?',
    answer:
      'No, ReelNest only works with publicly available content. Private accounts and restricted content cannot be downloaded.',
  },
  {
    question: 'How fast are the downloads?',
    answer:
      'Downloads are typically instant. The speed depends on your internet connection and the video size, but our servers process requests in seconds.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Everything you need to know about ReelNest
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="glass rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-sm font-medium text-white pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
