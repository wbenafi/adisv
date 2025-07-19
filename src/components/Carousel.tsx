import { useState, useEffect } from "preact/hooks";

interface Props {
  itemSources: string[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
  imgClassName?: string;
}

export default function Carousel({
  itemSources,
  autoSlide = false,
  autoSlideInterval = 3000,
  showIndicators = true,
  showArrows = true,
  className = "",
  imgClassName = "",
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (!autoSlide || itemSources.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === itemSources.length - 1 ? 0 : prevIndex + 1
      );
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, autoSlideInterval, itemSources.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? itemSources.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === itemSources.length - 1 ? 0 : currentIndex + 1
    );
  };

  if (!itemSources || itemSources.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-200">
        <p className="text-gray-500">No items to display</p>
      </div>
    );
  }

  return (
    <div className={`relative mx-auto ${className}`}>
      {/* Main carousel container */}
      <div className="relative overflow-hidden bg-gray-900 h-full">
        {/* Carousel wrapper */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {itemSources.map((src, index) => (
            <div key={index} className="w-full flex-shrink-0 h-full">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className={`w-full h-full ${imgClassName}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {showArrows && itemSources.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Previous slide"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Next slide"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Indicators */}
      {showIndicators && itemSources.length > 1 && (
        <div className="absolute bottom-4 flex justify-center space-x-2 z-10 w-full">
          {itemSources.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                index === currentIndex
                  ? "bg-secondary-400 scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
