import { useState, useEffect } from 'react';
import { getArticle, getImageUrl } from '../lib/strapi';
import DynamicBlock from '../components/DynamicBlock';

export default function ArticleDetail({ articleId }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        const response = await getArticle(articleId);
        setArticle(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading article...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error loading article: {error}</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Article not found.</div>
      </div>
    );
  }

  const { title, description, author, category, cover, blocks } = article;
  const coverImage = getImageUrl(cover);

  return (
    <article className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {coverImage && (
            <img src={coverImage} alt={title} className="w-full h-96 object-cover" />
          )}

          <div className="p-8 sm:p-12">
            {category && (
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {category.name}
              </span>
            )}

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-4 mb-4">{title}</h1>

            <p className="text-xl text-gray-600 mb-6">{description}</p>

            {author && (
              <div className="flex items-center gap-4 py-6 border-y border-gray-200">
                {author.avatar && (
                  <img
                    src={getImageUrl(author.avatar)}
                    alt={author.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">{author.name}</p>
                  {author.email && <p className="text-gray-600 text-sm">{author.email}</p>}
                </div>
              </div>
            )}

            <div className="mt-12">
              {blocks && blocks.length > 0 ? (
                blocks.map((block, index) => <DynamicBlock key={index} block={block} />)
              ) : (
                <p className="text-gray-600">No content blocks available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <a
            href="/articles"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Articles
          </a>
        </div>
      </div>
    </article>
  );
}
