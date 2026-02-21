import { useState, useEffect } from 'react';
import { getCategory } from '../lib/strapi';
import ArticleCard from '../components/ArticleCard';

export default function CategoryDetail({ slug }) {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        setLoading(true);
        const response = await getCategory(slug);
        setCategory(response.data?.[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading category...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error loading category: {error}</div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Category not found.</div>
      </div>
    );
  }

  const articles = category.articles || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <a href="/categories" className="text-blue-600 hover:text-blue-700 mb-6 inline-block">
            ← Back to Categories
          </a>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-xl text-gray-600">{category.description}</p>
          )}
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles in this category.</p>
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
    </div>
  );
}
