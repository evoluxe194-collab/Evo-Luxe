import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '919072656000';
  const formattedNumber = '+91 9072656000';
  const defaultMessage = encodeURIComponent(
    'Hello NINE by EVOLUXE Customer Service, I would like assistance with 9K fine jewellery.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside aria-label="Customer support" className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      {/* Expanded Hover/Tap Pill */}
      {showTooltip && (
        <div className="bg-[#FAF7F2] text-[#17140F] border border-[#D8CDBD] shadow-xl px-3.5 py-2 rounded-xs flex items-center gap-2 animate-in fade-in slide-in-from-right-2 duration-200">
          <div className="text-left">
            <p className="text-[10px] font-sans uppercase tracking-wider text-[#063B2B] font-bold">
              Customer Service
            </p>
            <p className="text-xs font-mono font-semibold text-[#17140F]">
              {formattedNumber}
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-[#786851] hover:text-[#17140F] p-0.5 ml-1 cursor-pointer"
            aria-label="Close tooltip"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-13 h-13 rounded-full bg-[#063B2B] text-[#FAF7F2] hover:bg-[#04291E] border border-[#C9A45C]/60 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C]"
        aria-label={`Chat with customer service on WhatsApp at ${formattedNumber}`}
        title={`WhatsApp Customer Service: ${formattedNumber}`}
      >
        <div className="relative">
          <MessageCircle size={24} className="text-[#25D366] group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-[#063B2B] animate-pulse" />
        </div>
      </a>
    </aside>
  );
};
