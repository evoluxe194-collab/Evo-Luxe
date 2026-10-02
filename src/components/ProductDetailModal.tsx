import React, { useState, useEffect } from 'react';
import { X, Heart, ShieldCheck, Truck, RefreshCw, Sparkles, ChevronRight, Check, ShoppingBag, Ruler } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useAuth } from '../firebase/context';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string, engraving?: string) => void;
  onBuyNow: (product: Product, size?: string, engraving?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
}) => {
  const { userPreferences } = useAuth();
  if (!isOpen || !product) return null;

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(() => {
    if (product.sizes && product.sizes.length > 0) {
      if (userPreferences?.preferredRingSize && product.sizes.includes(userPreferences.preferredRingSize)) {
        return userPreferences.preferredRingSize;
      }
      return product.sizes[0];
    }
    return '';
  });

  useEffect(() => {
    if (product?.sizes && product.sizes.length > 0) {
      if (userPreferences?.preferredRingSize && product.sizes.includes(userPreferences.preferredRingSize)) {
        setSelectedSize(userPreferences.preferredRingSize);
      } else {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product, userPreferences?.preferredRingSize]);
  const [engravingText, setEngravingText] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'purity' | 'shipping' | 'care'>('details');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const pairWithProducts = PRODUCTS.filter((p) => product.pairWithIds?.includes(p.id));

  const handleAdd = () => {
    onAddToCart(product, selectedSize, engravingText);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleBuy = () => {
    onBuyNow(product, selectedSize, engravingText);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#17140F]/80 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Content Container */}
      <div className="relative w-full max-w-5xl bg-[#FAF7F2] text-[#17140F] shadow-2xl overflow-hidden min-h-screen sm:min-h-0 sm:max-h-[92vh] flex flex-col">
        
        {/* Top Floating Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="p-2 bg-[#FAF7F2]/90 hover:bg-[#F5EFE4] text-[#17140F] rounded-full transition-colors focus:outline-none shadow-sm"
            aria-label="Close product view"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-8 lg:p-12 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
            
            {/* Left Column: Gallery (Col 1-7) */}
            <div className="lg:col-span-7 flex flex-col space-y-4">
              {/* Hero Active Image Display */}
              <div className="relative aspect-[4/5] w-full bg-[#F5EFE4] overflow-hidden border border-[#D8CDBD]/40">
                <img
                  src={product.images[activeImgIndex] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-500"
                />
                
                {/* 9K Hallmark Stamp Badge */}
                <div className="absolute bottom-4 left-4 bg-[#063B2B]/90 backdrop-blur-md text-[#FAF7F2] px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-sans font-semibold">
                  375 SOLID GOLD
                </div>
              </div>

              {/* Thumbnails row */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImgIndex(i)}
                      className={`relative w-20 h-24 flex-shrink-0 bg-[#F5EFE4] overflow-hidden border-2 transition-all ${
                        activeImgIndex === i ? 'border-[#063B2B]' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Angle ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Contiguous Purchase Module (Col 8-12) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                
                {/* Brand & Category Kicker */}
                <div className="flex items-center justify-between text-xs font-sans tracking-[0.2em] uppercase text-[#786851] mb-2">
                  <span>NINE · {product.category}</span>
                  <button
                    onClick={() => onToggleWishlist(product.id)}
                    className="text-[#17140F] hover:text-[#063B2B] flex items-center gap-1.5 transition-colors"
                  >
                    <Heart
                      size={16}
                      className={isWishlisted ? 'fill-[#063B2B] text-[#063B2B]' : 'text-[#17140F]'}
                    />
                    <span className="text-[10px]">{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                  </button>
                </div>

                {/* Product Title */}
                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#17140F] font-medium tracking-tight mb-2">
                  {product.name}
                </h1>
                
                <p className="text-xs sm:text-sm text-[#786851] font-sans mb-4">
                  {product.subtitle}
                </p>

                {/* Price Block */}
                <div className="p-4 bg-[#F5EFE4] border border-[#D8CDBD]/50 mb-6">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-sans font-semibold text-2xl sm:text-3xl text-[#17140F] tabular-nums">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.mrp > product.price && (
                      <span className="font-sans text-sm text-[#786851] line-through tabular-nums">
                        MRP ₹{product.mrp.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-[#786851] font-sans">
                    Price inclusive of all taxes. Free insured doorstep delivery across India.
                  </div>
                </div>

                {/* Technical Specifications Callouts */}
                <div className="grid grid-cols-2 gap-3 py-3 border-y border-[#D8CDBD]/40 mb-6 text-xs font-sans">
                  <div>
                    <span className="text-[#786851] uppercase tracking-wider block text-[10px]">Gold Weight</span>
                    <span className="font-semibold text-[#17140F] tabular-nums">{product.weight}</span>
                  </div>
                  <div>
                    <span className="text-[#786851] uppercase tracking-wider block text-[10px]">Dimensions</span>
                    <span className="font-semibold text-[#17140F]">{product.dimensions}</span>
                  </div>
                </div>

                {/* Size Selector (If applicable) */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs font-sans mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold uppercase tracking-wider text-[#17140F]">
                          Select Size
                        </span>
                        {userPreferences?.preferredRingSize && product.sizes.includes(userPreferences.preferredRingSize) && (
                          <span className="text-[10px] text-[#063B2B] bg-[#C9A45C]/20 px-2 py-0.5 font-medium">
                            Your Preferred Size: {userPreferences.preferredRingSize}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => setShowSizeGuide(!showSizeGuide)}
                        className="text-[#063B2B] hover:text-[#C9A45C] flex items-center gap-1 text-[11px] font-medium"
                      >
                        <Ruler size={13} />
                        <span>Size Guide</span>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => {
                        const isPreferred = userPreferences?.preferredRingSize === s;
                        return (
                          <button
                            key={s}
                            onClick={() => setSelectedSize(s)}
                            className={`px-3.5 py-2 text-xs font-sans tracking-wider transition-all relative ${
                              selectedSize === s
                                ? 'bg-[#063B2B] text-[#FAF7F2] font-semibold'
                                : 'bg-[#F5EFE4] text-[#17140F] hover:bg-[#EAE2D5]'
                            }`}
                          >
                            <span>{s}</span>
                            {isPreferred && (
                              <span className="ml-1 text-[9px] text-[#C9A45C]" title="Your preferred size">★</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {showSizeGuide && (
                      <div className="mt-3 p-3 bg-[#FAF7F2] border border-[#D8CDBD] text-xs font-sans text-[#786851] leading-relaxed">
                        <strong className="text-[#17140F] block mb-1">Standard Sizing Reference:</strong>
                        Rings adhere to Indian Standard sizes (circumference in mm). Bangles measure inside diameter across wrist bones. If between sizes, we recommend sizing up.
                      </div>
                    )}
                  </div>
                )}

                {/* Bespoke Laser Engraving (If applicable) */}
                {product.canPersonalise && (
                  <div className="p-4 bg-[#F5EFE4] border border-[#C9A45C]/30 mb-6">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#063B2B] uppercase tracking-wider mb-1.5">
                      <Sparkles size={14} className="text-[#C9A45C]" />
                      <span>Complimentary Laser Engraving</span>
                    </div>
                    <input
                      type="text"
                      maxLength={8}
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                      placeholder="ENTER INITIALS OR DATE (MAX 8 CHARS)"
                      className="w-full bg-[#FAF7F2] border border-[#D8CDBD] px-3 py-2 text-xs text-[#17140F] uppercase tracking-widest focus:outline-none focus:border-[#063B2B]"
                    />
                  </div>
                )}

                {/* Primary Action Buttons */}
                <div className="flex flex-col gap-3 mb-8">
                  <button
                    onClick={handleAdd}
                    className={`w-full py-4 text-xs tracking-[0.22em] uppercase font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      addedAnimation
                        ? 'bg-[#04291E] text-[#FAF7F2]'
                        : 'bg-[#063B2B] text-[#FAF7F2] hover:bg-[#04291E]'
                    }`}
                  >
                    {addedAnimation ? (
                      <>
                        <Check size={16} className="text-[#C9A45C]" />
                        <span>ADDED TO YOUR BAG</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} className="text-[#C9A45C]" />
                        <span>ADD TO BAG</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuy}
                    className="w-full py-3.5 border border-[#063B2B] text-[#063B2B] hover:bg-[#063B2B] hover:text-[#FAF7F2] text-xs tracking-[0.22em] uppercase font-sans font-semibold transition-all cursor-pointer"
                  >
                    BUY NOW
                  </button>
                </div>

                {/* Guarantee Badges */}
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#786851] font-sans pt-4 border-t border-[#D8CDBD]/40 mb-8">
                  <div className="flex flex-col items-center">
                    <ShieldCheck size={16} className="text-[#063B2B] mb-1" />
                    <span>375 BIS Assayed</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Truck size={16} className="text-[#063B2B] mb-1" />
                    <span>Insured Transit</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <RefreshCw size={16} className="text-[#063B2B] mb-1" />
                    <span>15-Day Exchange</span>
                  </div>
                </div>

              </div>

              {/* Informational Accordion Tabs */}
              <div className="border-t border-[#D8CDBD]/50 pt-4">
                <div className="flex border-b border-[#D8CDBD]/40 text-xs font-sans uppercase tracking-wider mb-4">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 mr-4 transition-colors font-semibold ${
                      activeTab === 'details' ? 'border-b-2 border-[#063B2B] text-[#063B2B]' : 'text-[#786851] hover:text-[#17140F]'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('purity')}
                    className={`pb-2 mr-4 transition-colors font-semibold ${
                      activeTab === 'purity' ? 'border-b-2 border-[#063B2B] text-[#063B2B]' : 'text-[#786851] hover:text-[#17140F]'
                    }`}
                  >
                    9K Purity
                  </button>
                  <button
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2 mr-4 transition-colors font-semibold ${
                      activeTab === 'shipping' ? 'border-b-2 border-[#063B2B] text-[#063B2B]' : 'text-[#786851] hover:text-[#17140F]'
                    }`}
                  >
                    Shipping & Returns
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2 transition-colors font-semibold ${
                      activeTab === 'care' ? 'border-b-2 border-[#063B2B] text-[#063B2B]' : 'text-[#786851] hover:text-[#17140F]'
                    }`}
                  >
                    Care Guide
                  </button>
                </div>

                <div className="text-xs text-[#17140F]/80 font-sans leading-relaxed min-h-[90px]">
                  {activeTab === 'details' && (
                    <div className="space-y-2">
                      <p>{product.description}</p>
                      <ul className="list-disc pl-4 space-y-1 text-[#786851] pt-2">
                        {product.details.map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'purity' && (
                    <div className="space-y-2">
                      <p className="font-semibold text-[#063B2B]">Certified 9 Karat Solid Gold (375 Hallmark)</p>
                      <p>
                        Contains 37.5% pure solid gold, alloyed with silver and copper to create optimal structural resilience. Resistant to deformation, bending, and everyday surface scratching.
                      </p>
                      <p className="text-[11px] text-[#786851]">
                        Assayed under Indian Hallmarking protocols and backed by the EVOLUXE Bullion Exchange guarantee.
                      </p>
                    </div>
                  )}

                  {activeTab === 'shipping' && (
                    <div className="space-y-2">
                      <p>• <strong>Complimentary Insured Delivery:</strong> Shipped via specialized armored courier with mandatory OTP verification.</p>
                      <p>• <strong>Dispatch Timeline:</strong> Ready-to-wear pieces dispatch within 24–48 hours. Custom laser engraving takes 2–3 business days.</p>
                      <p>• <strong>15-Day Hassle-Free Exchange:</strong> Complete peace of mind for sizing adjustments.</p>
                    </div>
                  )}

                  {activeTab === 'care' && (
                    <div className="space-y-2">
                      <p>
                        9K gold is durable enough for daily showering and swimming. To maintain maximum mirror luster, rinse occasionally in lukewarm water with mild soap, and dry with the complimentary NINE microfiber cloth included in your box.
                      </p>
                    </div>
                  )}
                </div>
              </div>

            </div>

          </div>

          {/* Cross-Sell: PAIR IT WITH */}
          {pairWithProducts.length > 0 && (
            <div className="mt-16 pt-10 border-t border-[#D8CDBD]/50">
              <div className="flex items-center space-x-2 text-xs tracking-[0.24em] uppercase font-sans font-semibold text-[#063B2B] mb-2">
                <span className="w-5 h-[1px] bg-[#C9A45C]" aria-hidden="true" />
                <span>COMPLETE THE LOOK</span>
              </div>
              <h3 className="font-serif text-2xl text-[#17140F] font-medium mb-6">
                PAIR IT WITH
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {pairWithProducts.map((paired) => (
                  <div
                    key={paired.id}
                    onClick={() => onSelectProduct(paired)}
                    className="group cursor-pointer bg-[#F5EFE4] p-3 border border-[#D8CDBD]/30 hover:border-[#063B2B] transition-all"
                  >
                    <div className="aspect-square w-full bg-[#FAF7F2] overflow-hidden mb-2">
                      <img
                        src={paired.images[0]}
                        alt={paired.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="font-serif text-sm font-medium text-[#17140F] line-clamp-1 mb-1 group-hover:text-[#063B2B]">
                      {paired.name}
                    </h4>
                    <span className="text-xs font-sans font-semibold text-[#17140F] tabular-nums">
                      ₹{paired.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
