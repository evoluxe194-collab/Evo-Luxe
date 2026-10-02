import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { auth, googleProvider, db, handleFirestoreError, OperationType } from './config';
import { CartItem, Product } from '../types';
import { PRODUCTS } from '../data/products';

export interface OrderRecord {
  id: string;
  orderCode: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: string;
  subtotal: number;
  items: string;
  paymentMethod: 'prepaid' | 'cod';
  status: 'confirmed' | 'preparing' | 'dispatched' | 'delivered';
  createdAt: string;
}

export interface UserPreferences {
  preferredRingSize: string;
  preferredMetalTone: '9K Gold' | '9K Rose Gold';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  syncWishlistToFirestore: (wishlistIds: string[]) => Promise<void>;
  syncCartToFirestore: (cartItems: CartItem[]) => Promise<void>;
  createOrderInFirestore: (orderData: {
    customerName: string;
    customerPhone: string;
    shippingAddress: string;
    subtotal: number;
    items: CartItem[];
    paymentMethod: 'prepaid' | 'cod';
  }) => Promise<string>;
  userOrders: OrderRecord[];
  userPreferences: UserPreferences;
  updateUserPreferences: (prefs: Partial<UserPreferences>) => Promise<void>;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  preferredRingSize: '14',
  preferredMetalTone: '9K Gold',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userOrders, setUserOrders] = useState<OrderRecord[]>([]);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('nine_user_preferences');
      if (saved) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
      }
    } catch {}
    return DEFAULT_PREFERENCES;
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Ensure user document exists in /users/{userId}
        const userRef = doc(db, 'users', currentUser.uid);
        try {
          const userDoc = await getDoc(userRef);
          if (!userDoc.exists()) {
            await setDoc(userRef, {
              uid: currentUser.uid,
              displayName: currentUser.displayName || 'NINE Collector',
              email: currentUser.email || '',
              photoURL: currentUser.photoURL || '',
              preferredRingSize: userPreferences.preferredRingSize,
              preferredMetalTone: userPreferences.preferredMetalTone,
              createdAt: new Date().toISOString(),
            });
          } else {
            const data = userDoc.data();
            if (data?.preferredRingSize || data?.preferredMetalTone) {
              const loadedPrefs: UserPreferences = {
                preferredRingSize: data.preferredRingSize || userPreferences.preferredRingSize,
                preferredMetalTone: data.preferredMetalTone || userPreferences.preferredMetalTone,
              };
              setUserPreferences(loadedPrefs);
              try {
                localStorage.setItem('nine_user_preferences', JSON.stringify(loadedPrefs));
              } catch {}
            }
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.WRITE, `users/${currentUser.uid}`);
        }

        // Listen for orders
        const ordersQuery = query(
          collection(db, 'orders'),
          where('userId', '==', currentUser.uid)
        );

        const ordersUnsub = onSnapshot(
          ordersQuery,
          (snapshot) => {
            const orders: OrderRecord[] = [];
            snapshot.forEach((docSnap) => {
              const d = docSnap.data();
              orders.push({
                id: docSnap.id,
                orderCode: d.orderCode,
                customerName: d.customerName,
                customerPhone: d.customerPhone,
                shippingAddress: d.shippingAddress,
                subtotal: d.subtotal,
                items: d.items,
                paymentMethod: d.paymentMethod,
                status: d.status,
                createdAt: d.createdAt,
              });
            });
            setUserOrders(orders);
          },
          (error) => {
            handleFirestoreError(error, OperationType.GET, 'orders');
          }
        );

        return () => ordersUnsub();
      } else {
        setUserOrders([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const syncWishlistToFirestore = async (wishlistIds: string[]) => {
    if (!user) return;
    const path = `users/${user.uid}/wishlist`;
    try {
      for (const id of wishlistIds) {
        const itemRef = doc(db, 'users', user.uid, 'wishlist', id);
        await setDoc(itemRef, {
          productId: id,
          addedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const syncCartToFirestore = async (cartItems: CartItem[]) => {
    if (!user) return;
    const path = `users/${user.uid}/cart`;
    try {
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        const itemRef = doc(db, 'users', user.uid, 'cart', `item_${i}`);
        await setDoc(itemRef, {
          productId: item.product.id,
          quantity: item.quantity,
          selectedSize: item.selectedSize || '',
          personalisationText: item.personalisationText || '',
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const createOrderInFirestore = async (orderData: {
    customerName: string;
    customerPhone: string;
    shippingAddress: string;
    subtotal: number;
    items: CartItem[];
    paymentMethod: 'prepaid' | 'cod';
  }): Promise<string> => {
    const orderId = `order_${Date.now()}`;
    const orderCode = `NINE-${Math.floor(100000 + Math.random() * 900000)}`;
    const path = `orders/${orderId}`;

    const structuredItems = orderData.items.map((i) => ({
      productId: i.product.id,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
      size: i.selectedSize || '',
      personalisationText: i.personalisationText || '',
      image: i.product.images[0] || '',
    }));

    const payload = {
      orderCode,
      userId: user?.uid || 'guest_user',
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      shippingAddress: orderData.shippingAddress,
      subtotal: orderData.subtotal,
      items: JSON.stringify(structuredItems).slice(0, 3000),
      paymentMethod: orderData.paymentMethod,
      status: 'confirmed' as const,
      createdAt: new Date().toISOString(),
    };

    if (user) {
      try {
        await setDoc(doc(db, 'orders', orderId), payload);
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    }

    return orderCode;
  };

  const updateUserPreferences = async (newPrefs: Partial<UserPreferences>) => {
    const updated: UserPreferences = {
      ...userPreferences,
      ...newPrefs,
    };
    setUserPreferences(updated);
    try {
      localStorage.setItem('nine_user_preferences', JSON.stringify(updated));
    } catch {}

    if (user) {
      const userRef = doc(db, 'users', user.uid);
      try {
        await setDoc(
          userRef,
          {
            preferredRingSize: updated.preferredRingSize,
            preferredMetalTone: updated.preferredMetalTone,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        logout,
        syncWishlistToFirestore,
        syncCartToFirestore,
        createOrderInFirestore,
        userOrders,
        userPreferences,
        updateUserPreferences,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
