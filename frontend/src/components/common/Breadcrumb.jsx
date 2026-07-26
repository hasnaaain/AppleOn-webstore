import { Link } from 'react-router-dom';
import { HiChevronRight, HiHome } from 'react-icons/hi';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="container-app py-3 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
        <Link to="/" className="flex items-center gap-1 hover:text-primary-dark transition-colors">
          <HiHome /> Home
        </Link>
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-2">
            <HiChevronRight className="text-gray-400" size={14} />
            {item.to ? (
              <Link to={item.to} className="hover:text-primary-dark transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-primary-dark font-medium">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
