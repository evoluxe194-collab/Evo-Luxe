import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Gem, Compass } from 'lucide-react';
import { ASSET_IMAGES } from '../data/products';

interface HeroProps {
  onShopClick: () => void;
  onExploreCollections: () => void;
}

const CAMPAIGN_HEADLINES = [
  'LUXURY, MADE EVERYDAY.',
  'YOUR EVERYDAY, ELEVATED.',
  '9 KARAT. REFINED FOR LIFE.',
  'WEAR YOUR NINE.',
  'MOMENTS WORTH WEARING.',
];

export const Hero: React.FC<HeroProps> = ({ onShopClick, onExploreCollections }) => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % CAMPAIGN_HEADLINES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-center bg-[#FAF7F2] overflow-hidden">
      {/* Background Campaign Visual with Measured Scrim */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src={ASSET_IMAGES.hero}
          alt="NINE by EVOLUXE - 9 Karat Lifestyle Fine Jewellery Campaign"
          referrerPolicy="no-referrer"
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover object-center transition-all duration-1000 transform scale-100 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* Elegant Fallback Surface if image loads slowly */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/80 to-[#FAF7F2]/40 -z-10" />

        {/* Cinematic Scrim: Ensures WCAG AA legibility for editorial typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/85 to-transparent lg:w-[65%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-transparent lg:hidden" />
      </div>

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="max-w-2xl">
          
          {/* Brand Kicker (Unboxed metadata, zero-pill discipline) */}
          <div className="flex items-center space-x-2 text-xs tracking-[0.28em] uppercase font-sans font-semibold text-[#063B2B] mb-5">
            <span className="w-6 h-[1px] bg-[#C9A45C]" aria-hidden="true" />
            <span>NINE BY EVOLUXE</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#786851]">9 KARAT LIFESTYLE</span>
          </div>

          {/* Campaign Headline with smooth transition and balance */}
          <h1
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#17140F] leading-[1.08] tracking-tight mb-6 transition-all duration-700 font-medium"
            style={{ textWrap: 'balance' }}
          >
            {CAMPAIGN_HEADLINES[headlineIndex]}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-[#17140F]/80 font-sans font-normal leading-relaxed max-w-xl mb-10">
            Exclusive 9 Karat jewellery designed for the way you live, move and express yourself. Solid precious gold engineered for the everyday.
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 mb-14">
            <button
              onClick={onShopClick}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#063B2B] text-[#FAF7F2] font-sans text-xs tracking-[0.22em] uppercase font-semibold transition-all duration-300 hover:bg-[#04291E] hover:shadow-lg hover:shadow-[#063B2B]/15 group cursor-pointer"
            >
              <span>SHOP NINE</span>
              <ArrowRight size={16} className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1 text-[#C9A45C]" />
            </button>

            <button
              onClick={onExploreCollections}
              className="inline-flex items-center justify-center px-8 py-4 border border-[#063B2B]/40 text-[#063B2B] bg-[#FAF7F2]/70 backdrop-blur-xs font-sans text-xs tracking-[0.22em] uppercase font-semibold transition-all duration-300 hover:border-[#063B2B] hover:bg-[#FAF7F2] cursor-pointer"
            >
              <span>EXPLORE THE COLLECTION</span>
            </button>
          </div>

          {/* Trust Anchors: 3 Pillars with Typographic Separators */}
          <div className="pt-6 border-t border-[#D8CDBD]/60 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-[#786851] font-sans">
            <div className="flex items-center space-x-2">
              <Gem size={14} className="text-[#C9A45C]" />
              <span className="tracking-wider uppercase font-medium text-[#17140F]/90">37.5% Solid Gold</span>
            </div>
            <span className="hidden sm:inline text-[#D8CDBD]" aria-hidden="true">·</span>
            <div className="flex items-center space-x-2">
              <Compass size={14} className="text-[#C9A45C]" />
              <span className="tracking-wider uppercase font-medium text-[#17140F]/90">Engineered for Daily Life</span>
            </div>
            <span className="hidden sm:inline text-[#D8CDBD]" aria-hidden="true">·</span>
            <div className="flex items-center space-x-2">
              <ShieldCheck size={14} className="text-[#C9A45C]" />
              <span className="tracking-wider uppercase font-medium text-[#17140F]/90">Backed by EVOLUXE</span>
            </div>
          </div>

        </div>
      </div>

      {/* Headline Switcher Indicator Dots (Refined, accessible) */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center space-x-2 bg-[#FAF7F2]/80 backdrop-blur-md px-3 py-1.5 border border-[#D8CDBD]/50">
        {CAMPAIGN_HEADLINES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setHeadlineIndex(idx)}
            className={`transition-all duration-300 ${
              headlineIndex === idx
                ? 'w-5 h-1 bg-[#063B2B]'
                : 'w-1.5 h-1 bg-[#D8CDBD] hover:bg-[#786851]'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
