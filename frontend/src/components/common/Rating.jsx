import { FaStar, FaRegStar } from 'react-icons/fa';

export default function Rating({ value = 0, count, size = 12, showCount = true }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-[--color-star]" style={{ '--color-star': '#eabe12' }}>
        {stars.map((s) =>
          s <= Math.round(value) ? (
            <FaStar key={s} size={size} />
          ) : (
            <FaRegStar key={s} size={size} />
          )
        )}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-gray-500">({count})</span>
      )}
    </div>
  );
}
