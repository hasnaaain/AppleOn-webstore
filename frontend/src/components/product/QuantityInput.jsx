import { HiMinus, HiPlus } from 'react-icons/hi';

export default function QuantityInput({ value, onChange, min = 1, max = 99 }) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <div className="flex items-center border border-gray-300 rounded-md h-12 w-32">
      <button
        type="button"
        onClick={dec}
        className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary-dark transition-colors"
        aria-label="Decrease quantity"
      >
        <HiMinus size={13} />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => {
          const v = parseInt(e.target.value, 10);
          if (!Number.isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
        }}
        className="w-full h-full text-center outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        onClick={inc}
        className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary-dark transition-colors"
        aria-label="Increase quantity"
      >
        <HiPlus size={13} />
      </button>
    </div>
  );
}
