import { useState } from 'react';

export default function ProductGallery({ images, name }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4">
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`w-16 h-16 sm:w-18 sm:h-18 rounded-lg overflow-hidden bg-gray-50 border-2 transition-colors shrink-0 ${
                active === idx ? 'border-accent' : 'border-transparent hover:border-gray-200'
              }`}
            >
              <img src={img} alt={`${name} ${idx + 1}`} className="w-full h-full object-contain p-1.5" />
            </button>
          ))}
        </div>
      )}
      <div className="flex-1 aspect-square bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center group cursor-zoom-in">
        <img
          src={images[active]}
          alt={name}
          className="w-full h-full object-contain p-10 transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </div>
  );
}
