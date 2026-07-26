import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcApplePay } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';
import { categories } from '../../data/categories';
import Newsletter from './Newsletter';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white/70 text-sm">
      <Newsletter />

      <div className="container-app py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="inline-block mb-4">
            <span className="font-heading font-extrabold text-2xl tracking-widest text-white">
              APPLE<span className="text-accent">ON</span>
            </span>
          </Link>
          <p className="mb-4 leading-relaxed">
            Everything your Apple device needs — premium cases, straps, cables and chargers made to last.
          </p>
          <div className="flex items-center gap-3">
            {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:bg-accent hover:text-primary-dark hover:border-accent transition-colors"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-wider">Categories</h4>
          <ul className="flex flex-col gap-2.5">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link to={`/category/${cat.slug}`} className="hover:text-accent transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-wider">Information</h4>
          <ul className="flex flex-col gap-2.5">
            <li><Link to="/about-us" className="hover:text-accent transition-colors">About Us</Link></li>
            <li><Link to="/contact-us" className="hover:text-accent transition-colors">Contact Us</Link></li>
            <li><Link to="/shipping" className="hover:text-accent transition-colors">Shipping</Link></li>
            <li><Link to="/track-order" className="hover:text-accent transition-colors">Track Order</Link></li>
            <li><Link to="/faqs" className="hover:text-accent transition-colors">FAQs</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 uppercase text-xs tracking-wider">Get In Touch</h4>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2">
              <HiOutlineLocationMarker className="mt-0.5 shrink-0" />
              <span>123 Apple Street, San Francisco, CA 94103</span>
            </li>
            <li className="flex items-center gap-2">
              <HiOutlinePhone className="shrink-0" />
              <span>+1 (800) 555-0199</span>
            </li>
            <li className="flex items-center gap-2">
              <HiOutlineMail className="shrink-0" />
              <span>support@appleon.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-app py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50">AppleOn Copyright © {new Date().getFullYear()}. All rights reserved.</p>
          <div className="flex items-center gap-3 text-2xl text-white/60">
            <FaCcVisa /> <FaCcMastercard /> <FaCcPaypal /> <FaCcApplePay />
          </div>
        </div>
      </div>
    </footer>
  );
}
