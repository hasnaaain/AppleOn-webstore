import { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import ProductGrid from '../product/ProductGrid';
import { newArrivalTabs } from '../../data/products';

const tabNames = Object.keys(newArrivalTabs);

export default function NewArrivalsTabs() {
  const [active, setActive] = useState(tabNames[0]);

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container-app">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <SectionHeading eyebrow="Hurry up to buy" title="New Arrivals" className="mb-0" />
          <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-gray-200 w-fit">
            {tabNames.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wide transition-colors ${
                  active === tab
                    ? 'bg-primary-dark text-white'
                    : 'text-gray-500 hover:text-primary-dark'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <ProductGrid products={newArrivalTabs[active]} />
      </div>
    </section>
  );
}
