import { Link } from 'react-router-dom';
import { useState } from 'react';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { TbArrowsExchange } from 'react-icons/tb';
import toast from 'react-hot-toast';
import Rating from '../common/Rating';
import PriceTag from '../common/PriceTag';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCompareStore } from '../../store/useCompareStore';
import { categories } from '../../data/categories';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product.id));
  const toggleCompare = useCompareStore((s) => s.toggleItem);
  const isCompared = useCompareStore((s) => s.isCompared(product.id));

  const secondImage = product.images[1] || product.images[0];
  const categoryName = categories.find((c) => c.slug === product.category)?.name;

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!product.inStock) return;
    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleCompare = (e) => {
    e.preventDefault();
    toggleCompare(product);
    toast.success(isCompared ? 'Removed from compare' : 'Added to compare');
  };

  return (
    <div
      className="group relative bg-white rounded-lg border border-gray-200 hover:shadow-xl hover:border-transparent transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.badge === 'hot' && (
          <span className="bg-red-500 text-white text-[11px] font-semibold px-2 py-1 rounded uppercase tracking-wide">
            Hot
          </span>
        )}
        {!product.inStock && (
          <span className="bg-gray-800 text-white text-[11px] font-semibold px-2 py-1 rounded uppercase tracking-wide">
            Sold out
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <button
          onClick={handleWishlist}
          aria-label="Add to wishlist"
          className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
            isWishlisted ? 'bg-primary-dark text-white' : 'bg-white text-gray-700 hover:bg-primary-dark hover:text-white'
          }`}
        >
          {isWishlisted ? <HiHeart size={16} /> : <HiOutlineHeart size={16} />}
        </button>
        <button
          onClick={handleCompare}
          aria-label="Add to compare"
          className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-colors ${
            isCompared ? 'bg-primary-dark text-white' : 'bg-white text-gray-700 hover:bg-primary-dark hover:text-white'
          }`}
        >
          <TbArrowsExchange size={16} />
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-contain p-6 transition-opacity duration-500 ${
              hovered && secondImage !== product.images[0] ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {secondImage && (
            <img
              src={secondImage}
              alt={product.name}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-contain p-6 transition-opacity duration-500 ${
                hovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>

        <div className="p-4 text-center border-t border-gray-100">
          {categoryName && (
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1">{categoryName}</p>
          )}
          <h3 className="text-sm font-medium text-primary-dark line-clamp-2 mb-2 min-h-[2.5em] group-hover:text-accent-dark transition-colors">
            {product.name}
          </h3>
          <div className="flex justify-center mb-2">
            <Rating value={product.rating} count={product.reviews} size={11} />
          </div>
          <PriceTag price={product.price} />
        </div>
      </Link>

      {/* Add to cart slide-up */}
      <button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className="w-full flex items-center justify-center gap-2 bg-primary-dark text-white text-xs font-semibold uppercase tracking-wide py-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-accent-dark"
      >
        <HiOutlineShoppingBag size={15} />
        {product.inStock ? 'Add to Cart' : 'Sold Out'}
      </button>
    </div>
  );
}
