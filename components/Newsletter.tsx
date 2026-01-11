
import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="inline-block p-2 bg-[#e2231a] rounded-full mb-6">
          <i className="fas fa-envelope text-xl px-2"></i>
        </div>
        <h2 className="text-3xl font-bold mb-4">The ThinkPad Digest</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Stay updated with rare model drops, coreboot guides, and exclusive discounts on spare parts.
        </p>
        
        {status === 'success' ? (
          <div className="bg-green-900/30 text-green-400 p-4 rounded border border-green-800 animate-pulse">
            Welcome to the community! Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#e2231a] hover:bg-red-700 px-8 py-3 rounded font-bold transition-all disabled:opacity-50"
            >
              {status === 'loading' ? 'Joining...' : 'Subscribe Now'}
            </button>
          </form>
        )}
        <p className="mt-4 text-[10px] text-gray-500">
          No spam. Only trackpoint goodness.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
