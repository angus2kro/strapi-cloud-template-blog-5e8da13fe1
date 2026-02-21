import React from 'react';
import { getImageUrl } from '../lib/strapi';

export default function DynamicBlock({ block }) {
  if (!block) return null;

  const { __component } = block;

  if (__component === 'shared.media') {
    return <MediaBlock block={block} />;
  }

  if (__component === 'shared.quote') {
    return <QuoteBlock block={block} />;
  }

  if (__component === 'shared.rich-text') {
    return <RichTextBlock block={block} />;
  }

  if (__component === 'shared.slider') {
    return <SliderBlock block={block} />;
  }

  return null;
}

function MediaBlock({ block }) {
  const imageUrl = getImageUrl(block.file);

  return (
    <figure className="my-8">
      {imageUrl && <img src={imageUrl} alt="Article media" className="w-full rounded-lg shadow-md" />}
    </figure>
  );
}

function QuoteBlock({ block }) {
  return (
    <blockquote className="my-8 border-l-4 border-blue-500 pl-4 italic text-gray-700">
      <p className="mb-2">{block.body}</p>
      {block.title && <footer className="text-sm text-gray-600">— {block.title}</footer>}
    </blockquote>
  );
}

function RichTextBlock({ block }) {
  return (
    <div
      className="prose prose-sm max-w-none my-8 text-gray-700"
      dangerouslySetInnerHTML={{ __html: block.body }}
    />
  );
}

function SliderBlock({ block }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  if (!block.files || block.files.length === 0) return null;

  const images = block.files;
  const current = images[currentIndex];
  const imageUrl = getImageUrl(current);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="my-8">
      <div className="relative w-full">
        {imageUrl && <img src={imageUrl} alt="Slide" className="w-full rounded-lg shadow-md" />}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-r"
            >
              ←
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-l"
            >
              →
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full ${index === currentIndex ? 'bg-blue-500 w-8' : 'bg-gray-300 w-2'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
