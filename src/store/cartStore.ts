import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductVariant } from '@/types';

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  promoCode: string;
  discountPercentage: number;
  quickViewProduct: Product | null;
  isCheckoutOpen: boolean;
  isB2BModalOpen: boolean;
  toastMessage: string | null;

  // Actions
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  setQuickViewProduct: (product: Product | null) => void;
  setCheckoutOpen: (open: boolean) => void;
  setB2BModalOpen: (open: boolean) => void;
  showToast: (msg: string) => void;
  hideToast: () => void;

  // Computed helpers
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getTaxAmount: () => number;
  getGrandTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      promoCode: '',
      discountPercentage: 0,
      quickViewProduct: null,
      isCheckoutOpen: false,
      isB2BModalOpen: false,
      toastMessage: null,

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      addItem: (product, variant, quantity = 1) => {
        const selectedVariant = variant || product.variants[0];
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex(
          (item) => item.product.id === product.id && item.selectedVariant.id === selectedVariant.id
        );

        let updatedItems: CartItem[];
        if (existingIndex > -1) {
          updatedItems = currentItems.map((item, idx) =>
            idx === existingIndex
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          updatedItems = [...currentItems, { product, selectedVariant, quantity }];
        }

        set({ items: updatedItems, isCartOpen: true });
        get().showToast(`Added ${product.title} (${selectedVariant.name}) to cart!`);
      },

      removeItem: (productId, variantId) => {
        const updated = get().items.filter(
          (item) => !(item.product.id === productId && item.selectedVariant.id === variantId)
        );
        set({ items: updated });
        get().showToast('Item removed from cart.');
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        const updated = get().items.map((item) =>
          item.product.id === productId && item.selectedVariant.id === variantId
            ? { ...item, quantity }
            : item
        );
        set({ items: updated });
      },

      clearCart: () => set({ items: [], promoCode: '', discountPercentage: 0 }),

      applyPromoCode: (code: string) => {
        const clean = code.trim().toUpperCase();
        if (clean === 'ECO10') {
          set({ promoCode: 'ECO10', discountPercentage: 10 });
          get().showToast('Promo code applied: 10% OFF your eco essentials!');
          return true;
        } else if (clean === 'CLINIC20' || clean === 'DOCTOR20') {
          set({ promoCode: clean, discountPercentage: 20 });
          get().showToast('Clinic partner code applied: 20% OFF!');
          return true;
        } else if (clean === 'FREESHIP') {
          set({ promoCode: 'FREESHIP', discountPercentage: 5 });
          get().showToast('Code applied: Extra $5 discount!');
          return true;
        }
        get().showToast('Invalid promo code. Try "ECO10" or "CLINIC20".');
        return false;
      },

      removePromoCode: () => set({ promoCode: '', discountPercentage: 0 }),

      setQuickViewProduct: (product) => set({ quickViewProduct: product }),
      setCheckoutOpen: (open) => set({ isCheckoutOpen: open }),
      setB2BModalOpen: (open) => set({ isB2BModalOpen: open }),

      showToast: (msg: string) => {
        set({ toastMessage: msg });
        setTimeout(() => {
          if (get().toastMessage === msg) {
            set({ toastMessage: null });
          }
        }, 3500);
      },

      hideToast: () => set({ toastMessage: null }),

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (acc, item) => acc + item.selectedVariant.price * item.quantity,
          0
        );
      },

      getDiscountAmount: () => {
        const subtotal = get().getSubtotal();
        const percent = get().discountPercentage;
        return (subtotal * percent) / 100;
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= 50) return 0;
        return 4.99;
      },

      getTaxAmount: () => {
        const taxable = get().getSubtotal() - get().getDiscountAmount();
        return taxable > 0 ? Number((taxable * 0.05).toFixed(2)) : 0;
      },

      getGrandTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingFee();
        const tax = get().getTaxAmount();
        return Math.max(0, Number((subtotal - discount + shipping + tax).toFixed(2)));
      }
    }),
    {
      name: 'ecocare-cart-v1',
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        discountPercentage: state.discountPercentage
      })
    }
  )
);
