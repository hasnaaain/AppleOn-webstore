import { Link } from 'react-router-dom';

const IMG = 'https://udaari.alrehmanmarketing.com/wp-content/uploads/2022/09';

const banners = [
  {
    eyebrow: 'New Collection',
    title: 'Premium iPhone Cases',
    cta: 'Shop Cases',
    to: '/category/cases',
    image: `${IMG}/accessories-banner-2-1.jpg`,
  },
  {
    eyebrow: 'Apple Watch Collection',
    title: 'Stylish Watch Straps',
    cta: 'Shop Straps',
    to: '/category/straps',
    image: `${IMG}/accessories-banner-3-1.jpg`,
  },
  {
    eyebrow: 'Limited Time Offer',
    title: 'Save Up to 50%',
    cta: 'Shop Deals',
    to: '/shop',
    image: `${IMG}/accessories-banner-4-1.jpg`,
  },
  {
    eyebrow: 'Fast Charging',
    title: 'Chargers & MagSafe',
    cta: 'Buy Now',
    to: '/category/charger',
    image: `${IMG}/mag-safe-accessories-category-1.jpg`,
  },
];

export default function PromoBanners() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container-app grid sm:grid-cols-2 gap-5">
        {banners.map((b) => (
          <Link
            key={b.title}
            to={b.to}
            className="group relative rounded-xl overflow-hidden h-64 flex items-center bg-primary-dark"
          >
            <img
              src={b.image}
              alt={b.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
            />
            <div className="relative z-10 px-8">
              <p className="text-accent font-semibold uppercase tracking-widest text-xs mb-2">{b.eyebrow}</p>
              <h3 className="text-white text-2xl font-bold mb-4 max-w-xs">{b.title}</h3>
              <span className="inline-block text-white text-sm font-semibold uppercase border-b-2 border-accent pb-1 group-hover:text-accent transition-colors">
                {b.cta}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
