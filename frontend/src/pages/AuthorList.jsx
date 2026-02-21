import { useState, useEffect } from 'react';
import { getAuthors, getImageUrl } from '../lib/strapi';

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        setLoading(true);
        const response = await getAuthors();
        setAuthors(response.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAuthors();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading authors...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error loading authors: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Our Authors</h1>

        {authors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No authors found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {authors.map((author) => (
              <div
                key={author.id}
                className="bg-white rounded-lg shadow-md overflow-hidden text-center hover:shadow-lg transition-shadow"
              >
                {author.avatar && (
                  <img
                    src={getImageUrl(author.avatar)}
                    alt={author.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{author.name}</h3>
                  {author.email && (
                    <p className="text-gray-600 text-sm mt-2">{author.email}</p>
                  )}
                  {author.articles && (
                    <p className="text-sm text-gray-500 mt-4">
                      {author.articles.length} article{author.articles.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
