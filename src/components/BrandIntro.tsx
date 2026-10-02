import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ASSET_IMAGES } from '../data/products';

interface BrandIntroProps {
  onDiscoverClick: () => void;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({ onDiscoverClick }) => {
  return (
    <section id="about-nine" className="w-full py-20 lg:py-28 bg-[#FAF7F2] border-b border-[#D8CDBD]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetric Magazine Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Editorial Visual (Col 1-6) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F5EFE4] shadow-sm">
              <img
                src={ASSET_IMAGES.necklacesEditorial}
                alt="NINE by EVOLUXE - Layered 9 Karat Fine Gold Chains"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 border border-[#D8CDBD]/40 pointer-events-none" />
            </div>

            {/* Overlapping Editorial Note Box */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-[#063B2B] text-[#FAF7F2] p-6 max-w-xs shadow-xl border-l-2 border-[#C9A45C]">
              <p className="font-serif italic text-lg leading-snug text-[#FAF7F2]">
                “Luxury is no longer what you keep locked in a safe. It is what lives with you.”
              </p>
              <div className="mt-3 text-[10px] tracking-[0.25em] uppercase text-[#C9A45C] font-sans font-medium">
                THE NINE PHILOSOPHY
              </div>
            </div>
          </div>

          {/* Editorial Text Content (Col 7-12) */}
          <div className="lg:col-span-6 lg:pl-6">
            
            <div className="flex items-center space-x-2 text-xs tracking-[0.28em] uppercase font-sans font-semibold text-[#063B2B] mb-3">
              <span className="w-6 h-[1px] bg-[#C9A45C]" aria-hidden="true" />
              <span>THE NEW STANDARD</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17140F] font-medium leading-[1.12] mb-6">
              MEET NINE
            </h2>

            <div className="space-y-5 text-[#17140F]/80 font-sans text-base sm:text-lg leading-relaxed mb-8">
              <p>
                <strong className="text-[#063B2B] font-medium">NINE by EVOLUXE</strong> is a new expression of gold — created for modern lives, personal style and everyday moments.
              </p>
              <p>
                Crafted in 9 karat gold, NINE brings together contemporary design, refined detailing and effortless wearability. No longer reserved for wedding chests or once-a-year occasions, our jewellery moves seamlessly from your morning espresso to the evening table.
              </p>
              <p className="text-sm text-[#786851] leading-relaxed">
                Backed by the bullion heritage of <span className="text-[#17140F] font-medium">EVOLUXE Gold Exchange</span>, every piece represents verified precious metal integrity without the fragile vulnerability or inflated markups of traditional ornamental gold.
              </p>
            </div>

            {/* Micro Details List */}
            <div className="grid grid-cols-2 gap-4 pt-4 pb-8 border-y border-[#D8CDBD]/50 mb-8 text-xs font-sans">
              <div>
                <span className="text-[#786851] uppercase tracking-wider block mb-1">Purity Code</span>
                <span className="text-[#17140F] font-semibold text-sm">375 Solid Gold</span>
              </div>
              <div>
                <span className="text-[#786851] uppercase tracking-wider block mb-1">Durability Index</span>
                <span className="text-[#17140F] font-semibold text-sm">Engineered for Daily Wear</span>
              </div>
            </div>

            <button
              onClick={onDiscoverClick}
              className="inline-flex items-center text-xs tracking-[0.22em] uppercase font-semibold text-[#063B2B] group cursor-pointer"
            >
              <span className="border-b border-[#063B2B] pb-1 group-hover:border-[#C9A45C] group-hover:text-[#C9A45C] transition-colors">
                DISCOVER NINE
              </span>
              <ArrowRight size={14} className="ml-2 text-[#C9A45C] transition-transform duration-300 group-hover:translate-x-1" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
