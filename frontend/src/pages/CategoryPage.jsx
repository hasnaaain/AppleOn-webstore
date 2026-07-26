import { Link, useParams } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductListing from '../components/shop/ProductListing';
import { categories, caseModelCategories, strapSubCategories } from '../data/categories';
import { getProductsByCategory } from '../data/products';
import NotFound from './NotFound';

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);

  if (!category) return <NotFound />;

  const categoryProducts = getProductsByCategory(slug);
  const subCategories =
    slug === 'cases' ? caseModelCategories : slug === 'straps' ? strapSubCategories : null;

  return (
    <div>
      <Breadcrumb items={[{ label: category.name }]} />

      <div className="relative bg-primary-dark py-12 sm:py-16 text-center overflow-hidden">
        <img src={category.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{category.name}</h1>
          <p className="text-white/70 mt-2 max-w-lg mx-auto px-4">{category.description}</p>
        </div>
      </div>

      {subCategories && (
        <div className="container-app py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-primary-dark">Choose Your {slug === 'cases' ? 'Phone' : 'Style'}</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {subCategories.map((sc) => (
              <Link
                key={sc.slug}
                to={`/category/${slug}?type=${sc.slug}`}
                className="group flex flex-col items-center gap-2 text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-100 ring-1 ring-gray-100 group-hover:ring-accent transition-all">
                  <img src={sc.image} alt={sc.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="text-xs font-medium text-primary-dark group-hover:text-accent-dark transition-colors">
                  {sc.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="container-app py-6 sm:py-10">
        <ProductListing baseProducts={categoryProducts} />
      </div>
    </div>
  );
}
