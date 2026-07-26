import Breadcrumb from '../components/common/Breadcrumb';
import { HiOutlineTruck, HiOutlineGlobeAlt, HiOutlineClock, HiOutlineCash } from 'react-icons/hi';

const tiers = [
  { icon: HiOutlineTruck, title: 'Standard Shipping', text: '3–7 business days', price: 'Free on orders over $50' },
  { icon: HiOutlineClock, title: 'Express Shipping', text: '1–3 business days', price: '$14.99' },
  { icon: HiOutlineGlobeAlt, title: 'International Shipping', text: '7–14 business days', price: 'Calculated at checkout' },
  { icon: HiOutlineCash, title: 'Cash on Delivery', text: 'Available in select regions', price: '$3.00 fee' },
];

export default function Shipping() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Shipping' }]} />

      <div className="container-app py-14 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-accent-dark font-semibold uppercase tracking-widest text-xs mb-3">Shipping info</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-4">Shipping & Delivery</h1>
          <p className="text-gray-500">
            We work with trusted couriers to make sure your AppleOn order arrives quickly and safely, wherever
            you are.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-14">
          {tiers.map(({ icon: Icon, title, text, price }) => (
            <div key={title} className="flex items-start gap-4 p-6 rounded-xl border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-accent/15 text-accent-dark flex items-center justify-center text-2xl shrink-0">
                <Icon />
              </div>
              <div>
                <h3 className="font-semibold text-primary-dark">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{text}</p>
                <p className="text-sm font-semibold text-primary mt-1">{price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-6 text-sm text-gray-500 leading-relaxed">
          <div>
            <h2 className="font-semibold text-primary-dark text-lg mb-2">Order Processing</h2>
            <p>
              Orders are processed within 1-2 business days. You will receive a confirmation email with tracking
              information as soon as your order ships.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-primary-dark text-lg mb-2">Delivery Areas</h2>
            <p>
              We currently ship to over 40 countries. If your country isn't listed at checkout, please contact our
              support team and we'll do our best to accommodate you.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-primary-dark text-lg mb-2">Damaged or Lost Packages</h2>
            <p>
              If your order arrives damaged or goes missing in transit, contact us within 7 days of the expected
              delivery date and we'll arrange a replacement or refund at no extra cost.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
