import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import Breadcrumb from '../components/common/Breadcrumb';

const faqs = [
  {
    q: 'How long does shipping take?',
    a: 'Standard orders ship within 1-2 business days and typically arrive within 3-7 business days depending on your location. Expedited shipping options are available at checkout.',
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a hassle-free 30-day return policy on all unused items in original packaging. Simply visit our Track Order page to start a return.',
  },
  {
    q: 'Do your cases fit all iPhone models?',
    a: 'Each case is designed for a specific iPhone model or model range — check the "Compatibility" section on each product page before ordering.',
  },
  {
    q: 'Are your MagSafe accessories officially certified?',
    a: 'Yes, all AppleOn MagSafe products are tested to ensure proper magnetic alignment and charging speeds with genuine Apple devices.',
  },
  {
    q: 'How can I track my order?',
    a: "Once your order ships, you'll receive a tracking number via email. You can also check status anytime on our Track Order page.",
  },
  {
    q: 'Do you offer international shipping?',
    a: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by destination and are calculated at checkout.',
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-medium text-primary-dark">{q}</span>
        <HiChevronDown className={`text-gray-400 shrink-0 ml-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{a}</p>}
    </div>
  );
}

export default function FAQs() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'FAQs' }]} />

      <div className="container-app py-14 sm:py-20 max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-accent-dark font-semibold uppercase tracking-widest text-xs mb-3">Need help?</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark">Frequently Asked Questions</h1>
        </div>
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <FaqItem key={faq.q} {...faq} />
          ))}
        </div>
      </div>
    </div>
  );
}
