import { Link } from 'react-router-dom';
import { HiOutlineHeart } from 'react-icons/hi';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductGrid from '../components/product/ProductGrid';
import { useWishlistStore } from '../store/useWishlistStore';

export default function Wishlist() {
  const items = useWishlistStore((s) => s.items);

  return (
    <div>
      <Breadcrumb items={[{ label: 'Wishlist' }]} />

      <div className="container-app py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-8">My Wishlist</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-20">
            <HiOutlineHeart size={64} className="text-gray-200" />
            <p className="text-gray-500">Your wishlist is currently empty.</p>
            <Link
              to="/shop"
              className="px-6 py-3 bg-primary-dark text-white text-sm font-semibold uppercase rounded-md hover:bg-accent-dark transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <ProductGrid products={items} />
        )}
      </div>
    </div>
  );
}
