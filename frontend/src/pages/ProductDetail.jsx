import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { HiOutlineHeart, HiHeart, HiOutlineShieldCheck, HiOutlineTruck, HiOutlineRefresh } from 'react-icons/hi';
import Breadcrumb from '../components/common/Breadcrumb';
import Rating from '../components/common/Rating';
import PriceTag from '../components/common/PriceTag';
import ProductGallery from '../components/product/ProductGallery';
import QuantityInput from '../components/product/QuantityInput';
import ProductGrid from '../components/product/ProductGrid';
import { getProductById, getRelatedProducts } from '../data/products';
import { categories } from '../data/categories';
import { useCartStore } from '../store/useCartStore';
import { useWishlistStore } from '../store/useWishlistStore';
import NotFound from './NotFound';

const tabs = ['Features & Compatibility', 'Additional Information', 'Reviews'];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [bundleSelection, setBundleSelection] = useState({});

  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isWishlisted = useWishlistStore((s) => s.isWishlisted(product?.id));

  const related = useMemo(() => (product ? getRelatedProducts(product, 6) : []), [product]);
  const bundleItems = useMemo(() => (product ? [product, ...related.slice(0, 2)] : []), [product, related]);

  useEffect(() => {
    if (product) {
      setBundleSelection(Object.fromEntries(bundleItems.map((p) => [p.id, true])));
      setQty(1);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!product) return <NotFound />;

  const categoryName = categories.find((c) => c.slug === product.category)?.name;

  const handleAddToCart = () => {
    addItem(product, qty);
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addItem(product, qty);
    navigate('/checkout');
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const bundleTotal = bundleItems.reduce(
    (sum, p) => sum + (bundleSelection[p.id] ? p.price : 0),
    0
  );

  const addBundleToCart = () => {
    const selected = bundleItems.filter((p) => bundleSelection[p.id]);
    selected.forEach((p) => addItem(p, 1));
    toast.success(`${selected.length} item(s) added to cart`);
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: categoryName, to: `/category/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="container-app py-10 sm:py-14">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            <p className="text-xs uppercase tracking-widest text-accent-dark font-semibold mb-2">
              {categoryName}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <Rating value={product.rating} count={product.reviews} />
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">
                {product.reviews} customer review{product.reviews !== 1 ? 's' : ''}
              </span>
            </div>
            <PriceTag price={product.price} size="xl" />

            <p className="text-gray-500 leading-relaxed mt-5">{product.shortDescription}</p>

            <div className="mt-5 text-sm">
              {product.inStock ? (
                <p className="text-green-600 font-medium">
                  {product.stockCount} in stock
                  {product.ordered ? <span className="text-gray-400 font-normal"> · Ordered: {product.ordered}</span> : null}
                </p>
              ) : (
                <p className="text-red-500 font-medium">Out of stock</p>
              )}
            </div>

            <div className="flex items-center flex-wrap gap-3 mt-6">
              <QuantityInput value={qty} onChange={setQty} max={product.stockCount || 10} />
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 min-w-[160px] h-12 px-6 bg-primary-dark text-white text-sm font-semibold uppercase tracking-wide rounded-md hover:bg-accent-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="h-12 px-6 border-2 border-primary-dark text-primary-dark text-sm font-semibold uppercase tracking-wide rounded-md hover:bg-primary-dark hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
              <button
                onClick={handleWishlist}
                className={`h-12 w-12 flex items-center justify-center rounded-md border transition-colors text-lg ${
                  isWishlisted
                    ? 'bg-primary-dark text-white border-primary-dark'
                    : 'border-gray-300 text-gray-500 hover:border-primary-dark hover:text-primary-dark'
                }`}
                aria-label="Toggle wishlist"
              >
                {isWishlisted ? <HiHeart /> : <HiOutlineHeart />}
              </button>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-4 border-t border-gray-100 pt-6">
              {[
                { icon: HiOutlineTruck, text: 'Fast, tracked delivery' },
                { icon: HiOutlineShieldCheck, text: 'Guaranteed safe checkout' },
                { icon: HiOutlineRefresh, text: '30-day easy returns' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-500">
                  <Icon className="text-accent-dark text-xl shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            {product.compatibility && (
              <div className="mt-6 text-sm text-gray-500">
                <span className="font-medium text-primary-dark">Compatibility: </span>
                {product.compatibility.join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* Frequently bought together */}
        {bundleItems.length > 1 && (
          <div className="mt-16 sm:mt-20 border-t border-gray-100 pt-10">
            <h2 className="text-xl font-semibold text-primary-dark mb-6">Frequently Bought Together</h2>
            <div className="flex flex-col lg:flex-row items-center gap-6 bg-gray-50 rounded-xl p-6">
              <div className="flex items-center flex-wrap justify-center gap-3">
                {bundleItems.map((p, idx) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <Link to={`/product/${p.id}`} className="w-24 h-24 bg-white rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-3" />
                    </Link>
                    {idx < bundleItems.length - 1 && <span className="text-2xl text-gray-300 font-light">+</span>}
                  </div>
                ))}
              </div>

              <div className="flex-1 w-full">
                <ul className="flex flex-col gap-2 mb-4">
                  {bundleItems.map((p) => (
                    <li key={p.id} className="flex items-center gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={!!bundleSelection[p.id]}
                        onChange={() =>
                          setBundleSelection((prev) => ({ ...prev, [p.id]: !prev[p.id] }))
                        }
                        className="rounded accent-[#3f3f3f]"
                      />
                      <span className="text-primary-dark">{p.name}</span>
                      <span className="text-primary font-semibold ml-auto">${p.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500">
                    Total for {Object.values(bundleSelection).filter(Boolean).length} item(s):{' '}
                    <span className="text-primary font-semibold text-base">${bundleTotal.toFixed(2)}</span>
                  </p>
                  <button
                    onClick={addBundleToCart}
                    className="px-5 py-2.5 bg-primary-dark text-white text-xs font-semibold uppercase rounded-md hover:bg-accent-dark transition-colors"
                  >
                    Add selected to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mt-16 sm:mt-20 border-t border-gray-100 pt-10">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-semibold uppercase tracking-wide border-b-2 -mb-px transition-colors ${
                  activeTab === tab
                    ? 'border-accent-dark text-primary-dark'
                    : 'border-transparent text-gray-400 hover:text-primary-dark'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'Features & Compatibility' && (
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
              <div>
                <h3 className="font-semibold text-primary-dark mb-2">Features</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {product.description ||
                    'Using dummy content or fake information in the web design process can result in products with unrealistic assumptions and potentially serious design flaws. A seemingly elegant design can quickly begin to bloat with unexpected content or break under the weight of actual activity.'}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-primary-dark mb-2">All-Rounded Protection</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Rated for drops up to 6 feet, these products include additional internal shock-absorbing
                  geometry designed to direct force away from your device during an impact — giving you
                  everyday peace of mind.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'Additional Information' && (
            <table className="w-full max-w-2xl text-sm">
              <tbody>
                {[
                  ['Material', product.material],
                  ['Color', product.color],
                  ['Compatibility', product.compatibility?.join(', ')],
                  product.brand ? ['Brand', product.brand] : null,
                ]
                  .filter(Boolean)
                  .map(([label, value]) => (
                    <tr key={label} className="border-b border-gray-100">
                      <td className="py-3 pr-6 font-medium text-primary-dark w-1/3">{label}</td>
                      <td className="py-3 text-gray-500">{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeTab === 'Reviews' && (
            <div className="max-w-2xl">
              {product.reviews > 0 ? (
                <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                  <div className="w-11 h-11 rounded-full bg-primary-dark text-white flex items-center justify-center font-semibold shrink-0">
                    B
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-primary-dark">Brooklyn Simmons</span>
                      <Rating value={product.rating} showCount={false} size={11} />
                    </div>
                    <p className="text-sm text-gray-500">
                      Using dummy content or fake information in the web design process can result in products
                      with unrealistic assumptions — but not with this one. Great quality and fits perfectly.
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">There are no reviews yet.</p>
              )}
              <p className="text-sm text-gray-400 mt-6">Sign in to leave a review for this product.</p>
            </div>
          )}
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16 sm:mt-20 border-t border-gray-100 pt-10">
            <h2 className="text-xl font-semibold text-primary-dark mb-6">Related Products</h2>
            <ProductGrid products={related} />
          </div>
        )}
      </div>
    </div>
  );
}
