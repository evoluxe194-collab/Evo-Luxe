import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

interface BestsellersSectionProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onViewAll: () => void;
}

export const BestsellersSection: React.FC<BestsellersSectionProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onSelectProduct,
  onAddToCart,
  onViewAll,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="bestsellers" className="w-full py-20 lg:py-28 bg-[#FAF7F2] border-t border-[#D8CDBD]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center justify-center space-x-2 text-xs tracking-[0.28em] uppercase font-sans font-semibold text-[#063B2B] mb-2.5">
            <span className="w-5 h-[1px] bg-[#C9A45C]" aria-hidden="true" />
            <span>COMMUNITY SIGNATURES</span>
            <span className="w-5 h-[1px] bg-[#C9A45C]" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17140F] font-medium tracking-tight mb-3">
            THE NINE EDIT
          </h2>
          <p className="text-sm sm:text-base text-[#786851] font-sans">
            Pieces our community keeps coming back to. Refined everyday gold designed for life.
          </p>
        </div>

        {/* 4-Column Luxury Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestsellers.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isHovered = hoveredId === product.id;
            const primaryImg = product.images[0];
            const secondaryImg = product.images[1] || product.images[0];

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectProduct(product)}
                className="group flex flex-col cursor-pointer transition-all duration-300"
              >
                {/* Image Container with Second Image Hover Reveal */}
                <div className="relative aspect-[4/5] w-full bg-[#F5EFE4] overflow-hidden mb-4 border border-[#D8CDBD]/30">
                  <img
                    src={isHovered ? secondaryImg : primaryImg}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-105"
                  />

                  {/* Wishlist Button (Quiet top right) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-[#FAF7F2]/80 backdrop-blur-md rounded-full text-[#17140F] hover:text-[#063B2B] transition-colors z-10"
                    aria-label="Add to wishlist"
                  >
                    <Heart
                      size={15}
                      className={isWishlisted ? 'fill-[#063B2B] text-[#063B2B]' : 'text-[#17140F]'}
                    />
                  </button>

                  {/* Quick Action Overlay (Appears on hover) */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#17140F]/60 via-[#17140F]/20 to-transparent flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      className="flex-1 py-2 px-2 bg-[#FAF7F2] text-[#063B2B] text-[10px] tracking-[0.16em] uppercase font-sans font-semibold hover:bg-[#F5EFE4] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Eye size={12} />
                      <span>Quick View</span>
                    </button>

                    <button
                      onClick={(e) => handleAdd(e, product)}
                      className={`p-2 transition-colors flex items-center justify-center shadow-sm ${
                        addedId === product.id
                          ? 'bg-[#063B2B] text-[#FAF7F2]'
                          : 'bg-[#C9A45C] text-[#17140F] hover:bg-[#DFBF7A]'
                      }`}
                      aria-label="Add to bag"
                    >
                      {addedId === product.id ? <Check size={14} /> : <ShoppingBag size={14} />}
                    </button>
                  </div>
                </div>

                {/* Clean Product Metadata (Zero-Pill Discipline) */}
                <div className="flex flex-col text-left">
                  {/* Category & Weight Separators */}
                  <div className="flex items-center text-[11px] text-[#786851] tracking-wider uppercase font-sans mb-1">
                    <span>9K Gold</span>
                    <span className="mx-1.5 text-[#D8CDBD]" aria-hidden="true">·</span>
                    <span className="tabular-nums">{product.weight}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-base sm:text-lg text-[#17140F] font-medium leading-snug group-hover:text-[#063B2B] transition-colors mb-1.5">
                    {product.name}
                  </h3>

                  {/* Price & Legal Transparency */}
                  <div className="flex items-baseline space-x-2 mt-auto">
                    <span className="font-sans font-semibold text-sm sm:text-base text-[#17140F] tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.mrp > product.price && (
                      <span className="font-sans text-xs text-[#786851] line-through tabular-nums">
                        ₹{product.mrp.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom View All Link */}
        <div className="mt-14 text-center">
          <button
            onClick={onViewAll}
            className="inline-flex items-center justify-center px-8 py-3.5 border border-[#063B2B] text-[#063B2B] text-xs tracking-[0.22em] uppercase font-sans font-semibold hover:bg-[#063B2B] hover:text-[#FAF7F2] transition-all duration-300 cursor-pointer"
          >
            VIEW ALL BESTSELLERS
          </button>
        </div>

      </div>
    </section>
  );
};
