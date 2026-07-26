import { Link } from 'react-router-dom';
import { HiX, HiOutlineTrash } from 'react-icons/hi';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { useCartStore } from '../../store/useCartStore';

export default function CartDrawer({ open, onClose }) {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[70] shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-primary-dark">Shopping Cart ({items.length})</h3>
          <button onClick={onClose} className="text-xl text-gray-400 hover:text-primary-dark" aria-label="Close cart">
            <HiX />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 text-gray-500">
              <HiOutlineShoppingBag size={48} className="text-gray-300" />
              <p>Your cart is currently empty.</p>
              <Link
                to="/shop"
                onClick={onClose}
                className="mt-2 px-5 py-2 bg-primary-dark text-white text-sm font-semibold uppercase rounded-md hover:bg-accent-dark transition-colors"
              >
                Return to shop
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 pb-4 border-b border-gray-100 last:border-0">
                  <Link to={`/product/${item.id}`} onClick={onClose} className="w-16 h-16 shrink-0 bg-gray-50 rounded-md overflow-hidden">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain p-1" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.id}`}
                      onClick={onClose}
                      className="text-sm font-medium text-primary-dark line-clamp-2 hover:text-accent-dark"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.qty} × <span className="text-primary font-semibold">${item.price.toFixed(2)}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-300 hover:text-red-500 transition-colors h-fit"
                    aria-label="Remove item"
                  >
                    <HiOutlineTrash />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-primary-dark">Subtotal</span>
              <span className="font-semibold text-lg text-primary">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                to="/cart"
                onClick={onClose}
                className="w-full text-center py-3 border border-primary-dark text-primary-dark text-sm font-semibold uppercase rounded-md hover:bg-gray-50 transition-colors"
              >
                View Cart
              </Link>
              <Link
                to="/checkout"
                onClick={onClose}
                className="w-full text-center py-3 bg-primary-dark text-white text-sm font-semibold uppercase rounded-md hover:bg-accent-dark transition-colors"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
