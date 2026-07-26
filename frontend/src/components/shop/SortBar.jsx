const sortOptions = [
  { value: 'default', label: 'Default sorting' },
  { value: 'rating', label: 'Sort by average rating' },
  { value: 'latest', label: 'Sort by latest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
];

export default function SortBar({ count, sort, setSort, columns, setColumns, onToggleFilters }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-gray-50 rounded-lg px-4 py-3 mb-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleFilters}
          className="lg:hidden text-xs font-semibold uppercase tracking-wide px-3 py-2 border border-gray-300 rounded-md hover:border-primary-dark transition-colors"
        >
          Filters
        </button>
        <p className="text-sm text-gray-500 hidden sm:block">
          Showing <span className="text-primary-dark font-medium">{count}</span> result{count !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5">
          {[2, 3, 4].map((c) => (
            <button
              key={c}
              onClick={() => setColumns(c)}
              className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-semibold border transition-colors ${
                columns === c
                  ? 'bg-primary-dark text-white border-primary-dark'
                  : 'border-gray-300 text-gray-500 hover:border-primary-dark'
              }`}
              aria-label={`${c} columns`}
            >
              {c}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none bg-white cursor-pointer"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
