import ProductCard from './ProductCard';

export default function ProductGrid({ products, columns = 4 }) {
  const colClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
    5: 'sm:grid-cols-2 lg:grid-cols-5',
  }[columns] || 'sm:grid-cols-2 lg:grid-cols-4';

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        No products were found matching your selection.
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 ${colClass} gap-4 sm:gap-5`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
