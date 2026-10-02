import React, { useState } from 'react';
import { Heart, ShoppingBag, ArrowRight, Check, Trash2, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { useAuth } from '../firebase/context';

interface WishlistSummaryProps {
  wishlistIds: string[];
  products: Product[];
  onAddToCart: (product: Product, size?: string, engraving?: string) => void;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct?: (product: Product) => void;
  onOpenCart?: () => void;
}

export const WishlistSummary: React.FC<WishlistSummaryProps> = ({
  wishlistIds,
  products,
  onAddToCart,
  onToggleWishlist,
  onSelectProduct,
  onOpenCart,
}) => {
  const { userPreferences } = useAuth();
  const [movingId, setMovingId] = useState<string | null>(null);
  const [movingAll, setMovingAll] = useState(false);

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));
  const totalValue = wishlistedProducts.reduce((sum, p) => sum + p.price, 0);

  const handleMoveToCart = (product: Product) => {
    setMovingId(product.id);
    
    // Auto-select preferred size if product offers sizes
    const chosenSize =
      product.sizes && product.sizes.length > 0
        ? userPreferences?.preferredRingSize && product.sizes.includes(userPreferences.preferredRingSize)
          ? userPreferences.preferredRingSize
          : product.sizes[0]
        : undefined;

    onAddToCart(product, chosenSize);

    // Transition from wishlist to cart after brief tactile confirmation
    setTimeout(() => {
      onToggleWishlist(product.id);
      setMovingId(null);
    }, 600);
  };

  const handleMoveAllToCart = () => {
    setMovingAll(true);
    wishlistedProducts.forEach((product) => {
      const chosenSize =
        product.sizes && product.sizes.length > 0
          ? userPreferences?.preferredRingSize && product.sizes.includes(userPreferences.preferredRingSize)
            ? userPreferences.preferredRingSize
            : product.sizes[0]
          : undefined;

      onAddToCart(product, chosenSize);
      onToggleWishlist(product.id);
    });

    setTimeout(() => {
      setMovingAll(false);
      if (onOpenCart) {
        onOpenCart();
      }
    }, 500);
  };

  return (
    <div className="p-4 bg-[#F5EFE4] border border-[#D8CDBD]/70 shadow-xs space-y-3.5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#D8CDBD]/50">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#063B2B]">
          <Heart size={14} className="text-[#C9A45C] fill-[#C9A45C]" />
          <span>Wishlist Summary</span>
          <span className="text-[10px] text-[#786851] font-mono font-normal">
            ({wishlistedProducts.length})
          </span>
        </div>

        {wishlistedProducts.length > 0 && (
          <span className="text-[11px] font-semibold text-[#063B2B] tabular-nums">
            Total: ₹{totalValue.toLocaleString('en-IN')}
          </span>
        )}
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="py-6 text-center space-y-2 bg-[#FAF7F2] border border-[#D8CDBD]/40 p-4">
          <Heart size={20} className="mx-auto text-[#D8CDBD]" />
          <p className="font-serif text-xs font-medium text-[#17140F]">
            No Pieces in Wishlist
          </p>
          <p className="text-[11px] text-[#786851] font-sans leading-relaxed max-w-xs mx-auto">
            Click the heart icon on any 9K solid gold jewel to curate your desired pieces here for 1-click cart transfer.
          </p>
          {products.length > 0 && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onToggleWishlist(products[0].id)}
                className="text-[10px] tracking-wider uppercase text-[#063B2B] hover:text-[#C9A45C] font-semibold underline cursor-pointer"
              >
                + Add {products[0].name.split(' ')[0]} Band to Saved
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2.5">
          <p className="text-[11px] text-[#786851] font-sans leading-relaxed">
            Move saved everyday gold favourites directly to your bag with your pre-configured size ({userPreferences?.preferredRingSize || '14'}):
          </p>

          {/* List of Saved Items */}
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            <AnimatePresence>
              {wishlistedProducts.map((product) => {
                const isMoving = movingId === product.id;

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center justify-between gap-3 p-2.5 bg-[#FAF7F2] border border-[#D8CDBD]/50 shadow-2xs rounded-xs"
                  >
                    {/* Thumbnail & Title */}
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div
                        onClick={() => onSelectProduct && onSelectProduct(product)}
                        className="w-12 h-14 bg-[#F5EFE4] overflow-hidden flex-shrink-0 border border-[#D8CDBD]/40 cursor-pointer"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4
                          onClick={() => onSelectProduct && onSelectProduct(product)}
                          className="font-serif text-xs font-medium text-[#17140F] line-clamp-1 cursor-pointer hover:text-[#063B2B]"
                        >
                          {product.name}
                        </h4>
                        <div className="text-[10px] text-[#786851] space-x-1 mt-0.5">
                          <span className="font-semibold text-[#063B2B]">9K Solid Gold</span>
                          {product.sizes && (
                            <>
                              <span>·</span>
                              <span>Size: {userPreferences?.preferredRingSize || product.sizes[0]}</span>
                            </>
                          )}
                        </div>
                        <div className="text-[11px] font-semibold text-[#17140F] tabular-nums mt-0.5">
                          ₹{product.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    </div>

                    {/* Actions: Move to Cart & Remove */}
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => handleMoveToCart(product)}
                        disabled={isMoving}
                        className={`px-2.5 py-1.5 text-[10px] tracking-[0.14em] uppercase font-sans font-semibold transition-all duration-200 flex items-center gap-1 cursor-pointer shadow-xs ${
                          isMoving
                            ? 'bg-[#063B2B] text-[#FAF7F2]'
                            : 'bg-[#C9A45C] text-[#17140F] hover:bg-[#DFBF7A]'
                        }`}
                        title="Move item to shopping bag"
                      >
                        {isMoving ? (
                          <>
                            <Check size={11} className="text-[#FAF7F2]" />
                            <span>Moving...</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={11} />
                            <span>Move to Bag</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleWishlist(product.id)}
                        className="p-1.5 text-[#786851] hover:text-[#991B1B] transition-colors cursor-pointer"
                        title="Remove from saved pieces"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Footer Controls: Move All & Open Bag */}
          <div className="pt-2 border-t border-[#D8CDBD]/40 flex items-center justify-between text-xs">
            {wishlistedProducts.length > 1 ? (
              <button
                type="button"
                onClick={handleMoveAllToCart}
                disabled={movingAll}
                className="px-3 py-1.5 bg-[#063B2B] text-[#FAF7F2] text-[10px] uppercase font-semibold tracking-wider hover:bg-[#04291E] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <ShoppingBag size={12} className="text-[#C9A45C]" />
                <span>{movingAll ? 'Transferring...' : 'Move All to Bag'}</span>
              </button>
            ) : (
              <span className="text-[10px] text-[#786851]">
                Seamless 1-click cart transfer
              </span>
            )}

            {onOpenCart && (
              <button
                type="button"
                onClick={onOpenCart}
                className="text-[10px] uppercase tracking-wider text-[#063B2B] hover:text-[#C9A45C] font-semibold underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Cart Bag</span>
                <ArrowRight size={10} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
