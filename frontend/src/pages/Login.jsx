import { useState } from 'react';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/common/Breadcrumb';

const inputCls =
  'w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-primary-dark transition-colors';

export default function Login() {
  const [tab, setTab] = useState('login');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(tab === 'login' ? 'Signed in successfully!' : 'Account created successfully!');
  };

  return (
    <div>
      <Breadcrumb items={[{ label: 'My Account' }]} />
      <div className="container-app py-14 sm:py-20 max-w-md">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full p-1 mb-10 w-fit mx-auto">
          {['login', 'register'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-colors ${
                tab === t ? 'bg-primary-dark text-white' : 'text-gray-500 hover:text-primary-dark'
              }`}
            >
              {t === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {tab === 'register' && <input required placeholder="Full name" className={inputCls} />}
          <input required type="email" placeholder="Email address" className={inputCls} />
          <input required type="password" placeholder="Password" className={inputCls} />
          {tab === 'login' && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-500">
                <input type="checkbox" className="rounded accent-[#3f3f3f]" /> Remember me
              </label>
              <a href="#" className="text-primary-dark font-medium hover:text-accent-dark transition-colors">
                Lost your password?
              </a>
            </div>
          )}
          <button
            type="submit"
            className="py-3.5 bg-primary-dark text-white text-sm font-semibold uppercase rounded-md hover:bg-accent-dark transition-colors mt-2"
          >
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
