import SectionHeading from '../common/SectionHeading';
import ProductGrid from '../product/ProductGrid';
import { bestSellers } from '../../data/products';

export default function BestSellers() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-app">
        <SectionHeading
          eyebrow="Customer favorites"
          title="Best Sellers"
          align="center"
        />
        <p className="text-center text-gray-500 -mt-5 mb-10 max-w-lg mx-auto">
          Explore our most-loved Apple accessories chosen by thousands of satisfied customers.
        </p>
        <ProductGrid products={bestSellers} />
      </div>
    </section>
  );
}
