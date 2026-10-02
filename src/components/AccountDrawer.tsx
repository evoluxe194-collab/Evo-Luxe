import React, { useState } from 'react';
import {
  X,
  User as UserIcon,
  LogOut,
  Package,
  Check,
  ShieldCheck,
  ArrowRight,
  Truck,
  Search,
  CheckCircle2,
  ExternalLink,
  MapPin,
  ShoppingBag,
  RotateCw,
  Calendar,
  SlidersHorizontal,
  CircleDot,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../firebase/context';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { WishlistSummary } from './WishlistSummary';
import { NotificationCenter } from './NotificationCenter';
import { AppNotification } from '../data/notifications';
import { BuyAgainSection } from './BuyAgainSection';

/**
 * Simple Date-Math Utility for calculating Estimated Arrival Date
 * Based on order status:
 * - 'confirmed': order verified at atelier -> +4 days (assaying, 375 hallmarking & velvet casing)
 * - 'preparing': workshop assay & custom keepsake packaging -> +3 days
 * - 'dispatched' / 'In Armored Transit': en route via secured express courier -> +2 days
 * - 'delivered': arrived -> "Delivered"
 */
export function calculateEstimatedArrivalDate(
  status: string,
  createdAt?: string
): {
  formattedDate: string;
  daysRemaining: number;
  transitDescription: string;
} {
  const baseDate = createdAt ? new Date(createdAt) : new Date();
  const validBase = isNaN(baseDate.getTime()) ? new Date() : baseDate;
  const normalized = (status || '').toLowerCase();

  if (normalized.includes('delivered')) {
    return {
      formattedDate: validBase.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      daysRemaining: 0,
      transitDescription: 'Delivered',
    };
  }

  // Simple date math based on current status
  let daysToAdd = 3;
  let transitDescription = '3 Business Days';

  if (
    normalized.includes('dispatched') ||
    normalized.includes('transit') ||
    normalized.includes('armored')
  ) {
    daysToAdd = 2;
    transitDescription = 'Within 48 Hours';
  } else if (normalized.includes('preparing')) {
    daysToAdd = 3;
    transitDescription = '3 Days (Atelier Prep)';
  } else if (normalized.includes('confirmed')) {
    daysToAdd = 4;
    transitDescription = '3–4 Days (Hallmarking)';
  }

  // Add days in milliseconds
  const now = new Date();
  const referenceTime = Math.max(validBase.getTime(), now.getTime());
  const arrivalDate = new Date(referenceTime + daysToAdd * 24 * 60 * 60 * 1000);

  const formattedDate = arrivalDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return {
    formattedDate,
    daysRemaining: daysToAdd,
    transitDescription,
  };
}

export interface ParsedOrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  personalisationText?: string;
  image?: string;
  product: Product;
}

