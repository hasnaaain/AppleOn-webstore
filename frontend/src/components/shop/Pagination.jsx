import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:border-primary-dark hover:text-primary-dark disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        <HiChevronLeft />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
            p === page
              ? 'bg-primary-dark text-white'
              : 'border border-gray-200 text-gray-500 hover:border-primary-dark hover:text-primary-dark'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 hover:border-primary-dark hover:text-primary-dark disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        <HiChevronRight />
      </button>
    </div>
  );
}
