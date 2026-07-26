import Breadcrumb from '../components/common/Breadcrumb';
import { HiOutlineTruck, HiOutlineShieldCheck, HiOutlineRefresh } from 'react-icons/hi';

const team = [
  { name: 'Jane Cooper', role: 'President of Sales' },
  { name: 'Jacob Jones', role: 'Sales Analyst' },
  { name: 'Kristin Watson', role: 'Market Development' },
  { name: 'Darlene Robertson', role: 'Sales Analyst' },
];

const strategies = [
  { icon: HiOutlineTruck, title: 'Fast Delivery', text: 'Orders are processed quickly with reliable tracking every step of the way.' },
  { icon: HiOutlineShieldCheck, title: 'Best Quality', text: 'Every accessory is tested for durability, fit and everyday performance.' },
  { icon: HiOutlineRefresh, title: 'Free Return', text: 'Not the right fit? Return it hassle-free within 30 days.' },
];

export default function AboutUs() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'About Us' }]} />

      <section className="container-app py-14 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-accent-dark font-semibold uppercase tracking-widest text-xs mb-3">Some words about us</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-5 leading-tight">
            We Help Everyone Enjoy Amazing Apple Accessories
          </h1>
          <p className="text-gray-500 leading-relaxed mb-4">
            AppleOn was built on a simple idea: every Apple device deserves accessories that are just as
            thoughtfully designed as the devices themselves. From protective cases to fast-charging cables, we
            source and craft every product with quality and everyday usability in mind.
          </p>
          <p className="text-gray-500 leading-relaxed">
            We work with trusted manufacturers and templating systems that ensure consistent quality across our
            entire catalog — so whether you're buying your first case or your tenth strap, you know exactly what
            you're getting.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary-dark text-white flex items-center justify-center font-semibold">B</div>
            <div>
              <p className="font-semibold text-primary-dark text-sm">Brooklyn Simmons</p>
              <p className="text-xs text-gray-400">Founder, BARONE LLC</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://udaari.alrehmanmarketing.com/wp-content/uploads/2022/09/protective-cases-category-1.jpg"
            alt="AppleOn products"
            className="rounded-xl object-cover w-full h-48 sm:h-64"
          />
          <img
            src="https://udaari.alrehmanmarketing.com/wp-content/uploads/2022/09/watches-straps-category-1.jpg"
            alt="AppleOn products"
            className="rounded-xl object-cover w-full h-48 sm:h-64 mt-8"
          />
        </div>
      </section>

      <section className="bg-gray-50 py-14 sm:py-20">
        <div className="container-app">
          <p className="text-accent-dark font-semibold uppercase tracking-widest text-xs mb-3 text-center">Words about us</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-10 text-center">Our Team</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-xl p-6 text-center border border-gray-100">
                <div className="w-16 h-16 rounded-full bg-primary-dark text-white flex items-center justify-center text-xl font-semibold mx-auto mb-4">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-semibold text-primary-dark text-sm">{member.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app py-14 sm:py-20">
        <p className="text-accent-dark font-semibold uppercase tracking-widest text-xs mb-3 text-center">Buyers trust us</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-10 text-center max-w-2xl mx-auto">
          Our Strategy Is To Provide Our Customers With Quality Products
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {strategies.map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center p-8 rounded-xl border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-accent/15 flex items-center justify-center text-accent-dark text-3xl">
                <Icon />
              </div>
              <h3 className="font-semibold text-lg text-primary-dark mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
