import React from 'react';
import { Award, ShieldCheck, FileCheck, PackageCheck, Building2, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NinePromiseAndEvoluxeProps {
  onLearnMoreEvoluxe: () => void;
}

export const NinePromiseAndEvoluxe: React.FC<NinePromiseAndEvoluxeProps> = ({
  onLearnMoreEvoluxe,
}) => {
  const pillars = [
    {
      icon: <Award size={22} className="text-[#C9A45C]" />,
      title: 'BIS HALLMARKED',
      desc: 'Assayed and verified for gold purity standards, carrying the official hallmark certification mark.',
    },
    {
      icon: <ShieldCheck size={22} className="text-[#C9A45C]" />,
      title: '375 SOLID GOLD',
      desc: 'Guaranteed 9 karat solid gold alloy — neither plated nor vermeil, but pure precious metal through and through.',
    },
    {
      icon: <FileCheck size={22} className="text-[#C9A45C]" />,
      title: 'TRANSPARENT PRICING',
      desc: 'Clear, ethical breakdown of gold weight, craftsmanship, and taxes. Zero concealed fees.',
    },
    {
      icon: <PackageCheck size={22} className="text-[#C9A45C]" />,
      title: 'SECURE LUXURY PACKAGING',
      desc: 'Tamper-proof insured transit arriving in our bespoke velvet-lined emerald presentation box.',
    },
    {
      icon: <Building2 size={22} className="text-[#C9A45C]" />,
      title: 'TRUSTED BY EVOLUXE',
      desc: 'Backed by the bullion heritage and trading integrity of EVOLUXE Gold Exchange.',
    },
  ];

  return (
    <section className="w-full bg-[#063B2B] text-[#FAF7F2] py-20 lg:py-28 relative overflow-hidden">
      
      {/* Subtle luxury ambient pattern / glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#04291E] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section 1: The NINE Promise Manifesto */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center space-x-2 text-xs tracking-[0.28em] uppercase font-sans font-semibold text-[#C9A45C] mb-3">
            <span className="w-5 h-[1px] bg-[#C9A45C]" aria-hidden="true" />
            <span>STANDARDS OF EXCELLENCE</span>
            <span className="w-5 h-[1px] bg-[#C9A45C]" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF7F2] font-medium tracking-tight mb-4">
            THE NINE PROMISE
          </h2>
          <p className="text-sm sm:text-base text-[#D8CDBD] font-sans leading-relaxed">
            Every piece crafted under the NINE mark is bound by five uncompromising pillars of precious metal purity, craftsmanship, and accountability.
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-24 border-y border-[#FAF7F2]/10 py-10">
          {pillars.map((pillar, i) => (
            <div key={i} className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#04291E] border border-[#C9A45C]/30 flex items-center justify-center mb-5">
                {pillar.icon}
              </div>
              <h3 className="font-sans text-xs tracking-[0.2em] uppercase font-semibold text-[#FAF7F2] mb-2">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#D8CDBD]/80 font-sans leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Section 2: Backed by EVOLUXE (Sophisticated Parent Company Story) */}
        <div className="bg-[#04291E]/70 border border-[#C9A45C]/20 p-8 sm:p-12 lg:p-16 max-w-4xl mx-auto text-center relative">
          
          <div className="flex justify-center mb-6">
            <BrandLogo variant="light" size="md" showStar={true} />
          </div>

          <div className="text-[11px] tracking-[0.3em] uppercase text-[#C9A45C] font-sans font-semibold mb-3">
            HERITAGE & BULLION INTEGRITY
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF7F2] font-medium tracking-tight mb-6">
            BACKED BY EVOLUXE
          </h3>

          <div className="max-w-2xl mx-auto space-y-4 text-sm sm:text-base text-[#D8CDBD] font-sans leading-relaxed mb-8">
            <p>
              NINE by EVOLUXE is born from a deeper understanding of gold.
            </p>
            <p>
              From the heritage of <span className="text-[#FAF7F2] font-medium">EVOLUXE Gold Exchange & Bullion Store</span> comes a new generation of jewellery — created for modern lifestyles, contemporary taste and everyday personal expression.
            </p>
            <p className="text-xs text-[#D8CDBD]/75">
              Rooted in Kaipamangalam, Thrissur — Kerala’s historic gold capital — EVOLUXE brings decades of bullion expertise, metallurgical testing, and customer trust directly into every millimeter of 9K solid gold we sculpt.
            </p>
          </div>

          <button
            onClick={onLearnMoreEvoluxe}
            className="inline-flex items-center justify-center px-8 py-3.5 border border-[#C9A45C] text-[#C9A45C] text-xs tracking-[0.22em] uppercase font-sans font-semibold hover:bg-[#C9A45C] hover:text-[#17140F] transition-all duration-300 cursor-pointer group"
          >
            <span>DISCOVER EVOLUXE</span>
            <ArrowRight size={14} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

        </div>

      </div>
    </section>
  );
};
