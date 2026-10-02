import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Heart, Eye, ShoppingBag } from 'lucide-react';
import { Product, FilterState } from '../types';
import { CATEGORIES, OCCASIONS, COLLECTIONS } from '../data/products';

interface CatalogViewProps {
  products: Product[];
  initialCategory?: string;
  initialOccasion?: string;
  initialCollection?: string;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  initialCategory = 'All',
  initialOccasion = 'All',
  initialCollection = 'All',
  onClose,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedOccasion, setSelectedOccasion] = useState(initialOccasion);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'newest'>('featured');
  const [priceMax, setPriceMax] = useState<number>(35000);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (selectedOccasion !== 'All' && p.occasion !== selectedOccasion) return false;
        if (selectedCollection !== 'All' && p.collection !== selectedCollection) return false;
        if (p.price > priceMax) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        return 0; // featured default
      });
  }, [products, selectedCategory, selectedOccasion, selectedCollection, priceMax, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (selectedOccasion !== 'All' ? 1 : 0) +
    (selectedCollection !== 'All' ? 1 : 0) +
    (priceMax < 35000 ? 1 : 0);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedOccasion('All');
    setSelectedCollection('All');
    setPriceMax(35000);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#17140F] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Breadcrumb & Close Banner */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#D8CDBD]/50">
          <div className="flex items-center space-x-2 text-xs font-sans tracking-[0.2em] uppercase text-[#786851]">
            <button onClick={onClose} className="hover:text-[#063B2B]">
              Home
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#063B2B] font-semibold">The Complete Catalog</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">({filteredProducts.length} Designs)</span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs uppercase font-sans tracking-wider text-[#786851] hover:text-[#063B2B]"
          >
            <X size={16} />
            <span>Return to Homepage</span>
          </button>
        </div>

        {/* Editorial Collection Banner */}
        <div className="bg-[#F5EFE4] border border-[#D8CDBD]/40 p-8 sm:p-12 mb-10 text-center relative overflow-hidden">
          <div className="text-[10px] tracking-[0.28em] uppercase font-sans font-semibold text-[#063B2B] mb-2">
            9 KARAT SOLID GOLD
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#17140F] mb-3">
            {selectedCategory !== 'All'
              ? `${selectedCategory} Collection`
              : selectedOccasion !== 'All'
              ? `${selectedOccasion} Edit`
              : selectedCollection !== 'All'
              ? selectedCollection
              : 'Everyday Fine Jewellery'}
          </h1>
          <p className="text-xs sm:text-sm text-[#786851] font-sans max-w-xl mx-auto">
            Solid 9K gold engineered with sculptural minimalism, lightweight comfort, and verified 375 hallmarking.
          </p>
        </div>

        {/* Filter & Sort Bar (Clean, zero-pill controls) */}
        <div className="bg-[#FAF7F2] border border-[#D8CDBD]/50 p-4 mb-8 space-y-4">
          
          {/* Categories Tab Strip */}
          <div className="flex items-center overflow-x-auto pb-2 gap-2 text-xs font-sans">
            <span className="text-[#786851] uppercase tracking-wider text-[11px] mr-2 flex-shrink-0">
              Category:
            </span>
            {['All', 'Rings', 'Earrings', 'Necklaces', 'Pendants', 'Bracelets', 'Bangles', 'Anklets', 'Men'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#063B2B] text-[#FAF7F2] font-semibold'
                    : 'bg-[#F5EFE4] text-[#17140F] hover:bg-[#EAE2D5]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Filter & Sort Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#D8CDBD]/40 text-xs font-sans">
            
            {/* Occasions dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[#786851] uppercase tracking-wider text-[11px]">Occasion:</span>
              <select
                value={selectedOccasion}
                onChange={(e) => setSelectedOccasion(e.target.value)}
                className="bg-[#F5EFE4] border border-[#D8CDBD] py-1.5 px-3 text-xs text-[#17140F] focus:outline-none"
              >
                <option value="All">All Occasions</option>
                {OCCASIONS.map((occ) => (
                  <option key={occ.name} value={occ.name}>
                    {occ.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Max Slider */}
            <div className="flex items-center gap-3">
              <span className="text-[#786851] uppercase tracking-wider text-[11px]">Max Price:</span>
              <input
                type="range"
                min="5000"
                max="35000"
                step="1000"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="accent-[#063B2B] w-24 sm:w-32 cursor-pointer"
              />
              <span className="font-semibold tabular-nums text-[#17140F]">
                ₹{priceMax.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[#786851] uppercase tracking-wider text-[11px]">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F5EFE4] border border-[#D8CDBD] py-1.5 px-3 text-xs text-[#17140F] focus:outline-none"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Additions</option>
              </select>
            </div>

            {/* Reset */}
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-[#063B2B] underline text-xs hover:text-[#C9A45C]"
              >
                Reset All Filters
              </button>
            )}
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <h3 className="font-serif text-2xl text-[#17140F] mb-2">No matching silhouettes</h3>
            <p className="text-xs text-[#786851] font-sans mb-6">
              Try adjusting your price filter or selecting another category.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 bg-[#063B2B] text-[#FAF7F2] text-xs tracking-widest uppercase font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
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
                  <div className="relative aspect-[4/5] w-full bg-[#F5EFE4] overflow-hidden mb-3 border border-[#D8CDBD]/30">
                    <img
                      src={isHovered ? secondaryImg : primaryImg}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-105"
                    />

                    {/* Wishlist Heart */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-[#FAF7F2]/80 backdrop-blur-md rounded-full text-[#17140F] hover:text-[#063B2B] transition-colors z-10"
                      aria-label="Wishlist"
                    >
                      <Heart
                        size={15}
                        className={isWishlisted ? 'fill-[#063B2B] text-[#063B2B]' : 'text-[#17140F]'}
                      />
                    </button>

                    {/* Quick View & Add overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#17140F]/60 via-[#17140F]/20 to-transparent flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(product);
                        }}
                        className="flex-1 py-2 px-2 bg-[#FAF7F2] text-[#063B2B] text-[10px] tracking-[0.16em] uppercase font-sans font-semibold hover:bg-[#F5EFE4] flex items-center justify-center gap-1.5"
                      >
                        <Eye size={12} />
                        <span>Quick View</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(product);
                        }}
                        className="p-2 bg-[#C9A45C] text-[#17140F] hover:bg-[#DFBF7A]"
                        aria-label="Add to bag"
                      >
                        <ShoppingBag size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col text-left">
                    <div className="flex items-center text-[10px] text-[#786851] tracking-wider uppercase font-sans mb-1">
                      <span>9K Gold</span>
                      <span className="mx-1 text-[#D8CDBD]">·</span>
                      <span className="tabular-nums">{product.weight}</span>
                      <span className="mx-1 text-[#D8CDBD]">·</span>
                      <span>{product.occasion}</span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg text-[#17140F] font-medium leading-snug group-hover:text-[#063B2B] transition-colors mb-1">
                      {product.name}
                    </h3>

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
        )}

      </div>
    </div>
  );
};
