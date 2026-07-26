import { Link } from 'react-router-dom';
import { HiX } from 'react-icons/hi';
import { categories } from '../../data/categories';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Blog', to: '/blog' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Contact Us', to: '/contact-us' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Track Order', to: '/track-order' },
];

export default function MobileMenu({ open, onClose }) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white z-[70] shadow-2xl transition-transform duration-300 flex flex-col lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="font-heading font-extrabold text-xl tracking-widest text-primary-dark">
            APPLE<span className="text-accent">ON</span>
          </span>
          <button onClick={onClose} className="text-xl text-gray-400 hover:text-primary-dark" aria-label="Close menu">
            <HiX />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin py-2">
          <p className="px-5 pt-3 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Categories
          </p>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              onClick={onClose}
              className="flex items-center gap-3 px-5 py-2.5 text-sm text-primary-dark hover:bg-gray-50 hover:text-accent-dark transition-colors"
            >
              <img src={cat.image} alt="" className="w-7 h-7 rounded-full object-cover" />
              {cat.name}
            </Link>
          ))}

          <p className="px-5 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Menu
          </p>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className="block px-5 py-2.5 text-sm text-primary-dark hover:bg-gray-50 hover:text-accent-dark transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
