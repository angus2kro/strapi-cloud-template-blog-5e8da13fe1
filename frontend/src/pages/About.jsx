import { useState, useEffect } from 'react';
import { getAbout } from '../lib/strapi';
import DynamicBlock from '../components/DynamicBlock';

export default function About() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAbout = async () => {
      try {
        setLoading(true);
        const response = await getAbout();
        setAbout(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadAbout();
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
        <div className="text-red-600">Error loading about page: {error}</div>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">About page not found.</div>
      </div>
    );
  }

  const { title, blocks } = about;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12">
          {title && <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>}

          <div className="prose prose-sm max-w-none">
            {blocks && blocks.length > 0 ? (
              blocks.map((block, index) => <DynamicBlock key={index} block={block} />)
            ) : (
              <p className="text-gray-600">No content available.</p>
            )}
          </div>

          <div className="mt-12">
            <a
              href="/"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
