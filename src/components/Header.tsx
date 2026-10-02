import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, User } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onNavigateCategory: (category: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenCatalog: () => void;
  userAvatar?: string | null;
  userName?: string | null;
  hasUnreadNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onNavigateCategory,
  onNavigateSection,
  onOpenCatalog,
  userAvatar,
  userName,
  hasUnreadNotifications = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#063B2B] text-[#FAF7F2] text-[11px] sm:text-xs tracking-[0.2em] uppercase py-2 px-4 text-center border-b border-[#04291E] flex items-center justify-center font-sans font-medium overflow-hidden">
        <span className="truncate">
          WELCOME TO NINE BY EVOLUXE — 9 KARAT LIFESTYLE JEWELLERY
        </span>
        <span className="hidden md:inline mx-3 text-[#C9A45C]" aria-hidden="true">·</span>
        <span className="hidden md:inline text-[#FAF7F2]/80">
          COMPLIMENTARY INSURED SHIPPING ACROSS INDIA
        </span>
      </div>

      {/* Main Top Bar: Strict 3-Zone Contract */}
      <div
        className={`w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#D8CDBD]/40 transition-all duration-300 ${
          isScrolled ? 'py-2.5 shadow-sm' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#063B2B] hover:text-[#C9A45C] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#063B2B]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Zone 1: Brand Wordmark Hero Identity */}
          <div className="flex items-center">
            <BrandLogo
              variant="dark"
              size={isScrolled ? 'sm' : 'md'}
              onClick={() => handleNavClick('hero')}
              showStar={true}
            />
          </div>

          {/* Zone 2: 5-6 Clean Text Navigation Links (Single-Line, No Pills) */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-[0.16em] uppercase font-sans font-medium text-[#17140F]/85">
            <button
              onClick={onOpenCatalog}
              className="hover:text-[#063B2B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A45C] hover:after:w-full after:transition-all after:duration-300"
            >
              Shop All
            </button>
            <button
              onClick={() => handleNavClick('bestsellers')}
              className="hover:text-[#063B2B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A45C] hover:after:w-full after:transition-all after:duration-300"
            >
              Bestsellers
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="hover:text-[#063B2B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A45C] hover:after:w-full after:transition-all after:duration-300"
            >
              Categories
            </button>
            <button
              onClick={() => handleNavClick('occasions')}
              className="hover:text-[#063B2B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A45C] hover:after:w-full after:transition-all after:duration-300"
            >
              Occasions
            </button>
            <button
              onClick={() => handleNavClick('collections')}
              className="hover:text-[#063B2B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A45C] hover:after:w-full after:transition-all after:duration-300"
            >
              Collections
            </button>
            <button
              onClick={() => handleNavClick('why-nine')}
              className="hover:text-[#063B2B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A45C] hover:after:w-full after:transition-all after:duration-300"
            >
              Why 9K
            </button>
            <button
              onClick={() => handleNavClick('about-nine')}
              className="hover:text-[#063B2B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A45C] hover:after:w-full after:transition-all after:duration-300"
            >
              About NINE
            </button>
          </nav>

          {/* Zone 3: Interactive Affordances (Search, Account, Wishlist, Bag) */}
          <div className="flex items-center space-x-2.5 sm:space-x-4">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 text-[#17140F] hover:text-[#063B2B] transition-colors rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-[#063B2B]"
              aria-label="Search jewellery"
            >
              <Search size={19} strokeWidth={1.75} />
            </button>

            {/* Account / Google Auth */}
            <button
              onClick={onOpenAccount}
              className="relative p-1.5 text-[#17140F] hover:text-[#063B2B] transition-colors rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-[#063B2B] flex items-center"
              aria-label="Client Account"
            >
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName || 'Account'}
                  className="w-5 h-5 rounded-full object-cover border border-[#C9A45C]"
                />
              ) : (
                <User size={19} strokeWidth={1.75} />
              )}
              {hasUnreadNotifications && (
                <span
                  className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C9A45C] ring-2 ring-[#FAF7F2] animate-pulse"
                  title="New account notifications"
                />
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              className="relative p-1.5 text-[#17140F] hover:text-[#063B2B] transition-colors rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-[#063B2B]"
              aria-label="Saved items wishlist"
            >
              <Heart size={19} strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#063B2B] text-[#FAF7F2] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans tabular-nums font-semibold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Bag */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center p-1.5 text-[#17140F] hover:text-[#063B2B] transition-colors rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-[#063B2B]"
              aria-label="Shopping bag"
            >
              <ShoppingBag size={19} strokeWidth={1.75} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A45C] text-[#17140F] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-sans tabular-nums font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#D8CDBD] px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-4 text-sm tracking-[0.14em] uppercase font-sans font-medium text-[#17140F]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAccount();
              }}
              className="text-left py-2 border-b border-[#D8CDBD]/30 text-[#063B2B] font-semibold flex items-center justify-between"
            >
              <span>Client Account & Orders</span>
              <User size={16} />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCatalog();
              }}
              className="text-left py-2 border-b border-[#D8CDBD]/30 hover:text-[#063B2B]"
            >
              Shop All Jewellery
            </button>
            <button
              onClick={() => handleNavClick('bestsellers')}
              className="text-left py-2 border-b border-[#D8CDBD]/30 hover:text-[#063B2B]"
            >
              The NINE Edit (Bestsellers)
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="text-left py-2 border-b border-[#D8CDBD]/30 hover:text-[#063B2B]"
            >
              Shop by Category
            </button>
            <button
              onClick={() => handleNavClick('occasions')}
              className="text-left py-2 border-b border-[#D8CDBD]/30 hover:text-[#063B2B]"
            >
              Shop by Occasion
            </button>
            <button
              onClick={() => handleNavClick('collections')}
              className="text-left py-2 border-b border-[#D8CDBD]/30 hover:text-[#063B2B]"
            >
              Featured Collections
            </button>
            <button
              onClick={() => handleNavClick('why-nine')}
              className="text-left py-2 border-b border-[#D8CDBD]/30 hover:text-[#063B2B]"
            >
              Why 9 Karat?
            </button>
            <button
              onClick={() => handleNavClick('gifting')}
              className="text-left py-2 border-b border-[#D8CDBD]/30 hover:text-[#063B2B]"
            >
              Gifting & Personalisation
            </button>
            <button
              onClick={() => handleNavClick('about-nine')}
              className="text-left py-2 hover:text-[#063B2B]"
            >
              About NINE & EVOLUXE
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-[#D8CDBD] flex items-center justify-between text-xs tracking-wider text-[#786851]">
            <span>Thrissur, Kerala</span>
            <a
              href="https://wa.me/919072656000?text=Hello%20NINE%20by%20EVOLUXE%2C%20I%20would%20like%20customer%20service%20assistance."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#063B2B] hover:text-[#C9A45C] font-semibold underline"
            >
              WhatsApp: +91 9072656000
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
