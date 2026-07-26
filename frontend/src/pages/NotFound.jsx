import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container-app py-24 text-center">
      <h1 className="text-7xl font-bold text-primary-dark mb-4">404</h1>
      <p className="text-gray-500 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-primary-dark text-white text-sm font-semibold uppercase rounded-md hover:bg-accent-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
