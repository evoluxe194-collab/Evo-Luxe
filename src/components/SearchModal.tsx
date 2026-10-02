import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Heart } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const SEARCH_SUGGESTIONS = [
  'gold ring',
  '9K earrings',
  'everyday necklace',
  'gift under ₹10,000',
  'minimal bracelet',
  'men',
  'torc bangle',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();

    if (term.includes('under') && term.includes('10')) {
      return PRODUCTS.filter((p) => p.price <= 10000);
    }

    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.occasion.toLowerCase().includes(term) ||
        p.collection.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#17140F]/80 backdrop-blur-sm flex justify-center p-4 sm:p-6 lg:p-12 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] text-[#17140F] shadow-2xl p-6 sm:p-8 self-start border border-[#D8CDBD]/40 animate-in slide-in-from-top-6 duration-300">
        
        {/* Header & Input */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D8CDBD]/60 mb-6">
          <div className="flex items-center flex-1 mr-4">
            <Search size={22} className="text-[#063B2B] mr-3" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search 9K gold jewellery, rings, earrings, pendants..."
              className="w-full bg-transparent text-base sm:text-lg text-[#17140F] placeholder-[#786851]/60 font-serif focus:outline-none"
            />
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#786851] hover:text-[#17140F] transition-colors"
            aria-label="Close search"
          >
            <X size={20} />
          </button>
        </div>

        {/* Suggestions chips / links */}
        <div className="mb-6">
          <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#786851] font-semibold block mb-2">
            SUGGESTIONS:
          </span>
          <div className="flex flex-wrap gap-2">
            {SEARCH_SUGGESTIONS.map((sug) => (
              <button
                key={sug}
                onClick={() => setSearchTerm(sug)}
                className="px-3 py-1.5 bg-[#F5EFE4] hover:bg-[#EAE2D5] text-xs font-sans text-[#17140F] transition-colors cursor-pointer"
              >
                {sug}
              </button>
            ))}
          </div>
        </div>

        {/* Live Search Results */}
        {searchTerm && (
          <div>
            <div className="flex items-center justify-between text-xs font-sans text-[#786851] mb-4">
              <span>{filteredProducts.length} Results Found</span>
              {filteredProducts.length > 0 && <span>Select to view details</span>}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-12 text-center text-[#786851] font-sans text-sm">
                No matching 9K gold jewellery found for "{searchTerm}".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[50vh] overflow-y-auto pr-1">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      onSelectProduct(prod);
                      onClose();
                    }}
                    className="flex items-center gap-4 p-3 bg-[#F5EFE4] hover:bg-[#EAE2D5] transition-colors cursor-pointer border border-[#D8CDBD]/30 group"
                  >
                    <div className="w-16 h-20 bg-[#FAF7F2] overflow-hidden flex-shrink-0">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#786851] font-sans block">
                        9K Gold · {prod.weight}
                      </span>
                      <h4 className="font-serif text-sm font-medium text-[#17140F] group-hover:text-[#063B2B] transition-colors line-clamp-1">
                        {prod.name}
                      </h4>
                      <span className="font-sans font-semibold text-xs text-[#17140F] tabular-nums mt-1 block">
                        ₹{prod.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <ArrowRight size={14} className="text-[#C9A45C] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
