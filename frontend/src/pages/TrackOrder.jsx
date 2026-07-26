import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineSearch } from 'react-icons/hi';
import Breadcrumb from '../components/common/Breadcrumb';

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast('No matching order found. Please double-check your order ID and email.', { icon: '📦' });
  };

  return (
    <div>
      <Breadcrumb items={[{ label: 'Track Order' }]} />
      <div className="container-app py-14 sm:py-20 max-w-lg">
        <div className="text-center mb-10">
          <p className="text-accent-dark font-semibold uppercase tracking-widest text-xs mb-3">Where's my order?</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-4">Track Your Order</h1>
          <p className="text-gray-500 text-sm">
            Enter your order ID and email address below to view the latest status of your shipment.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            placeholder="Order ID (e.g. #AO10234)"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-primary-dark transition-colors"
          />
          <input
            required
            type="email"
            placeholder="Billing email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-primary-dark transition-colors"
          />
          <button
            type="submit"
            className="flex items-center justify-center gap-2 py-3.5 bg-primary-dark text-white text-sm font-semibold uppercase rounded-md hover:bg-accent-dark transition-colors"
          >
            <HiOutlineSearch /> Track Order
          </button>
        </form>
      </div>
    </div>
  );
}
