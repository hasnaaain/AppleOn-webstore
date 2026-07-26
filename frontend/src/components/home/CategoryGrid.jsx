import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import SectionHeading from '../common/SectionHeading';

export default function CategoryGrid() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-app">
        <SectionHeading eyebrow="Shop by category" title="Everything Your Apple Device Needs" align="center" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className="group flex flex-col items-center text-center gap-3 p-5 rounded-xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-50 ring-1 ring-gray-100 group-hover:ring-accent transition-all">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-primary-dark group-hover:text-accent-dark transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{cat.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
