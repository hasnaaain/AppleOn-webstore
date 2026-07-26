import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineMail } from 'react-icons/hi';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("You're subscribed! Welcome to AppleOn.");
    setEmail('');
  };

  return (
    <section className="bg-primary-dark">
      <div className="container-app py-14 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="text-center lg:text-left">
          <h3 className="text-white text-xl sm:text-2xl font-semibold mb-1">
            Hey you, sign up and connect to AppleOn!
          </h3>
          <p className="text-white/60 text-sm">
            Be the first to learn about our latest trends and get exclusive offers.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full lg:w-auto flex items-center gap-2 max-w-md">
          <div className="flex items-center flex-1 bg-white/10 border border-white/20 rounded-full px-4 h-12">
            <HiOutlineMail className="text-white/50 mr-2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="bg-transparent outline-none text-white placeholder:text-white/40 text-sm w-full"
            />
          </div>
          <button
            type="submit"
            className="h-12 px-6 rounded-full bg-accent text-primary-dark text-sm font-semibold uppercase whitespace-nowrap hover:bg-white transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
