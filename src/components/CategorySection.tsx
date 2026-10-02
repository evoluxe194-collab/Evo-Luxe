import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CategorySectionProps {
  onSelectCategory: (category: string) => void;
  onExploreAll: () => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  onExploreAll,
}) => {
  return (
    <section id="categories" className="w-full py-20 lg:py-28 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="flex items-center space-x-2 text-xs tracking-[0.28em] uppercase font-sans font-semibold text-[#063B2B] mb-2.5">
              <span className="w-6 h-[1px] bg-[#C9A45C]" aria-hidden="true" />
              <span>CURATED SILHOUETTES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17140F] font-medium tracking-tight">
              DISCOVER YOUR NINE
            </h2>
          </div>
          
          <button
            onClick={onExploreAll}
            className="mt-4 md:mt-0 text-xs tracking-[0.2em] uppercase font-sans font-semibold text-[#063B2B] hover:text-[#C9A45C] transition-colors inline-flex items-center group cursor-pointer"
          >
            <span>EXPLORE ALL JEWELLERY</span>
            <ArrowRight size={14} className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* 8 Category Editorial Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative cursor-pointer flex flex-col overflow-hidden bg-[#F5EFE4] border border-[#D8CDBD]/30 transition-all duration-300 hover:shadow-md"
            >
              {/* Image Container with Hover Zoom */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#FAF7F2]">
                <img
                  src={cat.image}
                  alt={`NINE by EVOLUXE - 9K Gold ${cat.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />
                
                {/* Subtle Gradient Scrim at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17140F]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Gold Highlight Line on Hover */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C9A45C] transition-all duration-500 ease-out group-hover:w-full z-10" />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-left z-10">
                  <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#FAF7F2]/80 block mb-1">
                    {cat.tag}
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg sm:text-xl text-[#FAF7F2] font-medium tracking-wide group-hover:text-[#FAF7F2] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] font-sans text-[#FAF7F2]/70 tabular-nums">
                      {cat.count}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
