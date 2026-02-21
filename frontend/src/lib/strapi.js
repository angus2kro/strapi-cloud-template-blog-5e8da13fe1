const STRAPI_URL = import.meta.env.VITE_STRAPI_URL?.replace('/admin', '') || 'http://localhost:1337';

export const fetchFromStrapi = async (path, options = {}) => {
  const url = new URL(path, STRAPI_URL);

  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url.toString(), {
    ...defaultOptions,
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status}`);
  }

  return response.json();
};

export const getArticles = async (filters = {}) => {
  const params = new URLSearchParams({
    populate: 'author,category,cover',
    ...filters,
  });

  return fetchFromStrapi(`/api/articles?${params}`);
};

export const getArticle = async (id) => {
  const params = new URLSearchParams({
    populate: 'author,category,cover,blocks,blocks.file',
  });

  return fetchFromStrapi(`/api/articles/${id}?${params}`);
};

export const getCategories = async () => {
  const params = new URLSearchParams({
    populate: '*',
  });

  return fetchFromStrapi(`/api/categories?${params}`);
};

export const getCategory = async (slug) => {
  const params = new URLSearchParams({
    filters: { slug: { $eq: slug } },
    populate: 'articles,articles.author,articles.cover',
  });

  return fetchFromStrapi(`/api/categories?${params}`);
};

export const getAuthors = async () => {
  const params = new URLSearchParams({
    populate: 'avatar',
  });

  return fetchFromStrapi(`/api/authors?${params}`);
};

export const getAuthor = async (id) => {
  const params = new URLSearchParams({
    populate: 'articles,avatar',
  });

  return fetchFromStrapi(`/api/authors/${id}?${params}`);
};

export const getGlobal = async () => {
  const params = new URLSearchParams({
    populate: 'favicon,defaultSeo,defaultSeo.shareImage',
  });

  return fetchFromStrapi(`/api/global?${params}`);
};

export const getAbout = async () => {
  const params = new URLSearchParams({
    populate: 'blocks,blocks.file,blocks.files',
  });

  return fetchFromStrapi(`/api/about?${params}`);
};

export const getImageUrl = (image) => {
  if (!image) return null;
  if (typeof image === 'string') return image;
  if (image.url) return `${STRAPI_URL}${image.url}`;
  return null;
};
