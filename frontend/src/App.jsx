import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import CategoryList from './pages/CategoryList';
import CategoryDetail from './pages/CategoryDetail';
import AuthorList from './pages/AuthorList';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route
              path="/article/:id"
              element={<ArticleDetailWrapper />}
            />
            <Route path="/categories" element={<CategoryList />} />
            <Route
              path="/category/:slug"
              element={<CategoryDetailWrapper />}
            />
            <Route path="/authors" element={<AuthorList />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function ArticleDetailWrapper() {
  const id = window.location.pathname.split('/')[2];
  return <ArticleDetail articleId={id} />;
}

function CategoryDetailWrapper() {
  const slug = window.location.pathname.split('/')[2];
  return <CategoryDetail slug={slug} />;
}
