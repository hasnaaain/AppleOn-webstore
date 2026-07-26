import { useMemo, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import Rating from '../common/Rating';
import { products as allProducts } from '../../data/products';

function FilterBlock({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-sm font-semibold uppercase tracking-wide text-primary-dark mb-1"
      >
        {title}
        <HiChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="pt-3">{children}</div>}
    </div>
  );
}

const colorSwatches = {
  Black: '#1a1a1a', White: '#ffffff', Blue: '#3b82f6', Red: '#ef4444', Pink: '#f472b6',
  Purple: '#a855f7', Olive: '#6b7c3f', Yellow: '#eab308', Green: '#22c55e', Gray: '#9ca3af',
  Silver: '#d1d5db', Brown: '#92400e', Violet: '#7c3aed', Navy: '#1e3a8a', Multicolor: 'conic-gradient(red,orange,yellow,green,blue,violet)',
  Tan: '#d2b48c',
};

export default function FilterSidebar({ scopedProducts, filters, setFilters, topRated }) {
  const source = scopedProducts && scopedProducts.length ? scopedProducts : allProducts;

  const materials = useMemo(
    () => [...new Set(source.map((p) => p.material).filter(Boolean))],
    [source]
  );
  const colors = useMemo(
    () => [...new Set(source.map((p) => p.color).filter(Boolean))],
    [source]
  );
  const compatibilities = useMemo(
    () => [...new Set(source.flatMap((p) => p.compatibility || []))],
    [source]
  );
  const brands = useMemo(
    () => [...new Set(source.map((p) => p.brand).filter(Boolean))],
    [source]
  );
  const maxPrice = useMemo(() => Math.max(...source.map((p) => p.price), 100), [source]);

  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const top = topRated || [...allProducts].sort((a, b) => b.rating - a.rating).slice(0, 2);

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <FilterBlock title="Price">
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={0}
            max={filters.priceMax}
            value={filters.priceMin}
            onChange={(e) => setFilters((f) => ({ ...f, priceMin: Number(e.target.value) }))}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
            placeholder="Min"
          />
          <span className="text-gray-300">—</span>
          <input
            type="number"
            min={filters.priceMin}
            value={filters.priceMax}
            onChange={(e) => setFilters((f) => ({ ...f, priceMax: Number(e.target.value) }))}
            className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
            placeholder="Max"
          />
        </div>
        <input
          type="range"
          min={0}
          max={Math.ceil(maxPrice)}
          value={filters.priceMax}
          onChange={(e) => setFilters((f) => ({ ...f, priceMax: Number(e.target.value) }))}
          className="w-full mt-3 accent-[#3f3f3f]"
        />
      </FilterBlock>

      {compatibilities.length > 0 && (
        <FilterBlock title="Compatibility">
          <ul className="flex flex-col gap-2 max-h-48 overflow-y-auto scrollbar-thin">
            {compatibilities.map((c) => (
              <li key={c}>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-primary-dark">
                  <input
                    type="checkbox"
                    checked={filters.compatibility.includes(c)}
                    onChange={() => toggleArrayFilter('compatibility', c)}
                    className="rounded accent-[#3f3f3f]"
                  />
                  {c}
                </label>
              </li>
            ))}
          </ul>
        </FilterBlock>
      )}

      {brands.length > 0 && (
        <FilterBlock title="Brand">
          <ul className="flex flex-col gap-2">
            {brands.map((b) => (
              <li key={b}>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-primary-dark">
                  <input
                    type="checkbox"
                    checked={filters.brand.includes(b)}
                    onChange={() => toggleArrayFilter('brand', b)}
                    className="rounded accent-[#3f3f3f]"
                  />
                  {b}
                </label>
              </li>
            ))}
          </ul>
        </FilterBlock>
      )}

      {colors.length > 0 && (
        <FilterBlock title="Color">
          <div className="flex flex-wrap gap-3">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => toggleArrayFilter('color', c)}
                title={c}
                style={{ background: colorSwatches[c] || '#ccc' }}
                className={`w-7 h-7 rounded-full border-2 transition-all ${
                  filters.color.includes(c)
                    ? 'border-accent-dark scale-110 ring-2 ring-offset-1 ring-accent'
                    : 'border-gray-200'
                }`}
              />
            ))}
          </div>
        </FilterBlock>
      )}

      {materials.length > 0 && (
        <FilterBlock title="Material">
          <ul className="flex flex-col gap-2">
            {materials.map((m) => (
              <li key={m}>
                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-primary-dark">
                  <input
                    type="checkbox"
                    checked={filters.material.includes(m)}
                    onChange={() => toggleArrayFilter('material', m)}
                    className="rounded accent-[#3f3f3f]"
                  />
                  {m}
                </label>
              </li>
            ))}
          </ul>
        </FilterBlock>
      )}

      <FilterBlock title="Stock Status">
        <ul className="flex flex-col gap-2">
          {[
            { key: 'instock', label: 'In stock' },
            { key: 'outofstock', label: 'Out of stock' },
          ].map((s) => (
            <li key={s.key}>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-primary-dark">
                <input
                  type="checkbox"
                  checked={filters.stock.includes(s.key)}
                  onChange={() => toggleArrayFilter('stock', s.key)}
                  className="rounded accent-[#3f3f3f]"
                />
                {s.label}
              </label>
            </li>
          ))}
        </ul>
      </FilterBlock>

      <div className="pt-6">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-dark mb-4">Top Rated Products</h4>
        <ul className="flex flex-col gap-4">
          {top.map((p) => (
            <li key={p.id} className="flex gap-3">
              <img src={p.images[0]} alt={p.name} className="w-14 h-14 object-contain bg-gray-50 rounded-md p-1 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm text-primary-dark line-clamp-2">{p.name}</p>
                <Rating value={p.rating} size={10} showCount={false} />
                <p className="text-primary font-semibold text-sm mt-0.5">${p.price.toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
