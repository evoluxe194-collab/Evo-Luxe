import React from 'react';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '../data/products';

interface FeaturedCollectionsProps {
  onSelectCollection: (collectionTitle: string) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  onSelectCollection,
}) => {
  return (
    <section id="collections" className="w-full py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#D8CDBD]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-18">
          <div>
            <div className="flex items-center space-x-2 text-xs tracking-[0.28em] uppercase font-sans font-semibold text-[#063B2B] mb-2.5">
              <span className="w-6 h-[1px] bg-[#C9A45C]" aria-hidden="true" />
              <span>EDITORIAL ARCHIVE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17140F] font-medium tracking-tight">
              FEATURED COLLECTIONS
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-[#786851] font-sans max-w-md">
            Design codes unified by structural restraint, comfort fit geometry, and 9 karat solid gold.
          </p>
        </div>

        {/* 2x2 Large Editorial Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {COLLECTIONS.map((col, idx) => (
            <div
              key={col.title}
              onClick={() => onSelectCollection(col.title)}
              className="group cursor-pointer flex flex-col bg-[#F5EFE4] border border-[#D8CDBD]/40 hover:border-[#063B2B] transition-all duration-300"
            >
              {/* Large Image Aspect */}
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#FAF7F2]">
                <img
                  src={col.image}
                  alt={col.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Number / Chapter Tag (Human editorial numbering) */}
                <div className="absolute top-4 right-4 z-10 bg-[#FAF7F2]/90 backdrop-blur-md px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-[#063B2B]">
                  VOL. 0{idx + 1}
                </div>
              </div>

              {/* Editorial Description & Action */}
              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between bg-[#F5EFE4]">
                <div>
                  <div className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#786851] mb-2">
                    {col.tag}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#17140F] font-medium tracking-tight mb-3 group-hover:text-[#063B2B] transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-sm text-[#17140F]/75 font-sans leading-relaxed mb-6">
                    {col.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D8CDBD]/60 flex items-center justify-between text-xs tracking-[0.2em] uppercase font-sans font-semibold text-[#063B2B]">
                  <span>{col.cta}</span>
                  <ArrowRight size={14} className="text-[#C9A45C] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
