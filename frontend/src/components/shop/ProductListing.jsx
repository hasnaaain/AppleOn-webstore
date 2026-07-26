import { useEffect, useMemo, useState } from 'react';
import { HiX } from 'react-icons/hi';
import FilterSidebar from './FilterSidebar';
import SortBar from './SortBar';
import Pagination from './Pagination';
import ProductGrid from '../product/ProductGrid';

const PAGE_SIZE = 9;

const defaultFilters = {
  priceMin: 0,
  priceMax: 500,
  compatibility: [],
  brand: [],
  color: [],
  material: [],
  stock: [],
};

export default function ProductListing({ baseProducts, searchQuery }) {
  const [filters, setFilters] = useState(defaultFilters);
  const [sort, setSort] = useState('default');
  const [columns, setColumns] = useState(4);
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [filters, sort, baseProducts, searchQuery]);

  const filtered = useMemo(() => {
    let list = [...baseProducts];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    list = list.filter((p) => p.price >= filters.priceMin && p.price <= filters.priceMax);

    if (filters.compatibility.length) {
      list = list.filter((p) =>
        (p.compatibility || []).some((c) => filters.compatibility.includes(c))
      );
    }
    if (filters.brand.length) {
      list = list.filter((p) => filters.brand.includes(p.brand));
    }
    if (filters.color.length) {
      list = list.filter((p) => filters.color.includes(p.color));
    }
    if (filters.material.length) {
      list = list.filter((p) => filters.material.includes(p.material));
    }
    if (filters.stock.length) {
      list = list.filter((p) => {
        if (filters.stock.includes('instock') && p.inStock) return true;
        if (filters.stock.includes('outofstock') && !p.inStock) return true;
        return false;
      });
    }

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'latest':
        list.sort((a, b) => (b.id > a.id ? 1 : -1));
        break;
      default:
        break;
    }

    return list;
  }, [baseProducts, filters, sort, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile filter drawer */}
      <div
        className={`fixed inset-0 bg-black/40 z-[80] transition-opacity lg:hidden ${
          mobileFiltersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileFiltersOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white z-[90] shadow-2xl transition-transform duration-300 overflow-y-auto lg:hidden ${
          mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white">
          <h3 className="font-semibold text-primary-dark">Filters</h3>
          <button onClick={() => setMobileFiltersOpen(false)} className="text-xl text-gray-400">
            <HiX />
          </button>
        </div>
        <div className="px-5">
          <FilterSidebar scopedProducts={baseProducts} filters={filters} setFilters={setFilters} />
        </div>
      </div>

      <div className="hidden lg:block">
        <FilterSidebar scopedProducts={baseProducts} filters={filters} setFilters={setFilters} />
      </div>

      <div className="flex-1 min-w-0">
        <SortBar
          count={filtered.length}
          sort={sort}
          setSort={setSort}
          columns={columns}
          setColumns={setColumns}
          onToggleFilters={() => setMobileFiltersOpen(true)}
        />
        <ProductGrid products={paginated} columns={columns} />
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
}
