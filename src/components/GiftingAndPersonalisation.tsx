import React, { useState } from 'react';
import { Gift, Sparkles, Heart, Check, ArrowRight } from 'lucide-react';
import { ASSET_IMAGES } from '../data/products';

interface GiftingAndPersonalisationProps {
  onShopGifts: (recipient?: string) => void;
  onSelectPersonalisedProduct: () => void;
}

export const GiftingAndPersonalisation: React.FC<GiftingAndPersonalisationProps> = ({
  onShopGifts,
  onSelectPersonalisedProduct,
}) => {
  const [engravingText, setEngravingText] = useState('N · E');
  const [engravingFont, setEngravingFont] = useState<'serif' | 'sans' | 'script'>('serif');
  const [selectedGiftOccasion, setSelectedGiftOccasion] = useState('FOR HER');

  const giftTags = [
    { label: 'FOR HER', hint: 'Delicate chains, everyday hoops & stacking rings' },
    { label: 'FOR HIM', hint: 'Matte signets, heavy curb chains & torc cuffs' },
    { label: 'BIRTHDAY', hint: 'Celestial talismans with birthstone accents' },
    { label: 'ANNIVERSARY', hint: 'Engraved 9K bands that never leave the finger' },
    { label: 'JUST BECAUSE', hint: 'Understated tokens of appreciation' },
  ];

  return (
    <section id="gifting" className="w-full py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#D8CDBD]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Part: Gifting Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Image Side: Emerald Keepsake Box Still-Life */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] bg-[#F5EFE4] overflow-hidden shadow-sm border border-[#D8CDBD]/40">
              <img
                src={ASSET_IMAGES.giftingCraft}
                alt="NINE by EVOLUXE - Luxury Emerald Jewellery Keepsake Box"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 border border-[#D8CDBD]/40 pointer-events-none" />
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -bottom-5 left-6 bg-[#063B2B] text-[#FAF7F2] px-5 py-3 text-xs tracking-[0.2em] uppercase font-sans font-medium shadow-md flex items-center gap-2">
              <Gift size={14} className="text-[#C9A45C]" />
              <span>COMPLIMENTARY GIFT SUITE INCLUDED</span>
            </div>
          </div>

          {/* Copy Side */}
          <div className="lg:col-span-6 lg:pl-6">
            <div className="flex items-center space-x-2 text-xs tracking-[0.28em] uppercase font-sans font-semibold text-[#063B2B] mb-3">
              <span className="w-6 h-[1px] bg-[#C9A45C]" aria-hidden="true" />
              <span>THE ART OF GIVING</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17140F] font-medium tracking-tight mb-4">
              GIVE SOMETHING THAT STAYS.
            </h2>

            <p className="text-sm sm:text-base text-[#17140F]/80 font-sans leading-relaxed mb-6">
              Unlike flowers that fade or transient novelties, solid gold endures. Every order arrives in our signature dark emerald jewellery box tied with champagne grosgrain ribbon, accompanied by a heavy textured card and our certified bullion certificate of authenticity.
            </p>

            {/* Gift Category Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {giftTags.map((tag) => (
                <button
                  key={tag.label}
                  onClick={() => setSelectedGiftOccasion(tag.label)}
                  className={`px-4 py-2 text-xs tracking-[0.16em] uppercase font-sans transition-all duration-200 cursor-pointer ${
                    selectedGiftOccasion === tag.label
                      ? 'bg-[#063B2B] text-[#FAF7F2] font-semibold'
                      : 'bg-[#F5EFE4] text-[#17140F] hover:bg-[#EAE2D5]'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>

            <div className="bg-[#F5EFE4] p-4 border border-[#D8CDBD]/50 mb-8 text-xs text-[#786851] font-sans">
              <span className="font-semibold text-[#063B2B] uppercase tracking-wider block mb-1">
                {selectedGiftOccasion} Curation:
              </span>
              {giftTags.find((t) => t.label === selectedGiftOccasion)?.hint}
            </div>

            <button
              onClick={() => onShopGifts(selectedGiftOccasion)}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#063B2B] text-[#FAF7F2] text-xs tracking-[0.22em] uppercase font-sans font-semibold hover:bg-[#04291E] transition-all cursor-pointer group"
            >
              <span>SHOP {selectedGiftOccasion} GIFTS</span>
              <ArrowRight size={14} className="ml-2.5 text-[#C9A45C] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>

        {/* Bottom Part: Interactive Personalisation "MAKE IT YOUR NINE" */}
        <div className="bg-[#F5EFE4] border border-[#D8CDBD]/50 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Text & Customization Controls */}
            <div className="lg:col-span-7">
              <div className="flex items-center space-x-2 text-xs tracking-[0.28em] uppercase font-sans font-semibold text-[#063B2B] mb-2.5">
                <Sparkles size={14} className="text-[#C9A45C]" />
                <span>BESPOKE LASER ENGRAVING</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#17140F] font-medium tracking-tight mb-4">
                MAKE IT YOUR NINE.
              </h3>
              <p className="text-sm sm:text-base text-[#17140F]/80 font-sans leading-relaxed mb-6">
                Inscribe initials, roman numerals, landmark dates, or coordinates onto our 9K gold pendants and signet rings. Each engraving is micro-lasered at our Kerala studio with surgical precision.
              </p>

              {/* Input for Engraving Text */}
              <div className="space-y-4 max-w-md mb-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#786851] font-sans font-medium mb-1.5">
                    Your Inscription (Max 8 characters)
                  </label>
                  <input
                    type="text"
                    maxLength={8}
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                    placeholder="E.G. A · M OR 12.04"
                    className="w-full bg-[#FAF7F2] border border-[#D8CDBD] px-4 py-3 text-sm text-[#17140F] font-serif uppercase tracking-widest focus:outline-none focus:border-[#063B2B] focus:ring-1 focus:ring-[#063B2B]"
                  />
                </div>

                {/* Typography Choice */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#786851] font-sans font-medium mb-1.5">
                    Engraving Typeface
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEngravingFont('serif')}
                      className={`px-4 py-1.5 text-xs font-serif transition-colors ${
                        engravingFont === 'serif'
                          ? 'bg-[#063B2B] text-[#FAF7F2]'
                          : 'bg-[#FAF7F2] text-[#17140F] border border-[#D8CDBD]'
                      }`}
                    >
                      Classic Serif
                    </button>
                    <button
                      onClick={() => setEngravingFont('sans')}
                      className={`px-4 py-1.5 text-xs font-sans transition-colors ${
                        engravingFont === 'sans'
                          ? 'bg-[#063B2B] text-[#FAF7F2]'
                          : 'bg-[#FAF7F2] text-[#17140F] border border-[#D8CDBD]'
                      }`}
                    >
                      Modern Clean
                    </button>
                    <button
                      onClick={() => setEngravingFont('script')}
                      className={`px-4 py-1.5 text-xs font-script italic transition-colors ${
                        engravingFont === 'script'
                          ? 'bg-[#063B2B] text-[#FAF7F2]'
                          : 'bg-[#FAF7F2] text-[#17140F] border border-[#D8CDBD]'
                      }`}
                    >
                      Script Italic
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={onSelectPersonalisedProduct}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-[#063B2B] text-[#FAF7F2] text-xs tracking-[0.2em] uppercase font-sans font-semibold hover:bg-[#04291E] transition-all cursor-pointer"
              >
                <span>CREATE YOUR PIECE (₹13,600)</span>
                <ArrowRight size={14} className="ml-2 text-[#C9A45C]" />
              </button>
            </div>

            {/* Right: Real-time Visual Medallion Engraving Simulation */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-[#EBD8B0] via-[#C9A45C] to-[#8C6D32] p-1 shadow-2xl flex items-center justify-center border-4 border-[#FAF7F2]">
                {/* Gold Medallion Texture Plate */}
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#C9A45C] via-[#E4CA8C] to-[#C9A45C] flex flex-col items-center justify-center text-center p-6 relative overflow-hidden shadow-inner">
                  {/* Subtle radial sheen */}
                  <div className="absolute inset-0 bg-radial from-white/30 via-transparent to-black/20 pointer-events-none" />
                  
                  {/* North Star icon at top of pendant */}
                  <div className="text-[#644E20] opacity-80 mb-2">
                    <Sparkles size={20} />
                  </div>

                  {/* Laser Engraved Preview Text */}
                  <div
                    className={`text-2xl sm:text-3xl font-medium tracking-[0.25em] text-[#3D2E0F] select-none transition-all duration-300 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] ${
                      engravingFont === 'serif'
                        ? 'font-serif'
                        : engravingFont === 'script'
                        ? 'font-script italic tracking-wider'
                        : 'font-sans uppercase font-bold'
                    }`}
                  >
                    {engravingText || 'YOUR NINE'}
                  </div>

                  <div className="text-[9px] tracking-[0.3em] uppercase text-[#544119] mt-3 font-sans font-medium">
                    375 · 9K SOLID GOLD
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
