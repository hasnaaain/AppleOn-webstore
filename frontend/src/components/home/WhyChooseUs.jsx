import { HiOutlineTruck, HiOutlineShieldCheck, HiOutlineRefresh } from 'react-icons/hi';
import SectionHeading from '../common/SectionHeading';

const features = [
  {
    icon: HiOutlineTruck,
    title: 'Fast Delivery',
    text: 'We process and dispatch orders quickly so your favorite Apple accessories reach your doorstep without delay.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Premium Quality',
    text: 'From durable materials to precision craftsmanship, every product is built to meet high-quality standards.',
  },
  {
    icon: HiOutlineRefresh,
    title: 'Easy Return',
    text: 'Shop confidently with our hassle-free return policy and responsive customer support whenever you need it.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-app">
        <SectionHeading eyebrow="Buyers trust us" title="Why Choose AppleOn" align="center" />
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
          {features.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="text-center p-8 rounded-xl border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent/15 flex items-center justify-center text-accent-dark text-3xl">
                <Icon />
              </div>
              <h3 className="font-semibold text-lg text-primary-dark mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
