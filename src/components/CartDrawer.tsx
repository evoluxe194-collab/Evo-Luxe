import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Gift, Check } from 'lucide-react';
import { CartItem } from '../types';
import { useAuth } from '../firebase/context';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const { user, createOrderInFirestore } = useAuth();
  const [includeGiftNote, setIncludeGiftNote] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [generatedOrderCode, setGeneratedOrderCode] = useState('');
  const [customerName, setCustomerName] = useState(user?.displayName || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'prepaid' | 'cod'>('prepaid');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.displayName && !customerName) {
      setCustomerName(user.displayName);
    }
  }, [user]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const code = await createOrderInFirestore({
        customerName: customerName || 'Valued Collector',
        customerPhone,
        shippingAddress: customerCity,
        subtotal,
        items,
        paymentMethod,
      });
      setGeneratedOrderCode(code);
      setOrderConfirmed(true);
      setTimeout(() => {
        onClearCart();
      }, 5000);
    } catch (err) {
      console.error('Error creating order:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#17140F]/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FAF7F2] text-[#17140F] shadow-2xl h-full flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#D8CDBD]/60 flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center space-x-2">
            <ShoppingBag size={18} className="text-[#063B2B]" />
            <h2 className="font-serif text-xl font-medium tracking-wide text-[#17140F]">
              YOUR NINE BAG
            </h2>
            <span className="text-xs font-sans text-[#786851] tabular-nums">
              ({items.reduce((acc, curr) => acc + curr.quantity, 0)})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#17140F] hover:text-[#063B2B] transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Complimentary Shipping Progress Banner */}
        <div className="px-5 py-3 bg-[#F5EFE4] border-b border-[#D8CDBD]/40 text-xs font-sans">
          <div className="flex justify-between text-[#063B2B] font-medium mb-1">
            <span>Complimentary Insured Shipping</span>
            <span>Unlocked</span>
          </div>
          <div className="w-full bg-[#D8CDBD]/50 h-1 rounded-full overflow-hidden">
            <div
              className="bg-[#063B2B] h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {orderConfirmed ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 bg-[#063B2B] text-[#FAF7F2] rounded-full flex items-center justify-center mx-auto shadow-md">
                <Check size={28} />
              </div>
              <h3 className="font-serif text-2xl text-[#17140F] font-medium">
                Order Confirmed
              </h3>
              <p className="text-xs text-[#786851] font-sans leading-relaxed max-w-xs mx-auto">
                Thank you, {customerName || 'Valued Collector'}. Your 9K solid gold jewellery is being prepared with insured transit by EVOLUXE.
              </p>
              <div className="p-4 bg-[#F5EFE4] text-left text-xs font-sans space-y-1 max-w-xs mx-auto border border-[#D8CDBD]/60">
                <div className="flex justify-between">
                  <span className="text-[#786851]">Order Code:</span>
                  <span className="font-mono font-bold text-[#063B2B]">{generatedOrderCode || 'NINE-104288'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#786851]">Total Paid:</span>
                  <span className="font-bold tabular-nums">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#786851]">Dispatch:</span>
                  <span>Within 24–48 Hours</span>
                </div>
              </div>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Simulator */
            <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs font-sans">
              <div className="text-sm font-serif font-medium text-[#17140F] pb-2 border-b border-[#D8CDBD]/50">
                Express Delivery Details
              </div>

              <div>
                <label className="block text-[#786851] uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="E.g. Ananya Menon"
                  className="w-full bg-[#FAF7F2] border border-[#D8CDBD] p-2.5 text-[#17140F] focus:outline-none focus:border-[#063B2B]"
                />
              </div>

              <div>
                <label className="block text-[#786851] uppercase tracking-wider mb-1">
                  Phone (For Insured OTP Delivery)
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#FAF7F2] border border-[#D8CDBD] p-2.5 text-[#17140F] focus:outline-none focus:border-[#063B2B]"
                />
              </div>

              <div>
                <label className="block text-[#786851] uppercase tracking-wider mb-1">
                  Shipping Address & City
                </label>
                <textarea
                  rows={2}
                  required
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  placeholder="Street, Landmark, City & Pin code"
                  className="w-full bg-[#FAF7F2] border border-[#D8CDBD] p-2.5 text-[#17140F] focus:outline-none focus:border-[#063B2B]"
                />
              </div>

              <div>
                <label className="block text-[#786851] uppercase tracking-wider mb-1.5">
                  Payment Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('prepaid')}
                    className={`p-2.5 text-center transition-all ${
                      paymentMethod === 'prepaid'
                        ? 'bg-[#063B2B] text-[#FAF7F2] font-semibold'
                        : 'bg-[#F5EFE4] text-[#17140F]'
                    }`}
                  >
                    UPI / Card / NetBanking
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 text-center transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-[#063B2B] text-[#FAF7F2] font-semibold'
                        : 'bg-[#F5EFE4] text-[#17140F]'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="flex-1 py-3 border border-[#D8CDBD] text-[#786851] uppercase tracking-wider hover:bg-[#F5EFE4]"
                >
                  Back to Bag
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#063B2B] text-[#FAF7F2] uppercase tracking-[0.16em] font-semibold hover:bg-[#04291E]"
                >
                  Place Order
                </button>
              </div>
            </form>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <ShoppingBag size={32} className="mx-auto text-[#D8CDBD]" />
              <p className="font-serif text-lg text-[#17140F]">Your Bag is Empty</p>
              <p className="text-xs text-[#786851] font-sans">
                Explore our everyday 9-karat gold silhouettes to begin.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${idx}`}
                  className="flex gap-4 p-3 bg-[#F5EFE4] border border-[#D8CDBD]/40"
                >
                  <div className="w-18 h-22 bg-[#FAF7F2] flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-serif text-sm font-medium text-[#17140F] leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(idx)}
                          className="text-[#786851] hover:text-[#063B2B] p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#786851] font-sans mt-0.5">
                        <span>9K Gold ({item.product.weight})</span>
                        {item.selectedSize && (
                          <>
                            <span className="mx-1">·</span>
                            <span>Size: {item.selectedSize}</span>
                          </>
                        )}
                        {item.personalisationText && (
                          <div className="text-[#063B2B] font-medium text-[10px] mt-0.5">
                            Engraving: “{item.personalisationText}”
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D8CDBD]/30">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-[#D8CDBD] bg-[#FAF7F2]">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="px-2 py-1 text-[#786851] hover:text-[#063B2B]"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="px-2 text-xs font-sans font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-2 py-1 text-[#786851] hover:text-[#063B2B]"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <span className="font-sans font-semibold text-sm text-[#17140F] tabular-nums">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Complimentary Gift Wrapping & Card Option */}
              <div className="pt-2 border-t border-[#D8CDBD]/50">
                <button
                  onClick={() => setIncludeGiftNote(!includeGiftNote)}
                  className="flex items-center justify-between w-full text-xs font-sans text-[#063B2B] py-1.5"
                >
                  <span className="flex items-center gap-1.5 font-medium">
                    <Gift size={13} />
                    <span>Complimentary Gift Packaging & Note</span>
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-[#786851]">
                    {includeGiftNote ? 'Remove' : '+ Add Note'}
                  </span>
                </button>

                {includeGiftNote && (
                  <div className="mt-2 animate-in fade-in duration-200">
                    <textarea
                      rows={2}
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="Write your handwritten note for the recipient..."
                      className="w-full bg-[#FAF7F2] border border-[#D8CDBD] p-2 text-xs text-[#17140F] focus:outline-none focus:border-[#063B2B]"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Subtotal & Action */}
        {!orderConfirmed && items.length > 0 && !isCheckingOut && (
          <div className="p-5 border-t border-[#D8CDBD]/60 bg-[#FAF7F2] space-y-3">
            <div className="flex justify-between items-baseline text-sm font-sans">
              <span className="text-[#786851] uppercase tracking-wider text-xs">Estimated Subtotal</span>
              <span className="font-semibold text-lg text-[#17140F] tabular-nums">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="text-[11px] text-[#786851] font-sans">
              Taxes calculated. Hand-delivered in signature emerald keepsake case.
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-4 bg-[#063B2B] text-[#FAF7F2] text-xs tracking-[0.22em] uppercase font-sans font-semibold hover:bg-[#04291E] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={14} className="text-[#C9A45C]" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
