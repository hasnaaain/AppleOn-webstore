import { Link } from 'react-router-dom';
import { HiOutlineTrash, HiOutlineShoppingBag } from 'react-icons/hi';
import Breadcrumb from '../components/common/Breadcrumb';
import QuantityInput from '../components/product/QuantityInput';
import { useCartStore } from '../store/useCartStore';

export default function Cart() {
  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <div>
      <Breadcrumb items={[{ label: 'Cart' }]} />

      <div className="container-app py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-20">
            <HiOutlineShoppingBag size={64} className="text-gray-200" />
            <p className="text-gray-500 max-w-sm">
              Your cart is currently empty. Before proceeding to checkout you must add some products to your
              shopping cart. You will find a lot of interesting products on our "Shop" page.
            </p>
            <Link
              to="/shop"
              className="px-6 py-3 bg-primary-dark text-white text-sm font-semibold uppercase rounded-md hover:bg-accent-dark transition-colors"
            >
              Return to Shop
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 overflow-x-auto">
              <table className="w-full min-w-[560px]">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-400">
                    <th className="pb-4 font-medium" colSpan={2}>Product</th>
                    <th className="pb-4 font-medium">Price</th>
                    <th className="pb-4 font-medium">Quantity</th>
                    <th className="pb-4 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-5 pr-2 w-8">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                          aria-label="Remove"
                        >
                          <HiOutlineTrash />
                        </button>
                      </td>
                      <td className="py-5">
                        <Link to={`/product/${item.id}`} className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-50 rounded-md overflow-hidden shrink-0">
                            <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain p-1.5" />
                          </div>
                          <span className="text-sm font-medium text-primary-dark hover:text-accent-dark transition-colors line-clamp-2">
                            {item.name}
                          </span>
                        </Link>
                      </td>
                      <td className="py-5 text-primary font-semibold">${item.price.toFixed(2)}</td>
                      <td className="py-5">
                        <QuantityInput value={item.qty} onChange={(v) => updateQty(item.id, v)} max={item.stockCount || 20} />
                      </td>
                      <td className="py-5 text-right font-semibold text-primary-dark">
                        ${(item.price * item.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Link
                to="/shop"
                className="inline-block mt-6 text-sm font-semibold uppercase tracking-wide text-primary-dark border-b-2 border-accent pb-0.5 hover:text-accent-dark transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 h-fit">
              <h2 className="font-semibold text-lg text-primary-dark mb-5">Cart Totals</h2>
              <div className="flex justify-between py-3 border-b border-gray-200 text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium text-primary-dark">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-gray-200 text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-primary-dark">Free</span>
              </div>
              <div className="flex justify-between py-4 text-base">
                <span className="font-semibold text-primary-dark">Total</span>
                <span className="font-bold text-primary text-xl">${subtotal.toFixed(2)}</span>
              </div>
              <Link
                to="/checkout"
                className="block w-full text-center py-3.5 bg-primary-dark text-white text-sm font-semibold uppercase rounded-md hover:bg-accent-dark transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
