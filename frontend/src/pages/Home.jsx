import { useState, useEffect } from 'react';
import { getGlobal, getArticles, getImageUrl } from '../lib/strapi';
import ArticleCard from '../components/ArticleCard';

export default function Home() {
  const [global, setGlobal] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [globalRes, articlesRes] = await Promise.all([
          getGlobal(),
          getArticles({ 'pagination[limit]': 6 }),
        ]);
        setGlobal(globalRes.data);
        setArticles(articlesRes.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error loading home page: {error}</div>
      </div>
    );
  }

  const faviconUrl = global?.favicon ? getImageUrl(global.favicon) : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            {global?.siteName || 'Welcome'}
          </h1>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto opacity-90">
            {global?.siteDescription || 'Discover amazing content'}
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900">Latest Articles</h2>
              <p className="text-gray-600 mt-2">Explore our most recent stories</p>
            </div>
            <a
              href="/articles"
              className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
            >
              View All →
            </a>
          </div>

          {articles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No articles available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <a
                  key={article.id}
                  href={`/article/${article.id}`}
                  className="block group"
                >
                  <ArticleCard article={article} />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Explore More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a
              href="/articles"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              All Articles
            </a>
            <a
              href="/categories"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Categories
            </a>
            <a
              href="/authors"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Authors
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
