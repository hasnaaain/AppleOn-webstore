import { Link } from 'react-router-dom';
import { HiOutlineTrash, HiCheck, HiX } from 'react-icons/hi';
import { TbArrowsExchange } from 'react-icons/tb';
import Breadcrumb from '../components/common/Breadcrumb';
import Rating from '../components/common/Rating';
import { useCompareStore } from '../store/useCompareStore';

const rows = [
  { key: 'price', label: 'Price', render: (p) => `$${p.price.toFixed(2)}` },
  { key: 'rating', label: 'Rating', render: (p) => <Rating value={p.rating} count={p.reviews} size={12} /> },
  { key: 'color', label: 'Color', render: (p) => p.color || '—' },
  { key: 'material', label: 'Material', render: (p) => p.material || '—' },
  { key: 'compatibility', label: 'Compatibility', render: (p) => p.compatibility?.join(', ') || '—' },
  {
    key: 'inStock',
    label: 'Availability',
    render: (p) =>
      p.inStock ? (
        <span className="flex items-center gap-1 text-green-600"><HiCheck /> In stock</span>
      ) : (
        <span className="flex items-center gap-1 text-red-500"><HiX /> Sold out</span>
      ),
  },
];

export default function Compare() {
  const items = useCompareStore((s) => s.items);
  const removeItem = useCompareStore((s) => s.removeItem);

  return (
    <div>
      <Breadcrumb items={[{ label: 'Compare' }]} />

      <div className="container-app py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-8">Compare Products</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center gap-4 py-20">
            <TbArrowsExchange size={64} className="text-gray-200" />
            <p className="text-gray-500">You haven't added any products to compare yet.</p>
            <Link
              to="/shop"
              className="px-6 py-3 bg-primary-dark text-white text-sm font-semibold uppercase rounded-md hover:bg-accent-dark transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr>
                  <td className="w-40" />
                  {items.map((p) => (
                    <td key={p.id} className="p-4 align-top text-center border-b border-gray-100 min-w-[180px]">
                      <button
                        onClick={() => removeItem(p.id)}
                        className="ml-auto mb-2 flex text-gray-300 hover:text-red-500 transition-colors"
                        aria-label="Remove"
                      >
                        <HiOutlineTrash />
                      </button>
                      <Link to={`/product/${p.id}`} className="block">
                        <img src={p.images[0]} alt={p.name} className="w-24 h-24 object-contain mx-auto bg-gray-50 rounded-md p-2 mb-3" />
                        <p className="text-sm font-medium text-primary-dark hover:text-accent-dark line-clamp-2">{p.name}</p>
                      </Link>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.key} className="border-b border-gray-100">
                    <td className="py-4 pr-4 font-medium text-primary-dark text-sm">{row.label}</td>
                    {items.map((p) => (
                      <td key={p.id} className="py-4 px-4 text-center text-sm text-gray-500">
                        {row.render(p)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
