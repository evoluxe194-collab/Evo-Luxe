import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#17140F]/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FAF7F2] text-[#17140F] shadow-2xl h-full flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#D8CDBD]/60 flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center space-x-2">
            <Heart size={18} className="text-[#063B2B] fill-[#063B2B]" />
            <h2 className="font-serif text-xl font-medium tracking-wide text-[#17140F]">
              SAVED PIECES
            </h2>
            <span className="text-xs font-sans text-[#786851] tabular-nums">
              ({wishlistedProducts.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#17140F] hover:text-[#063B2B] transition-colors"
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Heart size={32} className="mx-auto text-[#D8CDBD]" />
              <p className="font-serif text-lg text-[#17140F]">No Saved Pieces Yet</p>
              <p className="text-xs text-[#786851] font-sans">
                Save pieces to create your personal everyday gold curation.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-[#F5EFE4] border border-[#D8CDBD]/40"
                >
                  <div
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="w-18 h-22 bg-[#FAF7F2] flex-shrink-0 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4
                          onClick={() => {
                            onSelectProduct(product);
                            onClose();
                          }}
                          className="font-serif text-sm font-medium text-[#17140F] leading-snug cursor-pointer hover:text-[#063B2B]"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onToggleWishlist(product.id)}
                          className="text-[#786851] hover:text-[#063B2B] p-1"
                          aria-label="Remove from wishlist"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#786851] font-sans mt-0.5">
                        <span>9K Gold ({product.weight})</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D8CDBD]/30">
                      <span className="font-sans font-semibold text-sm text-[#17140F] tabular-nums">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>

                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onToggleWishlist(product.id);
                        }}
                        className="py-1.5 px-3 bg-[#063B2B] text-[#FAF7F2] text-[10px] tracking-[0.16em] uppercase font-sans font-semibold hover:bg-[#04291E] flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag size={12} />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#D8CDBD]/60 bg-[#FAF7F2] text-center text-xs text-[#786851] font-sans">
          Saved in your private browser curation.
        </div>

      </div>
    </div>
  );
};
