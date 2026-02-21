import { getImageUrl } from '../lib/strapi';

export default function ArticleCard({ article }) {
  const coverImage = getImageUrl(article.cover);
  const author = article.author;
  const category = article.category;

  return (
    <article className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      {coverImage && (
        <img
          src={coverImage}
          alt={article.title}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
      )}
      <div className="p-6">
        {category && (
          <div className="inline-block mb-3">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              {category.name}
            </span>
          </div>
        )}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.description}</p>
        {author && (
          <div className="flex items-center gap-3">
            {author.avatar && (
              <img
                src={getImageUrl(author.avatar)}
                alt={author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            )}
            <span className="text-sm text-gray-700">{author.name}</span>
          </div>
        )}
      </div>
    </article>
  );
}
