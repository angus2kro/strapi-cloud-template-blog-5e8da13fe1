import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="font-bold text-2xl text-blue-600">
            Blog
          </a>

          <nav className="hidden md:flex gap-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="/articles" className="text-gray-700 hover:text-blue-600 transition-colors">
              Articles
            </a>
            <a href="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
              Categories
            </a>
            <a href="/authors" className="text-gray-700 hover:text-blue-600 transition-colors">
              Authors
            </a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </a>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <a
              href="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Home
            </a>
            <a
              href="/articles"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Articles
            </a>
            <a
              href="/categories"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Categories
            </a>
            <a
              href="/authors"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Authors
            </a>
            <a
              href="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              About
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
