import React from 'react';
import { ArrowRight } from 'lucide-react';
import { OCCASIONS } from '../data/products';

interface OccasionSectionProps {
  onSelectOccasion: (occasion: string) => void;
}

export const OccasionSection: React.FC<OccasionSectionProps> = ({ onSelectOccasion }) => {
  return (
    <section id="occasions" className="w-full py-20 lg:py-28 bg-[#F5EFE4]/60 border-t border-[#D8CDBD]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center justify-center space-x-2 text-xs tracking-[0.28em] uppercase font-sans font-semibold text-[#063B2B] mb-2.5">
            <span className="w-5 h-[1px] bg-[#C9A45C]" aria-hidden="true" />
            <span>VERSATILE LIVING</span>
            <span className="w-5 h-[1px] bg-[#C9A45C]" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17140F] font-medium tracking-tight mb-3">
            JEWELLERY FOR EVERY MOMENT
          </h2>
          <p className="text-sm sm:text-base text-[#786851] font-sans">
            Curated edits crafted to mirror the rhythm of modern life.
          </p>
        </div>

        {/* Occasion Editorial Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {OCCASIONS.map((occ) => (
            <div
              key={occ.name}
              onClick={() => onSelectOccasion(occ.name)}
              className="group relative cursor-pointer overflow-hidden bg-[#FAF7F2] border border-[#D8CDBD]/40 hover:border-[#C9A45C] transition-all duration-300 flex flex-col"
            >
              {/* Campaign Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAE2D5]">
                <img
                  src={occ.image}
                  alt={`NINE by EVOLUXE - ${occ.name} Occasion`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17140F]/70 via-transparent to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                
                {/* Discrete Label Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#FAF7F2]/90 backdrop-blur-md px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-[#063B2B]">
                    {occ.name}
                  </span>
                </div>
              </div>

              {/* Text Card Content */}
              <div className="p-6 flex flex-col flex-1 justify-between bg-[#FAF7F2]">
                <div>
                  <h3 className="font-serif italic text-xl sm:text-2xl text-[#17140F] font-normal mb-2 group-hover:text-[#063B2B] transition-colors">
                    “{occ.tagline}”
                  </h3>
                  <p className="text-xs sm:text-sm text-[#786851] font-sans leading-relaxed mb-6">
                    {occ.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D8CDBD]/40 flex items-center justify-between text-xs tracking-[0.18em] uppercase font-sans font-semibold text-[#063B2B]">
                  <span>EXPLORE THE EDIT</span>
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
