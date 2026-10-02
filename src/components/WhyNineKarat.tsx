import React from 'react';
import { Gem, Activity, Sparkles, Move, Check, Shield } from 'lucide-react';

export const WhyNineKarat: React.FC = () => {
  return (
    <section id="why-nine" className="w-full py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#D8CDBD]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center space-x-2 text-xs tracking-[0.28em] uppercase font-sans font-semibold text-[#063B2B] mb-2.5">
            <span className="w-5 h-[1px] bg-[#C9A45C]" aria-hidden="true" />
            <span>THE METALLURGICAL TRUTH</span>
            <span className="w-5 h-[1px] bg-[#C9A45C]" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17140F] font-medium tracking-tight mb-3">
            WHY 9 KARAT?
          </h2>
          <p className="font-serif italic text-xl text-[#063B2B] mb-4">
            “Real gold. Designed for real life.”
          </p>
          <p className="text-sm sm:text-base text-[#786851] font-sans leading-relaxed">
            In traditional Indian households, high-karat gold was bought to lock away inside vaults as safe-deposit wealth. NINE was created for a different truth: fine jewellery meant to be lived in, enjoyed daily, and worn with pride.
          </p>
        </div>

        {/* 4 Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          
          {/* Card 1 */}
          <div className="bg-[#F5EFE4] p-8 border border-[#D8CDBD]/40 flex flex-col justify-between hover:border-[#063B2B] transition-colors">
            <div>
              <div className="w-12 h-12 bg-[#FAF7F2] border border-[#D8CDBD] flex items-center justify-center mb-6 text-[#063B2B]">
                <Gem size={22} className="text-[#C9A45C]" />
              </div>
              <h3 className="font-serif text-xl text-[#17140F] font-medium tracking-wide mb-3">
                REAL GOLD
              </h3>
              <p className="text-xs sm:text-sm text-[#17140F]/75 font-sans leading-relaxed">
                9 karat gold contains 37.5% pure solid gold (hallmarked 375 standard), harmoniously alloyed with fine silver and copper for genuine precious metal value with a subtle champagne glow.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#D8CDBD]/40 text-[11px] font-sans text-[#786851] tracking-wider uppercase">
              Hallmarked 375 Solid Gold
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#F5EFE4] p-8 border border-[#D8CDBD]/40 flex flex-col justify-between hover:border-[#063B2B] transition-colors">
            <div>
              <div className="w-12 h-12 bg-[#FAF7F2] border border-[#D8CDBD] flex items-center justify-center mb-6 text-[#063B2B]">
                <Activity size={22} className="text-[#C9A45C]" />
              </div>
              <h3 className="font-serif text-xl text-[#17140F] font-medium tracking-wide mb-3">
                BUILT FOR EVERYDAY
              </h3>
              <p className="text-xs sm:text-sm text-[#17140F]/75 font-sans leading-relaxed">
                While 22K and 24K gold easily bend, warp, and scratch during normal daily tasks, 9 karat gold possesses superior tensile hardness. It retains fine edge definition and facet polish through years of continuous wear.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#D8CDBD]/40 text-[11px] font-sans text-[#786851] tracking-wider uppercase">
              High Scratch Resilience
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#F5EFE4] p-8 border border-[#D8CDBD]/40 flex flex-col justify-between hover:border-[#063B2B] transition-colors">
            <div>
              <div className="w-12 h-12 bg-[#FAF7F2] border border-[#D8CDBD] flex items-center justify-center mb-6 text-[#063B2B]">
                <Sparkles size={22} className="text-[#C9A45C]" />
              </div>
              <h3 className="font-serif text-xl text-[#17140F] font-medium tracking-wide mb-3">
                MODERN LUXURY
              </h3>
              <p className="text-xs sm:text-sm text-[#17140F]/75 font-sans leading-relaxed">
                A conscious, approachable expression of fine gold. Build your personal jewellery wardrobe with solid gold pieces you can afford to layer, collect, and wear without constant anxiety or heavy locker charges.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#D8CDBD]/40 text-[11px] font-sans text-[#786851] tracking-wider uppercase">
              Approachable Fine Jewellery
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#F5EFE4] p-8 border border-[#D8CDBD]/40 flex flex-col justify-between hover:border-[#063B2B] transition-colors">
            <div>
              <div className="w-12 h-12 bg-[#FAF7F2] border border-[#D8CDBD] flex items-center justify-center mb-6 text-[#063B2B]">
                <Move size={22} className="text-[#C9A45C]" />
              </div>
              <h3 className="font-serif text-xl text-[#17140F] font-medium tracking-wide mb-3">
                MADE TO MOVE WITH YOU
              </h3>
              <p className="text-xs sm:text-sm text-[#17140F]/75 font-sans leading-relaxed">
                Jewellery designed around modern lifestyles. From airport terminals to the yoga mat, board meetings to dinner parties — you never have to take off your NINE pieces.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#D8CDBD]/40 text-[11px] font-sans text-[#786851] tracking-wider uppercase">
              24/7 Lifestyle Comfort
            </div>
          </div>

        </div>

        {/* Educational Karat Comparison Matrix */}
        <div className="bg-[#F5EFE4] border border-[#D8CDBD]/50 p-6 sm:p-10 max-w-4xl mx-auto shadow-sm">
          <div className="text-center mb-8">
            <h4 className="font-serif text-2xl text-[#17140F] font-medium mb-1">
              The Karat Comparison
            </h4>
            <p className="text-xs tracking-wider uppercase text-[#786851] font-sans">
              Understanding Gold Composition & Practical Daily Suitability
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#D8CDBD] text-[#786851] uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-medium">Gold Purity</th>
                  <th className="py-3 px-4 font-medium">Purity %</th>
                  <th className="py-3 px-4 font-medium">Daily Durability</th>
                  <th className="py-3 px-4 font-medium">Everyday Suitability</th>
                  <th className="py-3 px-4 font-medium">Lifestyle Intent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8CDBD]/40 text-[#17140F]">
                {/* 9K Row (Hero) */}
                <tr className="bg-[#063B2B]/5 font-semibold text-[#063B2B]">
                  <td className="py-3.5 px-4 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#C9A45C]" />
                    <span>9 Karat (NINE)</span>
                  </td>
                  <td className="py-3.5 px-4 tabular-nums">37.5% Pure Solid Gold</td>
                  <td className="py-3.5 px-4 text-[#063B2B]">Maximum Hardness</td>
                  <td className="py-3.5 px-4 font-medium">100% Everyday Living</td>
                  <td className="py-3.5 px-4">Modern daily self-expression</td>
                </tr>

                {/* 14K Row */}
                <tr>
                  <td className="py-3.5 px-4 font-medium">14 Karat</td>
                  <td className="py-3.5 px-4 tabular-nums text-[#786851]">58.5% Pure Gold</td>
                  <td className="py-3.5 px-4 text-[#786851]">Moderate Hardness</td>
                  <td className="py-3.5 px-4 text-[#786851]">Good for Daily Wear</td>
                  <td className="py-3.5 px-4 text-[#786851]">Mid-tier lifestyle</td>
                </tr>

                {/* 18K Row */}
                <tr>
                  <td className="py-3.5 px-4 font-medium">18 Karat</td>
                  <td className="py-3.5 px-4 tabular-nums text-[#786851]">75.0% Pure Gold</td>
                  <td className="py-3.5 px-4 text-[#786851]">Prone to Scratching</td>
                  <td className="py-3.5 px-4 text-[#786851]">Occasional & Evening</td>
                  <td className="py-3.5 px-4 text-[#786851]">Fine cocktail jewellery</td>
                </tr>

                {/* 22K Row */}
                <tr>
                  <td className="py-3.5 px-4 font-medium">22 Karat</td>
                  <td className="py-3.5 px-4 tabular-nums text-[#786851]">91.6% Pure Gold</td>
                  <td className="py-3.5 px-4 text-[#786851]">Very Soft (Easily Dents)</td>
                  <td className="py-3.5 px-4 text-[#786851]">Weddings / Locker Only</td>
                  <td className="py-3.5 px-4 text-[#786851]">Traditional investment bullion</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
