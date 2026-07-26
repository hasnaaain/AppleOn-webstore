import { useSearchParams } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductListing from '../components/shop/ProductListing';
import { products } from '../data/products';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  return (
    <div>
      <Breadcrumb items={[{ label: 'Shop' }]} />

      <div className="bg-gray-50 py-10 sm:py-14 text-center">
        <p className="text-accent-dark font-semibold uppercase tracking-widest text-xs mb-2">
          {searchQuery ? 'Search results' : 'The full collection'}
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark">
          {searchQuery ? `Results for "${searchQuery}"` : 'Shop'}
        </h1>
      </div>

      <div className="container-app py-10 sm:py-14">
        <ProductListing baseProducts={products} searchQuery={searchQuery} />
      </div>
    </div>
  );
}