export function parseOrderItems(rawItems: string): ParsedOrderItem[] {
  if (!rawItems) return [];

  // 1. Try structured JSON parse
  try {
    const parsed = JSON.parse(rawItems);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item) => {
        const product =
          PRODUCTS.find((p) => p.id === item.productId || p.name.toLowerCase() === (item.name || '').toLowerCase()) ||
          PRODUCTS[0];
        return {
          productId: item.productId || product.id,
          name: item.name || product.name,
          price: item.price || product.price,
          quantity: item.quantity || 1,
          size: item.size || item.selectedSize || undefined,
          personalisationText: item.personalisationText || undefined,
          image: item.image || product.images[0],
          product,
        };
      });
    }
  } catch {
    // Continue to text parsing
  }

  // 2. Parse text summary (e.g. "Solstice Bevelled 9K Band (x1) [Size: 12] [Engraving: A.M]; ...")
  const segments = rawItems.split(';');
  const results: ParsedOrderItem[] = [];

  for (const seg of segments) {
    const trimmed = seg.trim();
    if (!trimmed) continue;

    // Match product from catalog
    const product =
      PRODUCTS.find((p) => trimmed.toLowerCase().includes(p.name.toLowerCase())) || PRODUCTS[0];

    // Extract size: [Size: 12]
    const sizeMatch = trimmed.match(/\[Size:\s*([^\]]+)\]/i);
    const size = sizeMatch ? sizeMatch[1].trim() : undefined;

    // Extract quantity: (x2)
    const qtyMatch = trimmed.match(/\(x(\d+)\)/i);
    const quantity = qtyMatch ? parseInt(qtyMatch[1], 10) : 1;

    // Extract engraving: [Engraving: A.M]
    const engMatch = trimmed.match(/\[Engraving:\s*([^\]]+)\]/i);
    const personalisationText = engMatch ? engMatch[1].trim() : undefined;

    results.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size,
      personalisationText,
      image: product.images[0],
      product,
    });
  }

  return results.length > 0
    ? results
    : [
        {
          productId: PRODUCTS[0].id,
          name: PRODUCTS[0].name,
          price: PRODUCTS[0].price,
          quantity: 1,
          image: PRODUCTS[0].images[0],
          product: PRODUCTS[0],
        },
      ];
}

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackOrder: (orderCode: string) => void;
  onAddToCart: (product: Product, size?: string, engraving?: string) => void;
  onOpenCart?: () => void;
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
  onSelectProduct?: (product: Product) => void;
  notifications?: AppNotification[];
  onMarkNotificationRead?: (id: string) => void;
  onMarkAllNotificationsRead?: () => void;
  onDismissNotification?: (id: string) => void;
  onOpenPolicy?: (policyName: string) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const AccountDrawer: React.FC<AccountDrawerProps> = ({
  isOpen,
  onClose,
  onTrackOrder,
  onAddToCart,
  onOpenCart,
  wishlistIds = [],
  onToggleWishlist = () => {},
  onSelectProduct,
  notifications = [],
  onMarkNotificationRead = () => {},
  onMarkAllNotificationsRead = () => {},
  onDismissNotification = () => {},
  onOpenPolicy,
  onNavigateSection,
}) => {
  const {
    user,
    signInWithGoogle,
    logout,
    userOrders,
    userPreferences,
    updateUserPreferences,
  } = useAuth();
  const [orderSearchCode, setOrderSearchCode] = useState('');
  const [activeTrackedOrder, setActiveTrackedOrder] = useState<{
    code: string;
    status: string;
    items?: string;
    amount?: number;
    destination?: string;
    createdAt?: string;
  } | null>(null);

  // Tracks which item was just added via "Buy Again"
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);
  const [savedPrefsFeedback, setSavedPrefsFeedback] = useState(false);

  const handleUpdateSize = async (size: string) => {
    await updateUserPreferences({ preferredRingSize: size });
    setSavedPrefsFeedback(true);
    setTimeout(() => setSavedPrefsFeedback(false), 2200);
  };

  const handleUpdateMetal = async (metal: '9K Gold' | '9K Rose Gold') => {
    await updateUserPreferences({ preferredMetalTone: metal });
    setSavedPrefsFeedback(true);
    setTimeout(() => setSavedPrefsFeedback(false), 2200);
  };

  const getRingMm = (size: string) => {
    const map: Record<string, string> = {
      '10': '15.7 mm',
      '12': '16.5 mm',
      '14': '17.2 mm',
      '16': '17.8 mm',
      '18': '18.5 mm',
      '20': '19.2 mm',
    };
    return map[size] || '17.2 mm';
  };

  if (!isOpen) return null;

  const handleSearchTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = orderSearchCode.trim().toUpperCase();
    if (!cleanCode) return;

    // Check if matching order in userOrders
    const matched = userOrders.find(
      (o) => o.orderCode.toUpperCase() === cleanCode
    );

    if (matched) {
      setActiveTrackedOrder({
        code: matched.orderCode,
        status: matched.status,
        items: matched.items,
        amount: matched.subtotal,
        destination: matched.shippingAddress,
        createdAt: matched.createdAt,
      });
    } else {
      // General valid consignment tracking
      setActiveTrackedOrder({
        code: cleanCode.startsWith('NINE-') ? cleanCode : `NINE-${cleanCode}`,
        status: 'In Armored Transit',
        destination: 'Insured Doorstep Transit with OTP Handover',
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleQuickTrackOrder = (code: string) => {
    setOrderSearchCode(code);
    const matched = userOrders.find((o) => o.orderCode === code);
    if (matched) {
      setActiveTrackedOrder({
        code: matched.orderCode,
        status: matched.status,
        items: matched.items,
        amount: matched.subtotal,
        destination: matched.shippingAddress,
        createdAt: matched.createdAt,
      });
    } else {
      setActiveTrackedOrder({
        code,
        status: 'In Armored Transit',
        destination: 'Insured Doorstep Transit with OTP Handover',
        createdAt: new Date().toISOString(),
      });
    }
  };

  const handleOpenInPolicyModal = (code: string) => {
    onTrackOrder(code);
  };

  const handleBuyAgain = (orderId: string, item: ParsedOrderItem) => {
    const key = `${orderId}-${item.productId}-${item.size || 'default'}`;
    onAddToCart(item.product, item.size, item.personalisationText);
    setAddedItemKey(key);

    setTimeout(() => {
      setAddedItemKey(null);
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#17140F]/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FAF7F2] text-[#17140F] shadow-2xl h-full flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#D8CDBD]/60 flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center space-x-2">
            <UserIcon size={18} className="text-[#063B2B]" />
            <h2 className="font-serif text-xl font-medium tracking-wide text-[#17140F]">
              NINE CLIENT ACCOUNT
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#17140F] hover:text-[#063B2B] transition-colors"
            aria-label="Close account"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {/* Notification Center */}
          <NotificationCenter
            notifications={notifications}
            onMarkAsRead={onMarkNotificationRead}
            onMarkAllAsRead={onMarkAllNotificationsRead}
            onDismiss={onDismissNotification}
            onTrackOrder={handleQuickTrackOrder}
            onNavigateSection={onNavigateSection}
            onOpenPolicy={onOpenPolicy}
            onCloseDrawer={onClose}
          />
          
          {/* FEATURE: Direct Order Tracking Section (Accessible to both Guests & Members) */}
          <div className="p-4 bg-[#F5EFE4] border border-[#D8CDBD]/70 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#063B2B]">
                <Truck size={15} className="text-[#C9A45C]" />
                <span>Track Consignment</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#786851]">
                Insured Armored Transit
              </span>
            </div>

            <p className="text-[11px] text-[#786851] font-sans leading-relaxed mb-3">
              Enter your NINE order ID to verify dispatch status and live transit milestones:
            </p>

            <form onSubmit={handleSearchTrack} className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  required
                  value={orderSearchCode}
                  onChange={(e) => setOrderSearchCode(e.target.value.toUpperCase())}
                  placeholder="E.G. NINE-104288"
                  className="w-full bg-[#FAF7F2] border border-[#D8CDBD] py-2 px-3 text-xs text-[#17140F] font-mono tracking-wider focus:outline-none focus:border-[#063B2B]"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-[#063B2B] text-[#FAF7F2] text-[11px] tracking-wider uppercase font-semibold hover:bg-[#04291E] transition-colors flex items-center gap-1"
              >
                <Search size={12} />
                <span>Track</span>
              </button>
            </form>

            {/* In-Drawer Status Card Result */}
            <AnimatePresence mode="wait">
              {activeTrackedOrder && (
                <motion.div
                  key={activeTrackedOrder.code}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-3 pt-3 border-t border-[#D8CDBD]/50 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#063B2B]">
                      {activeTrackedOrder.code}
                    </span>
                    <span className="bg-[#063B2B] text-[#FAF7F2] text-[9px] uppercase px-2 py-0.5 font-semibold">
                      {activeTrackedOrder.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-[#786851] space-y-1">
                    <div className="flex items-start gap-1.5">
                      <MapPin size={12} className="text-[#063B2B] mt-0.5 flex-shrink-0" />
                      <span>Origin: EVOLUXE Atelier, Thrissur, Kerala</span>
                    </div>
                    {activeTrackedOrder.destination && (
                      <div className="flex items-start gap-1.5">
                        <Truck size={12} className="text-[#C9A45C] mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">Destination: {activeTrackedOrder.destination}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress bar visual */}
                  <div className="w-full bg-[#D8CDBD]/60 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#C9A45C] h-full w-3/4 transition-all duration-500" />
                  </div>

                  {/* Estimated Arrival Date - Date Math Result */}
                  {(() => {
                    const arrivalInfo = calculateEstimatedArrivalDate(
                      activeTrackedOrder.status,
                      activeTrackedOrder.createdAt
                    );

                    return (
                      <>
                        <div className="p-2.5 bg-[#FAF7F2] border border-[#D8CDBD]/70 rounded-xs flex items-center justify-between shadow-2xs">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#063B2B]/10 flex items-center justify-center text-[#063B2B] flex-shrink-0">
                              <Calendar size={14} className="text-[#C9A45C]" />
                            </div>
                            <div>
                              <span className="text-[9px] uppercase tracking-[0.16em] text-[#786851] font-semibold block">
                                Estimated Arrival Date
                              </span>
                              <span className="text-xs font-semibold text-[#063B2B]">
                                {arrivalInfo.formattedDate}
                              </span>
                            </div>
                          </div>

                          <span className="text-[10px] font-sans px-2 py-0.5 bg-[#F5EFE4] text-[#786851] border border-[#D8CDBD]/40 font-medium">
                            {arrivalInfo.transitDescription}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          <span className="text-[#786851] flex items-center gap-1 font-medium">
                            <CheckCircle2 size={11} className="text-[#063B2B]" />
                            <span>
                              {arrivalInfo.daysRemaining > 0
                                ? `${arrivalInfo.daysRemaining}-Day Transit Window`
                                : 'Delivered'}
                            </span>
                          </span>
                          <button
                            onClick={() => handleOpenInPolicyModal(activeTrackedOrder.code)}
                            className="text-[#063B2B] hover:text-[#C9A45C] font-semibold underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Full Security Details & Policy</span>
                            <ExternalLink size={10} />
                          </button>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!user ? (
            /* Unauthenticated View: Sign In with Google */
            <div className="py-4 text-center space-y-6">
              <div className="w-14 h-14 bg-[#F5EFE4] text-[#063B2B] border border-[#D8CDBD] rounded-full flex items-center justify-center mx-auto shadow-xs">
                <ShieldCheck size={24} className="text-[#C9A45C]" />
              </div>

              <div>
                <h3 className="font-serif text-2xl text-[#17140F] font-medium mb-2">
                  Client Profile
                </h3>
                <p className="text-xs sm:text-sm text-[#786851] font-sans leading-relaxed max-w-xs mx-auto">
                  Sign in with your Google account to automatically store and track all your 9-karat jewellery orders.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={signInWithGoogle}
                  className="w-full py-3.5 px-4 bg-[#FAF7F2] border border-[#063B2B] text-[#063B2B] hover:bg-[#063B2B] hover:text-[#FAF7F2] text-xs tracking-[0.18em] uppercase font-sans font-semibold transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-sm group"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>SIGN IN WITH GOOGLE</span>
                </button>
              </div>

              <div className="p-4 bg-[#F5EFE4] text-left text-xs font-sans text-[#786851] space-y-1.5 border border-[#D8CDBD]/40">
                <div className="text-[#063B2B] font-semibold uppercase tracking-wider text-[10px]">
                  Protected by Firebase Authentication
                </div>
                <div>• Synchronized bag & wishlist across devices</div>
                <div>• Armored courier dispatch updates via SMS / Email</div>
                <div>• Stored EVOLUXE bullion certificate archive</div>
              </div>

              {/* Guest Personalization Settings */}
              <div className="p-4 bg-[#F5EFE4] border border-[#D8CDBD]/70 shadow-xs space-y-4 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-[#D8CDBD]/40">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#063B2B]">
                    <SlidersHorizontal size={14} className="text-[#C9A45C]" />
                    <span>Quick Sizing & Metal Preferences</span>
                  </div>
                  {savedPrefsFeedback && (
                    <span className="text-[10px] text-[#063B2B] font-semibold flex items-center gap-1 bg-[#FAF7F2] px-2 py-0.5 border border-[#063B2B]/20 animate-in fade-in duration-200">
                      <Check size={10} className="text-[#C9A45C]" />
                      <span>Saved</span>
                    </span>
                  )}
                </div>

                {/* Ring Size */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#17140F] flex items-center gap-1">
                      <CircleDot size={12} className="text-[#C9A45C]" />
                      <span>Preferred Ring Size</span>
                    </span>
                    <span className="text-[11px] text-[#786851] font-mono tabular-nums">
                      Size {userPreferences.preferredRingSize} ({getRingMm(userPreferences.preferredRingSize)})
                    </span>
                  </div>

                  <div className="grid grid-cols-6 gap-1.5">
                    {['10', '12', '14', '16', '18', '20'].map((size) => {
                      const isSelected = userPreferences.preferredRingSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleUpdateSize(size)}
                          className={`py-1.5 text-xs font-mono font-medium transition-all duration-200 border cursor-pointer ${
                            isSelected
                              ? 'bg-[#063B2B] text-[#FAF7F2] border-[#063B2B]'
                              : 'bg-[#FAF7F2] text-[#17140F] border-[#D8CDBD] hover:border-[#063B2B]'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Metal Tone */}
                <div className="space-y-2 pt-2 border-t border-[#D8CDBD]/40">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#17140F] flex items-center gap-1">
                      <Sparkles size={12} className="text-[#C9A45C]" />
                      <span>Preferred Metal Tone</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleUpdateMetal('9K Gold')}
                      className={`p-2.5 text-left border transition-all duration-200 cursor-pointer ${
                        userPreferences.preferredMetalTone === '9K Gold'
                          ? 'bg-[#FAF7F2] border-[#063B2B] ring-1 ring-[#063B2B]'
                          : 'bg-[#FAF7F2]/60 border-[#D8CDBD]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#F5DE88] via-[#C9A45C] to-[#8C6D23] border border-[#C9A45C]" />
                        <span className="font-serif text-xs font-semibold text-[#17140F]">9K Gold</span>
                      </div>
                      <div className="text-[10px] text-[#786851]">Classic Honey Gold</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdateMetal('9K Rose Gold')}
                      className={`p-2.5 text-left border transition-all duration-200 cursor-pointer ${
                        userPreferences.preferredMetalTone === '9K Rose Gold'
                          ? 'bg-[#FAF7F2] border-[#063B2B] ring-1 ring-[#063B2B]'
                          : 'bg-[#FAF7F2]/60 border-[#D8CDBD]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#F5BCAB] via-[#C9846E] to-[#995540] border border-[#C9846E]" />
                        <span className="font-serif text-xs font-semibold text-[#17140F]">Rose Gold</span>
                      </div>
                      <div className="text-[10px] text-[#786851]">Blush Pink Lustre</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Wishlist Summary for Guest */}
              <WishlistSummary
                wishlistIds={wishlistIds}
                products={PRODUCTS}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onSelectProduct={onSelectProduct}
                onOpenCart={onOpenCart}
              />

              {/* Buy Again Section for Guest / Everyday Repeats */}
              <BuyAgainSection
                userOrders={userOrders}
                onAddToCart={onAddToCart}
                onOpenCart={onOpenCart}
                onSelectProduct={onSelectProduct}
              />
            </div>
          ) : (
            /* Authenticated View: User Profile & Order History */
            <div className="space-y-6">
              
              {/* Profile Card */}
              <div className="p-4 bg-[#F5EFE4] border border-[#D8CDBD]/60 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'Client'}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full border border-[#C9A45C]"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#063B2B] text-[#FAF7F2] flex items-center justify-center font-serif text-lg">
                      {user.displayName ? user.displayName[0] : 'N'}
                    </div>
                  )}
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#17140F]">
                      {user.displayName || 'NINE Client'}
                    </h3>
                    <p className="text-xs text-[#786851] font-sans">
                      {user.email}
                    </p>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#063B2B] font-semibold mt-0.5 block">
                      375 GOLD COLLECTOR
                    </span>
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="p-2 text-[#786851] hover:text-[#063B2B] transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>

              {/* User Profile Settings: Ring Size & Metal Tone Personalization */}
              <div className="p-4 bg-[#F5EFE4] border border-[#D8CDBD]/70 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#D8CDBD]/50">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#063B2B]">
                    <SlidersHorizontal size={14} className="text-[#C9A45C]" />
                    <span>Profile Settings & Preferences</span>
                  </div>
                  {savedPrefsFeedback && (
                    <span className="text-[10px] text-[#063B2B] font-semibold flex items-center gap-1 bg-[#FAF7F2] px-2 py-0.5 border border-[#063B2B]/20 animate-in fade-in duration-200">
                      <Check size={10} className="text-[#C9A45C]" />
                      <span>Preferences Saved</span>
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-[#786851] font-sans leading-relaxed">
                  Tailor your defaults for automatic 1-click sizing and customized metal tone presentation across all 9K jewellery collections.
                </p>

                {/* 1. Preferred Ring Size */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#17140F] flex items-center gap-1.5">
                      <CircleDot size={13} className="text-[#C9A45C]" />
                      <span>Preferred Ring Size</span>
                    </span>
                    <span className="text-[11px] text-[#786851] font-mono tabular-nums">
                      Size {userPreferences.preferredRingSize} · {getRingMm(userPreferences.preferredRingSize)}
                    </span>
                  </div>

                  <div className="grid grid-cols-6 gap-1.5">
                    {['10', '12', '14', '16', '18', '20'].map((size) => {
                      const isSelected = userPreferences.preferredRingSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleUpdateSize(size)}
                          className={`py-2 text-xs font-mono font-medium transition-all duration-200 border cursor-pointer ${
                            isSelected
                              ? 'bg-[#063B2B] text-[#FAF7F2] border-[#063B2B] shadow-xs'
                              : 'bg-[#FAF7F2] text-[#17140F] border-[#D8CDBD] hover:border-[#063B2B]'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-[10px] text-[#786851]">
                    Pre-selects your size on all 9-karat solid gold rings & bands.
                  </div>
                </div>

                {/* 2. Preferred Metal Tone */}
                <div className="space-y-2.5 pt-3 border-t border-[#D8CDBD]/40">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#17140F] flex items-center gap-1.5">
                      <Sparkles size={13} className="text-[#C9A45C]" />
                      <span>Preferred Metal Tone</span>
                    </span>
                    <span className="text-[10px] text-[#063B2B] uppercase font-semibold">
                      375 Solid Gold
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {/* 9K Classic Gold */}
                    <button
                      type="button"
                      onClick={() => handleUpdateMetal('9K Gold')}
                      className={`p-3 text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        userPreferences.preferredMetalTone === '9K Gold'
                          ? 'bg-[#FAF7F2] border-[#063B2B] ring-1 ring-[#063B2B]'
                          : 'bg-[#FAF7F2]/60 border-[#D8CDBD] hover:border-[#786851]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#F5DE88] via-[#C9A45C] to-[#8C6D23] border border-[#C9A45C] shadow-2xs" />
                        {userPreferences.preferredMetalTone === '9K Gold' && (
                          <div className="w-4 h-4 rounded-full bg-[#063B2B] text-[#FAF7F2] flex items-center justify-center">
                            <Check size={10} />
                          </div>
                        )}
                      </div>
                      <div className="font-serif text-xs font-semibold text-[#17140F]">9K Classic Gold</div>
                      <div className="text-[10px] text-[#786851] mt-0.5 leading-snug">Warm honey hue alloyed with silver</div>
                    </button>

                    {/* 9K Rose Gold */}
                    <button
                      type="button"
                      onClick={() => handleUpdateMetal('9K Rose Gold')}
                      className={`p-3 text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        userPreferences.preferredMetalTone === '9K Rose Gold'
                          ? 'bg-[#FAF7F2] border-[#063B2B] ring-1 ring-[#063B2B]'
                          : 'bg-[#FAF7F2]/60 border-[#D8CDBD] hover:border-[#786851]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#F5BCAB] via-[#C9846E] to-[#995540] border border-[#C9846E] shadow-2xs" />
                        {userPreferences.preferredMetalTone === '9K Rose Gold' && (
                          <div className="w-4 h-4 rounded-full bg-[#063B2B] text-[#FAF7F2] flex items-center justify-center">
                            <Check size={10} />
                          </div>
                        )}
                      </div>
                      <div className="font-serif text-xs font-semibold text-[#17140F]">9K Rose Gold</div>
                      <div className="text-[10px] text-[#786851] mt-0.5 leading-snug">Blush pink lustre alloyed with copper</div>
                    </button>
                  </div>
                </div>

                <div className="text-[10px] text-[#786851] flex items-center justify-between pt-1">
                  <span>Boutique curation: {userPreferences.preferredMetalTone}</span>
                  <span className="text-[#063B2B] font-semibold">
                    {user ? 'Synced with Cloud Profile' : 'Stored locally'}
                  </span>
                </div>
              </div>

              {/* Wishlist Summary for Authenticated Collector */}
              <WishlistSummary
                wishlistIds={wishlistIds}
                products={PRODUCTS}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onSelectProduct={onSelectProduct}
                onOpenCart={onOpenCart}
              />

              {/* Buy Again Section: Filtered from past order history for 1-click re-ordering */}
              <BuyAgainSection
                userOrders={userOrders}
                onAddToCart={onAddToCart}
                onOpenCart={onOpenCart}
                onSelectProduct={onSelectProduct}
              />

              {/* Order History with BUY AGAIN for each item */}
              <div>
                <div className="flex items-center justify-between text-xs font-sans uppercase tracking-wider text-[#786851] mb-3">
                  <span>Your Orders ({userOrders.length})</span>
                  <span>Firestore Persistent</span>
                </div>

                {userOrders.length === 0 ? (
                  <div className="p-6 bg-[#F5EFE4]/60 border border-[#D8CDBD]/40 text-center text-xs text-[#786851]">
                    <Package size={24} className="mx-auto text-[#D8CDBD] mb-2" />
                    <p className="font-medium text-[#17140F]">No orders placed yet.</p>
                    <p className="text-[11px] mt-1 text-[#786851]/80">
                      When you place an order, your items will be listed here with a dedicated 'Buy Again' option to re-add them directly to your bag.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userOrders.map((order) => {
                      const parsedItems = parseOrderItems(order.items);
                      const orderArrival = calculateEstimatedArrivalDate(order.status, order.createdAt);

                      return (
                        <div
                          key={order.id}
                          className="p-4 bg-[#F5EFE4] border border-[#D8CDBD]/60 text-xs font-sans space-y-3 shadow-xs"
                        >
                          {/* Order Header */}
                          <div className="flex items-center justify-between pb-2 border-b border-[#D8CDBD]/40">
                            <div>
                              <span className="font-mono font-bold text-[#063B2B] block">
                                {order.orderCode}
                              </span>
                              <span className="text-[10px] text-[#786851]">
                                Ordered: {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="hidden sm:flex items-center gap-1 text-[10px] text-[#063B2B] bg-[#FAF7F2] px-2 py-0.5 border border-[#D8CDBD]/40 font-medium">
                                <Calendar size={10} className="text-[#C9A45C]" />
                                <span>Est. Arrival: {orderArrival.formattedDate}</span>
                              </div>
                              <span className="bg-[#063B2B] text-[#FAF7F2] text-[9px] uppercase px-2 py-0.5 font-semibold">
                                {order.status}
                              </span>
                            </div>
                          </div>

                          {/* Itemized Products List with Dedicated "BUY AGAIN" Button */}
                          <div className="space-y-2.5">
                            {parsedItems.map((item, idx) => {
                              const itemKey = `${order.id}-${item.productId}-${item.size || 'default'}`;
                              const isAdded = addedItemKey === itemKey;

                              return (
                                <div
                                  key={`${item.productId}-${idx}`}
                                  className="flex items-center justify-between gap-3 p-2.5 bg-[#FAF7F2] border border-[#D8CDBD]/40 rounded-xs"
                                >
                                  {/* Product Thumbnail & Details */}
                                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                    <div className="w-11 h-13 bg-[#F5EFE4] overflow-hidden flex-shrink-0 border border-[#D8CDBD]/50">
                                      <img
                                        src={item.image || item.product.images[0]}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <h4 className="font-serif text-xs font-medium text-[#17140F] line-clamp-1 leading-snug">
                                        {item.name}
                                      </h4>
                                      <div className="text-[10px] text-[#786851] space-x-1.5 mt-0.5">
                                        <span className="font-semibold text-[#063B2B]">9K Solid Gold</span>
                                        {item.size && (
                                          <>
                                            <span aria-hidden="true">·</span>
                                            <span>Size: {item.size}</span>
                                          </>
                                        )}
                                      </div>
                                      <div className="text-[11px] font-semibold text-[#17140F] tabular-nums mt-0.5">
                                        ₹{item.price.toLocaleString('en-IN')}
                                      </div>
                                    </div>
                                  </div>

                                  {/* BUY AGAIN Button */}
                                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                    <button
                                      onClick={() => handleBuyAgain(order.id, item)}
                                      className={`px-3 py-1.5 text-[10px] tracking-[0.16em] uppercase font-sans font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-xs ${
                                        isAdded
                                          ? 'bg-[#063B2B] text-[#FAF7F2]'
                                          : 'bg-[#C9A45C] text-[#17140F] hover:bg-[#DFBF7A]'
                                      }`}
                                      aria-label={`Buy ${item.name} again`}
                                    >
                                      {isAdded ? (
                                        <>
                                          <Check size={11} className="text-[#C9A45C]" />
                                          <span>Added!</span>
                                        </>
                                      ) : (
                                        <>
                                          <ShoppingBag size={11} />
                                          <span>Buy Again</span>
                                        </>
                                      )}
                                    </button>

                                    {isAdded && onOpenCart && (
                                      <button
                                        onClick={onOpenCart}
                                        className="text-[9px] uppercase tracking-wider text-[#063B2B] hover:text-[#C9A45C] underline font-semibold transition-colors"
                                      >
                                        View Bag →
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Order Footer with Total & Tracking Link */}
                          <div className="flex items-center justify-between pt-2 border-t border-[#D8CDBD]/40 text-xs">
                            <span className="font-semibold tabular-nums text-[#17140F]">
                              Total: ₹{order.subtotal.toLocaleString('en-IN')}
                            </span>
                            <button
                              onClick={() => handleQuickTrackOrder(order.orderCode)}
                              className="text-[#063B2B] hover:text-[#C9A45C] font-semibold text-[10px] tracking-wider uppercase inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>Track Consignment</span>
                              <ArrowRight size={10} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>

        {/* Footer with WhatsApp Customer Service Direct Link */}
        <div className="p-4 border-t border-[#D8CDBD]/60 bg-[#FAF7F2] space-y-2 text-center text-xs text-[#786851] font-sans">
          <a
            href="https://wa.me/919072656000?text=Hello%20NINE%20by%20EVOLUXE%2C%20I%20need%20customer%20service%20assistance%20with%20my%20account%20or%20jewellery%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-[#063B2B] text-[#FAF7F2] hover:bg-[#04291E] transition-colors rounded-xs text-xs font-semibold tracking-wide shadow-xs cursor-pointer"
          >
            <MessageCircle size={15} className="text-[#25D366]" />
            <span>WhatsApp Customer Service: +91 9072656000</span>
          </a>
          <p className="text-[10px] text-[#786851]/80">
            NINE by EVOLUXE Client Portal · 9K Lifestyle Jewellery · Thrissur
          </p>
        </div>

      </div>
    </div>
  );
};
