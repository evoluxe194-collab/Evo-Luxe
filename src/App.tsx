import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandIntro } from './components/BrandIntro';
import { CategorySection } from './components/CategorySection';
import { BestsellersSection } from './components/BestsellersSection';
import { OccasionSection } from './components/OccasionSection';
import { FeaturedCollections } from './components/FeaturedCollections';
import { WhyNineKarat } from './components/WhyNineKarat';
import { NinePromiseAndEvoluxe } from './components/NinePromiseAndEvoluxe';
import { GiftingAndPersonalisation } from './components/GiftingAndPersonalisation';
import { SocialSection } from './components/SocialSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CatalogView } from './components/CatalogView';
import { PolicyModal } from './components/PolicyModal';
import { AccountDrawer } from './components/AccountDrawer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { useAuth } from './firebase/context';
import { getNotificationsWithOrders, AppNotification } from './data/notifications';

export default function App() {
  const { user, userOrders = [], syncWishlistToFirestore, syncCartToFirestore } = useAuth();

  // Navigation & View States
  const [viewMode, setViewMode] = useState<'home' | 'catalog'>('home');
  const [catalogCategory, setCatalogCategory] = useState<string>('All');
  const [catalogOccasion, setCatalogOccasion] = useState<string>('All');
  const [catalogCollection, setCatalogCollection] = useState<string>('All');

  // Interactive Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<string | null>(null);
  const [trackedOrderCode, setTrackedOrderCode] = useState<string | null>(null);

  // Notification Center Persistence
  const [readNotifIds, setReadNotifIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nine_read_notifs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [dismissedNotifIds, setDismissedNotifIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nine_dismissed_notifs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const notifications = useMemo(() => {
    return getNotificationsWithOrders(userOrders, readNotifIds, dismissedNotifIds);
  }, [userOrders, readNotifIds, dismissedNotifIds]);

  const hasUnreadNotifications = notifications.some((n) => !n.read);

  const handleMarkNotificationRead = (id: string) => {
    setReadNotifIds((prev) => {
      const updated = prev.includes(id) ? prev : [...prev, id];
      try {
        localStorage.setItem('nine_read_notifs', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleMarkAllNotificationsRead = () => {
    const allIds = notifications.map((n) => n.id);
    setReadNotifIds(allIds);
    try {
      localStorage.setItem('nine_read_notifs', JSON.stringify(allIds));
    } catch {}
  };

  const handleDismissNotification = (id: string) => {
    setDismissedNotifIds((prev) => {
      const updated = [...prev, id];
      try {
        localStorage.setItem('nine_dismissed_notifs', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // E-Commerce Data States
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // Solstice Bevelled 9K Band
      quantity: 1,
      selectedSize: '12',
    }
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[1].id]);

  // Cart item count calculation
  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Smooth scroll to sections
  const handleNavigateSection = (sectionId: string) => {
    if (viewMode !== 'home') {
      setViewMode('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open catalog filtered by category
  const handleOpenCategory = (categoryName: string) => {
    setCatalogCategory(categoryName);
    setCatalogOccasion('All');
    setCatalogCollection('All');
    setViewMode('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open catalog filtered by occasion
  const handleOpenOccasion = (occasionName: string) => {
    setCatalogCategory('All');
    setCatalogOccasion(occasionName);
    setCatalogCollection('All');
    setViewMode('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open catalog filtered by collection
  const handleOpenCollection = (collectionTitle: string) => {
    setCatalogCategory('All');
    setCatalogOccasion('All');
    setCatalogCollection(collectionTitle);
    setViewMode('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Product Selection & Quick View
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  // Add to Bag handler
  const handleAddToCart = (product: Product, size?: string, engraving?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        if (engraving) updated[existingIndex].personalisationText = engraving;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedSize: size || (product.sizes ? product.sizes[0] : undefined),
          personalisationText: engraving,
        }
      ];
    });
    setIsCartOpen(true);
  };

  // Buy Now immediate checkout flow
  const handleBuyNow = (product: Product, size?: string, engraving?: string) => {
    handleAddToCart(product, size, engraving);
    setIsProductModalOpen(false);
    setIsCartOpen(true);
  };

  // Cart item management
  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Sync wishlist and cart to Firestore when authenticated
  useEffect(() => {
    if (user && wishlistIds.length > 0) {
      syncWishlistToFirestore(wishlistIds);
    }
  }, [user, wishlistIds]);

  useEffect(() => {
    if (user && cartItems.length > 0) {
      syncCartToFirestore(cartItems);
    }
  }, [user, cartItems]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#17140F] flex flex-col font-sans selection:bg-[#063B2B] selection:text-[#FAF7F2]">
      
      {/* 5. Header: Strict 3-zone contract with mobile drawer */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        userAvatar={user?.photoURL}
        userName={user?.displayName}
        hasUnreadNotifications={hasUnreadNotifications}
        onNavigateCategory={handleOpenCategory}
        onNavigateSection={handleNavigateSection}
        onOpenCatalog={() => {
          setCatalogCategory('All');
          setCatalogOccasion('All');
          setCatalogCollection('All');
          setViewMode('catalog');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main View Router: Homepage Flow vs Complete Catalog View */}
      {viewMode === 'catalog' ? (
        <main className="flex-1">
          <CatalogView
            products={PRODUCTS}
            initialCategory={catalogCategory}
            initialOccasion={catalogOccasion}
            initialCollection={catalogCollection}
            onClose={() => setViewMode('home')}
            onSelectProduct={handleSelectProduct}
            onQuickView={handleSelectProduct}
            onAddToCart={(prod) => handleAddToCart(prod)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        </main>
      ) : (
        <main className="flex-1">
          {/* 6. Cinematic Hero Section */}
          <Hero
            onShopClick={() => handleNavigateSection('bestsellers')}
            onExploreCollections={() => handleNavigateSection('collections')}
          />

          {/* 7. Brand Introduction: MEET NINE */}
          <BrandIntro
            onDiscoverClick={() => handleNavigateSection('why-nine')}
          />

          {/* 8. Shop by Category: DISCOVER YOUR NINE */}
          <CategorySection
            onSelectCategory={handleOpenCategory}
            onExploreAll={() => {
              setCatalogCategory('All');
              setViewMode('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* 11. Bestsellers: THE NINE EDIT */}
          <BestsellersSection
            products={PRODUCTS}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onQuickView={handleSelectProduct}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(prod) => handleAddToCart(prod)}
            onViewAll={() => {
              setCatalogCategory('All');
              setViewMode('catalog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* 9. Shop by Occasion: JEWELLERY FOR EVERY MOMENT */}
          <OccasionSection
            onSelectOccasion={handleOpenOccasion}
          />

          {/* 10. Featured Collections */}
          <FeaturedCollections
            onSelectCollection={handleOpenCollection}
          />

          {/* 12. Why 9 Karat? (Educational & Luxurious Story) */}
          <WhyNineKarat />

          {/* 13 & 14. The NINE Promise & Backed by EVOLUXE */}
          <NinePromiseAndEvoluxe
            onLearnMoreEvoluxe={() => setActivePolicy('Contact Us')}
          />

          {/* 15 & 16. Gifting & Personalisation */}
          <GiftingAndPersonalisation
            onShopGifts={(occasion) => handleOpenOccasion('Gifting')}
            onSelectPersonalisedProduct={() => {
              const engravable = PRODUCTS.find((p) => p.canPersonalise);
              if (engravable) handleSelectProduct(engravable);
            }}
          />

          {/* 17 & 18. Social Proof & Instagram: WORN BY YOU */}
          <SocialSection
            onSelectProduct={handleSelectProduct}
          />
        </main>
      )}

      {/* 20 & 19. Luxury Footer with Newsletter, Business Address, Phones, Legal Links */}
      <Footer
        onNavigateSection={handleNavigateSection}
        onOpenCategory={handleOpenCategory}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
      />

      {/* 21. Product Detail Modal / Quick View */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onSelectProduct={(pairedProd) => {
          setSelectedProduct(pairedProd);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Slide-out Cart Drawer with Free Shipping Meter & Checkout Simulator */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={PRODUCTS}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(prod) => handleAddToCart(prod)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Intelligent Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Client Account & Order History Drawer with Order Tracking, Buy Again, Wishlist Summary & Notification Center */}
      <AccountDrawer
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onTrackOrder={(code) => {
          setTrackedOrderCode(code);
          setActivePolicy('Track Order');
        }}
        onAddToCart={handleAddToCart}
        onOpenCart={() => {
          setIsAccountOpen(false);
          setIsCartOpen(true);
        }}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onSelectProduct={(p) => {
          setIsAccountOpen(false);
          handleSelectProduct(p);
        }}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onDismissNotification={handleDismissNotification}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Client Care & Legal Policy Modal with Order Tracking Integration */}
      <PolicyModal
        policyName={activePolicy}
        isOpen={Boolean(activePolicy)}
        onClose={() => {
          setActivePolicy(null);
          setTrackedOrderCode(null);
        }}
        trackedOrderCode={trackedOrderCode}
        onSelectPolicy={(policy) => setActivePolicy(policy)}
      />

      {/* Floating WhatsApp Customer Service Concierge */}
      <WhatsAppButton />

    </div>
  );
}
