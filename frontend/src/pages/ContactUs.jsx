import { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineClock } from 'react-icons/hi';
import Breadcrumb from '../components/common/Breadcrumb';

const inputCls =
  'w-full border border-gray-200 rounded-md px-4 py-3 text-sm outline-none focus:border-primary-dark transition-colors';

const info = [
  { icon: HiOutlineLocationMarker, title: 'Address', text: '123 Apple Street, San Francisco, CA 94103' },
  { icon: HiOutlinePhone, title: 'Phone', text: '+1 (800) 555-0199' },
  { icon: HiOutlineMail, title: 'Email', text: 'support@appleon.com' },
  { icon: HiOutlineClock, title: 'Working Hours', text: 'Mon – Sat: 9:00 AM – 6:00 PM' },
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div>
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      <div className="container-app py-14 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-accent-dark font-semibold uppercase tracking-widest text-xs mb-3">Get in touch</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-4">We'd Love to Hear From You</h1>
          <p className="text-gray-500">
            Questions about an order, a product, or just want to say hi? Send us a message and our team will
            respond within one business day.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="flex flex-col gap-5">
            {info.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100">
                <div className="w-11 h-11 rounded-full bg-accent/15 text-accent-dark flex items-center justify-center text-xl shrink-0">
                  <Icon />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-dark text-sm">{title}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{text}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            <input
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className={inputCls}
            />
            <input
              required
              type="email"
              placeholder="Your email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className={inputCls}
            />
            <input
              required
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              className={`${inputCls} sm:col-span-2`}
            />
            <textarea
              required
              placeholder="Your message"
              rows={6}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className={`${inputCls} sm:col-span-2 resize-none`}
            />
            <button
              type="submit"
              className="sm:col-span-2 w-fit px-8 py-3.5 bg-primary-dark text-white text-sm font-semibold uppercase rounded-md hover:bg-accent-dark transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
