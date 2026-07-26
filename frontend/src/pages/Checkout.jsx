import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/common/Breadcrumb';
import { useCartStore } from '../store/useCartStore';

const inputCls =
  'w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-primary-dark transition-colors';

export default function Checkout() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const navigate = useNavigate();
  const [payment, setPayment] = useState('card');

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    clearCart();
    toast.success('Order placed successfully! Thank you for shopping with AppleOn.');
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div>
        <Breadcrumb items={[{ label: 'Checkout' }]} />
        <div className="container-app py-20 text-center">
          <p className="text-gray-500 mb-6">Your cart is empty. Add some products before checking out.</p>
          <Link
            to="/shop"
            className="px-6 py-3 bg-primary-dark text-white text-sm font-semibold uppercase rounded-md hover:bg-accent-dark transition-colors"
          >
            Return to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb items={[{ label: 'Checkout' }]} />

      <div className="container-app py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h2 className="font-semibold text-lg text-primary-dark mb-4">Billing Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <input required placeholder="First name" className={inputCls} />
                <input required placeholder="Last name" className={inputCls} />
                <input required type="email" placeholder="Email address" className={`${inputCls} sm:col-span-2`} />
                <input required placeholder="Phone" className={inputCls} />
                <input placeholder="Company (optional)" className={inputCls} />
                <input required placeholder="Street address" className={`${inputCls} sm:col-span-2`} />
                <input required placeholder="City" className={inputCls} />
                <input required placeholder="State / Province" className={inputCls} />
                <input required placeholder="ZIP / Postal code" className={inputCls} />
                <input required placeholder="Country" className={inputCls} />
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-lg text-primary-dark mb-4">Payment Method</h2>
              <div className="flex flex-col gap-3">
                {[
                  { key: 'card', label: 'Credit / Debit Card' },
                  { key: 'paypal', label: 'PayPal' },
                  { key: 'cod', label: 'Cash on Delivery' },
                ].map((opt) => (
                  <label
                    key={opt.key}
                    className={`flex items-center gap-3 border rounded-md px-4 py-3 cursor-pointer transition-colors ${
                      payment === opt.key ? 'border-primary-dark bg-gray-50' : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === opt.key}
                      onChange={() => setPayment(opt.key)}
                      className="accent-[#3f3f3f]"
                    />
                    <span className="text-sm font-medium text-primary-dark">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 h-fit">
            <h2 className="font-semibold text-lg text-primary-dark mb-5">Your Order</h2>
            <ul className="flex flex-col gap-3 mb-4 max-h-64 overflow-y-auto scrollbar-thin">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between text-sm gap-2">
                  <span className="text-gray-500 line-clamp-1">
                    {item.name} <span className="text-gray-400">× {item.qty}</span>
                  </span>
                  <span className="font-medium text-primary-dark shrink-0">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between py-3 border-t border-gray-200 text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-primary-dark">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-200 text-sm">
              <span className="text-gray-500">Shipping</span>
              <span className="font-medium text-primary-dark">Free</span>
            </div>
            <div className="flex justify-between py-4 text-base">
              <span className="font-semibold text-primary-dark">Total</span>
              <span className="font-bold text-primary text-xl">${subtotal.toFixed(2)}</span>
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-primary-dark text-white text-sm font-semibold uppercase rounded-md hover:bg-accent-dark transition-colors"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
