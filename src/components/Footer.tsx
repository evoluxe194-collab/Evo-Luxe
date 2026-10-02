import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { ArrowRight, Check, MapPin, Phone, Instagram, ShieldCheck, Mail, MessageCircle } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenCategory: (category: string) => void;
  onOpenPolicy: (policyName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onOpenCategory,
  onOpenPolicy,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="w-full bg-[#04291E] text-[#FAF7F2] relative border-t border-[#063B2B]">
      
      {/* 19. Luxury Newsletter Section */}
      <div className="w-full bg-[#063B2B] py-16 px-4 sm:px-6 lg:px-8 border-b border-[#FAF7F2]/10 text-center">
        <div className="max-w-xl mx-auto">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#C9A45C] font-sans font-semibold mb-2">
            PRIVATE INVITATION
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF7F2] font-medium tracking-tight mb-3">
            WELCOME TO THE WORLD OF NINE.
          </h3>
          <p className="text-xs sm:text-sm text-[#D8CDBD] font-sans leading-relaxed mb-6">
            Be the first to discover new collections, private edits and stories from NINE by EVOLUXE.
          </p>

          {subscribed ? (
            <div className="p-3.5 bg-[#04291E] text-[#C9A45C] text-xs font-sans tracking-wider uppercase flex items-center justify-center gap-2 border border-[#C9A45C]/30 animate-in fade-in duration-300">
              <Check size={16} />
              <span>Thank you for joining NINE. Welcome to everyday luxury.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row max-w-md mx-auto gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-[#04291E] border border-[#FAF7F2]/20 px-4 py-3 text-xs text-[#FAF7F2] placeholder-[#D8CDBD]/50 font-sans focus:outline-none focus:border-[#C9A45C]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C9A45C] text-[#17140F] text-xs tracking-[0.2em] uppercase font-sans font-semibold hover:bg-[#DFBF7A] transition-colors cursor-pointer"
              >
                JOIN NINE
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Links & Business Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Brand Lockup & Parent Company Header in Footer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-12 mb-12 border-b border-[#FAF7F2]/10 gap-6">
          <div>
            <BrandLogo variant="light" size="lg" showStar={true} />
            <p className="text-xs text-[#D8CDBD]/80 font-sans tracking-wide mt-3 max-w-sm">
              An Exclusive 9 Karat Lifestyle Jewellery house from EVOLUXE.
            </p>
          </div>

          <div className="text-left md:text-right text-xs text-[#D8CDBD] font-sans space-y-1">
            <div className="text-[#C9A45C] font-semibold uppercase tracking-wider">
              Mother Company
            </div>
            <div className="font-medium text-[#FAF7F2]">EVOLUXE Gold Exchange & Bullion Store</div>
            <div>Thrissur, Kerala — 680681</div>
          </div>
        </div>

        {/* 5-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-10 text-xs font-sans">
          
          {/* Col 1: Shop */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#C9A45C] font-semibold mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-[#D8CDBD]/80">
              <li>
                <button onClick={() => onNavigateSection('bestsellers')} className="hover:text-[#FAF7F2] transition-colors">
                  Bestsellers
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCategory('Rings')} className="hover:text-[#FAF7F2] transition-colors">
                  Rings
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCategory('Earrings')} className="hover:text-[#FAF7F2] transition-colors">
                  Earrings
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCategory('Necklaces')} className="hover:text-[#FAF7F2] transition-colors">
                  Necklaces
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCategory('Pendants')} className="hover:text-[#FAF7F2] transition-colors">
                  Pendants
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCategory('Bracelets')} className="hover:text-[#FAF7F2] transition-colors">
                  Bracelets
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCategory('Bangles')} className="hover:text-[#FAF7F2] transition-colors">
                  Bangles
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCategory('Men')} className="hover:text-[#FAF7F2] transition-colors">
                  Men's Edit
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Discover */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#C9A45C] font-semibold mb-4">
              DISCOVER
            </h4>
            <ul className="space-y-2.5 text-[#D8CDBD]/80">
              <li>
                <button onClick={() => onNavigateSection('about-nine')} className="hover:text-[#FAF7F2] transition-colors">
                  About NINE
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('why-nine')} className="hover:text-[#FAF7F2] transition-colors">
                  Why 9K Gold?
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('collections')} className="hover:text-[#FAF7F2] transition-colors">
                  Featured Collections
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('occasions')} className="hover:text-[#FAF7F2] transition-colors">
                  Shop by Occasion
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('gifting')} className="hover:text-[#FAF7F2] transition-colors">
                  Gifting & Keepsake Box
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('gifting')} className="hover:text-[#FAF7F2] transition-colors">
                  Custom Laser Personalisation
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Help & Client Care */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#C9A45C] font-semibold mb-4">
              CLIENT CARE
            </h4>
            <ul className="space-y-2.5 text-[#D8CDBD]/80">
              <li>
                <button onClick={() => onOpenPolicy('Contact Us')} className="hover:text-[#FAF7F2] transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('Insured Shipping')} className="hover:text-[#FAF7F2] transition-colors">
                  Complimentary Shipping
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('Returns & Exchange')} className="hover:text-[#FAF7F2] transition-colors">
                  Returns & Exchange
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('Hallmarking & Purity')} className="hover:text-[#FAF7F2] transition-colors">
                  Purity & Hallmarking
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('Daily Care Guide')} className="hover:text-[#FAF7F2] transition-colors">
                  Gold Care Guide
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('Track Order')} className="hover:text-[#FAF7F2] transition-colors">
                  Track Order
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: EVOLUXE Connection & Store */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#C9A45C] font-semibold mb-4">
              EVOLUXE
            </h4>
            <div className="space-y-2 text-[#D8CDBD]/80 leading-relaxed">
              <p className="text-[#FAF7F2] font-medium">Gold Exchange & Bullion Store</p>
              <p>Flat No: XI/814B, NH-Moonupedika</p>
              <p>Kaipamangalam, Thrissur</p>
              <p>Kerala – 680681, India</p>
              <div className="pt-2 text-[#FAF7F2] font-mono tabular-nums space-y-1">
                <div>Tel: +91 907 265 5200</div>
                <a
                  href="https://wa.me/919072656000?text=Hello%20NINE%20by%20EVOLUXE%2C%20I%20would%20like%20customer%20service%20assistance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#C9A45C] hover:text-[#FAF7F2] transition-colors"
                >
                  <MessageCircle size={13} className="text-[#25D366]" />
                  <span>WhatsApp: +91 9072656000</span>
                </a>
              </div>
            </div>
          </div>

          {/* Col 5: Social & Digital */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#C9A45C] font-semibold mb-4">
              SOCIAL & CARE
            </h4>
            <ul className="space-y-2.5 text-[#D8CDBD]/80">
              <li>
                <a
                  href="https://wa.me/919072656000?text=Hello%20NINE%20by%20EVOLUXE%2C%20I%20would%20like%20customer%20service%20assistance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#C9A45C] hover:text-[#FAF7F2] transition-colors font-medium"
                >
                  <MessageCircle size={14} className="text-[#25D366]" />
                  <span>WhatsApp Customer Care</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/the_evoluxe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#FAF7F2] transition-colors"
                >
                  <Instagram size={14} />
                  <span>@the_evoluxe</span>
                </a>
              </li>
              <li>
                <span className="text-[#D8CDBD]/60">Instagram Stories</span>
              </li>
              <li>
                <span className="text-[#D8CDBD]/60">Facebook</span>
              </li>
              <li>
                <span className="text-[#D8CDBD]/60">YouTube</span>
              </li>
            </ul>

            <div className="mt-6 p-3 bg-[#063B2B] border border-[#C9A45C]/20 text-[10px] text-[#D8CDBD] leading-tight">
              Official 375 BIS Assayed & Hallmarked Gold Partner.
            </div>
          </div>

        </div>

        {/* Bottom Legal Copyright & Policies */}
        <div className="mt-16 pt-8 border-t border-[#FAF7F2]/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#D8CDBD]/60 font-sans gap-4">
          <div>
            © {new Date().getFullYear()} NINE by EVOLUXE. All rights reserved.
          </div>
          
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button onClick={() => onOpenPolicy('Privacy Policy')} className="hover:text-[#FAF7F2] transition-colors">
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onOpenPolicy('Terms of Service')} className="hover:text-[#FAF7F2] transition-colors">
              Terms & Conditions
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onOpenPolicy('Refund Policy')} className="hover:text-[#FAF7F2] transition-colors">
              Refund Policy
            </button>
            <span aria-hidden="true">·</span>
            <button onClick={() => onOpenPolicy('Shipping Policy')} className="hover:text-[#FAF7F2] transition-colors">
              Shipping Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
