import { Link } from 'react-router-dom';

const messages = [
  'Free shipping on all orders over $50',
  'New arrivals dropping weekly — shop the latest cases',
  '30-day hassle-free returns on every order',
];

export default function TopBar() {
  return (
    <div className="bg-primary-dark text-white text-xs overflow-hidden">
      <div className="container-app flex items-center justify-center sm:justify-between py-2">
        <p className="hidden sm:block text-white/70">Everything your Apple device needs.</p>
        <div className="flex items-center gap-1 font-medium tracking-wide">
          <span className="text-accent">✦</span>
          <span>{messages[0]}</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-white/70">
          <Link to="/track-order" className="hover:text-white transition-colors">Track Order</Link>
          <Link to="/faqs" className="hover:text-white transition-colors">FAQs</Link>
        </div>
      </div>
    </div>
  );
}
