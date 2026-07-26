import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiOutlineSearch,
  HiOutlineHeart,
  HiOutlineUser,
  HiOutlineMenu,
  HiX,
  HiChevronDown,
} from 'react-icons/hi';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { TbArrowsExchange } from 'react-icons/tb';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCompareStore } from '../../store/useCompareStore';
import { categories } from '../../data/categories';
import CartDrawer from './CartDrawer';
import MobileMenu from './MobileMenu';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Blog', to: '/blog' },
  { label: 'About Us', to: '/about-us' },
  { label: 'Contact Us', to: '/contact-us' },
];

export default function Header() {
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const cartCount = useCartStore((s) => s.totalItems());
  const subtotal = useCartStore((s) => s.subtotal());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const compareCount = useCompareStore((s) => s.items.length);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`);
      setSearchOpen(false);
      setSearchValue('');
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="container-app flex items-center justify-between h-20 gap-4">
        {/* Mobile menu toggle */}
        <button
          className="lg:hidden text-2xl text-primary-dark"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <HiOutlineMenu />
        </button>

        {/* Logo */}
        <Link to="/" className="shrink-0 select-none">
          <span className="font-heading font-extrabold text-2xl sm:text-3xl tracking-widest text-primary-dark">
            APPLE<span className="text-accent">ON</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          <div
            className="relative"
            onMouseEnter={() => setCategoryMenuOpen(true)}
            onMouseLeave={() => setCategoryMenuOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium uppercase tracking-wide text-primary-dark hover:text-accent-dark transition-colors py-2">
              Categories <HiChevronDown size={14} />
            </button>
            {categoryMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 z-50">
                <div className="bg-white rounded-lg shadow-2xl border border-gray-100 py-2 overflow-hidden">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary hover:bg-gray-50 hover:text-accent-dark transition-colors"
                    >
                      <img src={cat.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium uppercase tracking-wide text-primary-dark hover:text-accent-dark transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="w-10 h-10 flex items-center justify-center text-lg text-primary-dark hover:text-accent-dark transition-colors"
            aria-label="Search"
          >
            {searchOpen ? <HiX /> : <HiOutlineSearch />}
          </button>

          <Link
            to="/compare"
            className="relative w-10 h-10 hidden sm:flex items-center justify-center text-lg text-primary-dark hover:text-accent-dark transition-colors"
            aria-label="Compare"
          >
            <TbArrowsExchange />
            {compareCount > 0 && (
              <span className="absolute top-1 right-1 bg-accent text-primary-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {compareCount}
              </span>
            )}
          </Link>

          <Link
            to="/wishlist"
            className="relative w-10 h-10 flex items-center justify-center text-lg text-primary-dark hover:text-accent-dark transition-colors"
            aria-label="Wishlist"
          >
            <HiOutlineHeart />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-accent text-primary-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/my-account"
            className="w-10 h-10 hidden sm:flex items-center justify-center text-lg text-primary-dark hover:text-accent-dark transition-colors"
            aria-label="Account"
          >
            <HiOutlineUser />
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 pl-2 sm:pl-3 sm:pr-3 h-10 rounded-full border border-gray-200 hover:border-primary-dark transition-colors"
            aria-label="Cart"
          >
            <span className="relative text-lg text-primary-dark">
              <HiOutlineShoppingBag />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-primary-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </span>
            <span className="hidden sm:block text-sm font-semibold text-primary-dark">
              ${subtotal.toFixed(2)}
            </span>
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="border-t border-gray-100 bg-white">
          <form onSubmit={handleSearch} className="container-app py-4 flex items-center gap-3">
            <HiOutlineSearch className="text-xl text-gray-400" />
            <input
              ref={searchRef}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for cases, straps, cables..."
              className="flex-1 outline-none text-primary-dark placeholder:text-gray-400 text-base"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-primary-dark text-white text-sm font-semibold uppercase rounded-md hover:bg-accent-dark transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
