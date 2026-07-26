import Breadcrumb from '../components/common/Breadcrumb';

const IMG = 'https://udaari.alrehmanmarketing.com/wp-content/uploads/2022/09';

const posts = [
  { title: 'How to Choose the Right Case for Your iPhone', excerpt: 'From silicone to leather — here is how to pick protection that matches your lifestyle.', image: `${IMG}/protective-cases-category-1.jpg`, date: 'Jul 12, 2026' },
  { title: '5 MagSafe Accessories Worth Adding to Your Setup', excerpt: 'MagSafe has changed how we charge and carry our iPhones. Here are our favorite picks.', image: `${IMG}/mag-safe-accessories-category-1.jpg`, date: 'Jul 05, 2026' },
  { title: 'Apple Watch Straps: A Style Guide for Every Occasion', excerpt: 'Pair the right strap with the right moment, from the gym to the boardroom.', image: `${IMG}/watches-straps-category-1.jpg`, date: 'Jun 28, 2026' },
];

export default function Blog() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'Blog' }]} />
      <div className="container-app py-14 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-accent-dark font-semibold uppercase tracking-widest text-xs mb-3">Our blog</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-dark">Latest Tips & Stories</h1>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.title} className="rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-5">
                <p className="text-xs text-gray-400 mb-2">{post.date}</p>
                <h2 className="font-semibold text-primary-dark mb-2 leading-snug">{post.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
