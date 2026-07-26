import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const IMG = 'https://udaari.alrehmanmarketing.com/wp-content/uploads/2022/09';

const slides = [
  {
    eyebrow: 'Premium Apple Accessories',
    title: 'Discover Premium-Quality Accessories That Combine Style & Performance',
    text: 'From protective cases to fast chargers, AppleOn has everything you need to enhance your Apple experience.',
    image: `${IMG}/w-accessories-slider.jpg`,
    cta: { label: 'Shop Now', to: '/shop' },
    cta2: { label: 'Explore Collection', to: '/category/cases' },
  },
  {
    eyebrow: 'Power Your Apple Devices Faster',
    title: 'High-Speed Charging Accessories Engineered For Everyday Use',
    text: 'Shop MagSafe chargers, power banks, cables, and adapters trusted for safe, reliable performance.',
    image: `${IMG}/accessories-slide-2.jpg`,
    cta: { label: 'Shop Chargers', to: '/category/charger' },
  },
  {
    eyebrow: 'Protect What Matters',
    title: 'Keep Your Device Looking Brand New',
    text: 'Premium protective cases, screen protectors and rugged covers for every iPhone model.',
    image: `${IMG}/accessories-slide-3.jpg`,
    cta: { label: 'Shop Cases', to: '/category/cases' },
  },
];

export default function HeroSlider() {
  return (
    <section className="relative bg-gray-50">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        className="hero-swiper"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="container-app grid lg:grid-cols-2 items-center gap-8 py-14 sm:py-20 min-h-[420px] sm:min-h-[520px]">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <p className="text-accent-dark font-semibold uppercase tracking-widest text-xs sm:text-sm mb-4 animate-fade-up">
                  {slide.eyebrow}
                </p>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-dark leading-tight mb-5 animate-fade-up">
                  {slide.title}
                </h1>
                <p className="text-gray-500 max-w-md mx-auto lg:mx-0 mb-8 animate-fade-up">{slide.text}</p>
                <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap animate-fade-up">
                  <Link
                    to={slide.cta.to}
                    className="px-7 py-3.5 bg-primary-dark text-white text-sm font-semibold uppercase tracking-wide rounded-md hover:bg-accent-dark transition-colors"
                  >
                    {slide.cta.label}
                  </Link>
                  {slide.cta2 && (
                    <Link
                      to={slide.cta2.to}
                      className="px-7 py-3.5 border-2 border-primary-dark text-primary-dark text-sm font-semibold uppercase tracking-wide rounded-md hover:bg-primary-dark hover:text-white transition-colors"
                    >
                      {slide.cta2.label}
                    </Link>
                  )}
                </div>
              </div>
              <div className="order-1 lg:order-2 flex justify-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="max-h-[280px] sm:max-h-[420px] w-auto object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
