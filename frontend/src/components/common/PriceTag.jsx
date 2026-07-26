export default function PriceTag({ price, salePrice, size = 'base' }) {
  const sizes = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };
  const cls = sizes[size] || sizes.base;

  if (salePrice != null && salePrice < price) {
    return (
      <span className={`font-semibold text-primary ${cls}`}>
        ${salePrice.toFixed(2)}{' '}
        <del className="text-gray-400 font-normal text-[0.85em]">${price.toFixed(2)}</del>
      </span>
    );
  }

  return <span className={`font-semibold text-primary ${cls}`}>${price.toFixed(2)}</span>;
}
