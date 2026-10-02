import React, { useState } from 'react';
import { Instagram, ArrowRight, Eye, ShoppingBag } from 'lucide-react';
import { INSTAGRAM_POSTS, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface SocialSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const SocialSection: React.FC<SocialSectionProps> = ({ onSelectProduct }) => {
  const [activeLook, setActiveLook] = useState<typeof INSTAGRAM_POSTS[0] | null>(null);

  const handleShopLook = (post: typeof INSTAGRAM_POSTS[0]) => {
    const found = PRODUCTS.find((p) => p.id === post.productId);
    if (found) {
      onSelectProduct(found);
    }
  };

  return (
    <section className="w-full py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#D8CDBD]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center justify-center space-x-2 text-xs tracking-[0.28em] uppercase font-sans font-semibold text-[#063B2B] mb-2.5">
            <Instagram size={14} className="text-[#C9A45C]" />
            <span>@THE_EVOLUXE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17140F] font-medium tracking-tight mb-3">
            WORN BY YOU.
          </h2>
          <p className="text-sm sm:text-base text-[#786851] font-sans">
            Everyday styling moments captured by our community across India and beyond.
          </p>
        </div>

        {/* 6-Image Instagram Editorial Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
          {INSTAGRAM_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => handleShopLook(post)}
              className="group relative aspect-square bg-[#F5EFE4] overflow-hidden cursor-pointer border border-[#D8CDBD]/30"
            >
              <img
                src={post.image}
                alt={post.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Hover Dark Overlay with "SHOP THIS LOOK" */}
              <div className="absolute inset-0 bg-[#063B2B]/75 flex flex-col items-center justify-center p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] tracking-[0.22em] uppercase font-sans font-semibold text-[#FAF7F2] border-b border-[#C9A45C] pb-1 mb-2">
                  SHOP THIS LOOK
                </span>
                <p className="text-[11px] font-serif text-[#FAF7F2]/90 line-clamp-2 leading-tight">
                  {post.productName}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Social Handle CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <a
            href="https://instagram.com/the_evoluxe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-sans font-semibold text-[#063B2B] hover:text-[#C9A45C] transition-colors"
          >
            <Instagram size={16} />
            <span>FOLLOW @THE_EVOLUXE ON INSTAGRAM</span>
          </a>
        </div>

      </div>
    </section>
  );
};
