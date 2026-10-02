import React, { useState, useMemo } from 'react';
import { RotateCw, Check, ShoppingBag, ArrowRight, Sparkles, Filter, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { OrderRecord, useAuth } from '../firebase/context';
import { parseOrderItems, ParsedOrderItem } from './AccountDrawer';

interface FrequentItem {
  productId: string;
  product: Product;
  name: string;
  price: number;
  image: string;
  size?: string;
  personalisationText?: string;
  orderCount: number;
  totalQuantity: number;
  lastOrderedAt: string;
}

interface BuyAgainSectionProps {
  userOrders: OrderRecord[];
  onAddToCart: (product: Product, size?: string, engraving?: string) => void;
  onOpenCart?: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const BuyAgainSection: React.FC<BuyAgainSectionProps> = ({
  userOrders,
  onAddToCart,
  onOpenCart,
  onSelectProduct,
}) => {
  const { userPreferences } = useAuth();
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'frequent' | 'recent'>('all');
  const [reorderingAll, setReorderingAll] = useState(false);

  // Extract and aggregate items across user's past order history
  const frequentItems: FrequentItem[] = useMemo(() => {
    if (!userOrders || userOrders.length === 0) {
      return [];
    }

    const itemMap = new Map<string, FrequentItem>();

    userOrders.forEach((order) => {
      const parsed = parseOrderItems(order.items);
      parsed.forEach((item) => {
        const key = item.productId;
        const existing = itemMap.get(key);

        if (existing) {
          existing.orderCount += 1;
          existing.totalQuantity += item.quantity;
          if (new Date(order.createdAt).getTime() > new Date(existing.lastOrderedAt).getTime()) {
            existing.lastOrderedAt = order.createdAt;
            if (item.size) existing.size = item.size;
            if (item.personalisationText) existing.personalisationText = item.personalisationText;
          }
        } else {
          itemMap.set(key, {
            productId: item.productId,
            product: item.product,
            name: item.name,
            price: item.price,
            image: item.image || item.product.images[0],
            size: item.size,
            personalisationText: item.personalisationText,
            orderCount: 1,
            totalQuantity: item.quantity,
            lastOrderedAt: order.createdAt,
          });
        }
      });
    });

    return Array.from(itemMap.values()).sort((a, b) => {
      // Primary sort: Order count descending
      if (b.orderCount !== a.orderCount) {
        return b.orderCount - a.orderCount;
      }
      // Secondary sort: Most recent order date
      return new Date(b.lastOrderedAt).getTime() - new Date(a.lastOrderedAt).getTime();
    });
  }, [userOrders]);

  // Fallback curated everyday essentials for zero-order accounts
  const curatedRepeatables: FrequentItem[] = useMemo(() => {
    return PRODUCTS.slice(0, 3).map((p, idx) => ({
      productId: p.id,
      product: p,
      name: p.name,
      price: p.price,
      image: p.images[0],
      size: p.sizes ? userPreferences?.preferredRingSize || p.sizes[0] : undefined,
      personalisationText: undefined,
      orderCount: 3 - idx,
      totalQuantity: 3 - idx,
      lastOrderedAt: new Date(Date.now() - idx * 86400000 * 5).toISOString(),
    }));
  }, [userPreferences?.preferredRingSize]);

  const displayItems = frequentItems.length > 0 ? frequentItems : curatedRepeatables;
  const isCuratedFallback = frequentItems.length === 0;

  // Filter based on user's selection
  const filteredItems = displayItems.filter((item) => {
    if (filterMode === 'frequent') return item.orderCount >= 2;
    if (filterMode === 'recent') {
      const daysDiff = (Date.now() - new Date(item.lastOrderedAt).getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= 30 || item.orderCount >= 1;
    }
    return true;
  });

  const handleReorder = (item: FrequentItem) => {
    const key = `${item.productId}-${item.size || 'default'}`;
    const effectiveSize =
      item.size ||
      (item.product.sizes?.includes(userPreferences?.preferredRingSize || '')
        ? userPreferences.preferredRingSize
        : item.product.sizes?.[0]);

    onAddToCart(item.product, effectiveSize, item.personalisationText);
    setAddedItemKey(key);

    setTimeout(() => {
      setAddedItemKey(null);
    }, 2200);
  };

  const handleReorderAll = () => {
    setReorderingAll(true);
    filteredItems.forEach((item) => {
      const effectiveSize =
        item.size ||
        (item.product.sizes?.includes(userPreferences?.preferredRingSize || '')
          ? userPreferences.preferredRingSize
          : item.product.sizes?.[0]);

      onAddToCart(item.product, effectiveSize, item.personalisationText);
    });

    setTimeout(() => {
      setReorderingAll(false);
      if (onOpenCart) {
        onOpenCart();
      }
    }, 600);
  };

  return (
    <div className="p-4 bg-[#F5EFE4] border border-[#D8CDBD]/70 shadow-xs space-y-3.5">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-[#D8CDBD]/50">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#063B2B]">
          <RotateCw size={14} className="text-[#C9A45C]" />
          <span>Buy Again</span>
          <span className="text-[10px] text-[#786851] font-mono font-normal">
            ({displayItems.length} {isCuratedFallback ? 'curated' : 'items'})
          </span>
        </div>

        {filteredItems.length > 1 && (
          <button
            type="button"
            onClick={handleReorderAll}
            disabled={reorderingAll}
            className="text-[10px] uppercase tracking-wider text-[#063B2B] hover:text-[#C9A45C] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
          >
            <ShoppingBag size={11} />
            <span>{reorderingAll ? 'Adding All...' : 'Re-Order All'}</span>
          </button>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-[#786851] font-sans">
        <p>
          {isCuratedFallback
            ? 'Frequently repeated everyday 9K essentials ready for 1-click re-ordering:'
            : 'Filtered from your past orders for 1-click replenishment:'}
        </p>
      </div>

      {/* Filter Tabs if multiple frequent items exist */}
      {!isCuratedFallback && displayItems.length > 1 && (
        <div className="flex items-center gap-1.5 text-[10px] font-sans">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-2 py-0.5 uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-[#063B2B] text-[#FAF7F2] border-[#063B2B]'
                : 'bg-[#FAF7F2] text-[#786851] border-[#D8CDBD]/60 hover:border-[#063B2B]'
            }`}
          >
            All Past Items ({displayItems.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('frequent')}
            className={`px-2 py-0.5 uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
              filterMode === 'frequent'
                ? 'bg-[#063B2B] text-[#FAF7F2] border-[#063B2B]'
                : 'bg-[#FAF7F2] text-[#786851] border-[#D8CDBD]/60 hover:border-[#063B2B]'
            }`}
          >
            Frequent (2+ Orders)
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('recent')}
            className={`px-2 py-0.5 uppercase tracking-wider font-semibold border transition-all cursor-pointer ${
              filterMode === 'recent'
                ? 'bg-[#063B2B] text-[#FAF7F2] border-[#063B2B]'
                : 'bg-[#FAF7F2] text-[#786851] border-[#D8CDBD]/60 hover:border-[#063B2B]'
            }`}
          >
            Recent Repeats
          </button>
        </div>
      )}

      {/* Item List */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        <AnimatePresence>
          {filteredItems.map((item) => {
            const itemKey = `${item.productId}-${item.size || 'default'}`;
            const isAdded = addedItemKey === itemKey;

            return (
              <motion.div
                key={item.productId}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center justify-between gap-3 p-2.5 bg-[#FAF7F2] border border-[#D8CDBD]/50 shadow-2xs rounded-xs"
              >
                {/* Thumbnail & Title */}
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div
                    onClick={() => onSelectProduct && onSelectProduct(item.product)}
                    className="w-12 h-14 bg-[#F5EFE4] overflow-hidden flex-shrink-0 border border-[#D8CDBD]/40 cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4
                        onClick={() => onSelectProduct && onSelectProduct(item.product)}
                        className="font-serif text-xs font-medium text-[#17140F] line-clamp-1 cursor-pointer hover:text-[#063B2B]"
                      >
                        {item.name}
                      </h4>
                      <span className="text-[9px] uppercase px-1.5 py-0.2 bg-[#F5EFE4] text-[#063B2B] border border-[#D8CDBD]/40 font-mono font-semibold">
                        {item.orderCount > 1
                          ? `Ordered ${item.orderCount}x`
                          : isCuratedFallback
                          ? 'Popular Repeat'
                          : 'Ordered 1x'}
                      </span>
                    </div>

                    <div className="text-[10px] text-[#786851] space-x-1 mt-0.5">
                      <span className="font-semibold text-[#063B2B]">9K Solid Gold</span>
                      {item.size && (
                        <>
                          <span>·</span>
                          <span>Size: {item.size}</span>
                        </>
                      )}
                      {!item.size && userPreferences?.preferredRingSize && item.product.sizes && (
                        <>
                          <span>·</span>
                          <span className="text-[#C9A45C]">Size: {userPreferences.preferredRingSize}</span>
                        </>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-semibold text-[#17140F] tabular-nums mt-0.5">
                      <span>₹{item.price.toLocaleString('en-IN')}</span>
                      {!isCuratedFallback && item.lastOrderedAt && (
                        <span className="text-[9px] text-[#786851] font-normal">
                          Last: {new Date(item.lastOrderedAt).toLocaleDateString('en-IN', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 1-Click Reorder Button */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handleReorder(item)}
                    disabled={isAdded}
                    className={`px-3 py-1.5 text-[10px] tracking-[0.14em] uppercase font-sans font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                      isAdded
                        ? 'bg-[#063B2B] text-[#FAF7F2]'
                        : 'bg-[#063B2B] hover:bg-[#04291E] text-[#FAF7F2]'
                    }`}
                    title="1-Click Re-Order"
                  >
                    {isAdded ? (
                      <>
                        <Check size={11} className="text-[#C9A45C]" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <RotateCw size={10} className="text-[#C9A45C]" />
                        <span>Buy Again</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer link to shopping bag */}
      <div className="pt-2 border-t border-[#D8CDBD]/40 flex items-center justify-between text-xs">
        <span className="text-[10px] text-[#786851]">
          Instant 1-click re-ordering with saved sizes & preferences
        </span>
        {onOpenCart && (
          <button
            type="button"
            onClick={onOpenCart}
            className="text-[10px] uppercase tracking-wider text-[#063B2B] hover:text-[#C9A45C] font-semibold underline flex items-center gap-1 cursor-pointer"
          >
            <span>Open Bag</span>
            <ArrowRight size={10} />
          </button>
        )}
      </div>
    </div>
  );
};
