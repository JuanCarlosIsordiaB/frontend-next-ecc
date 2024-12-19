import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  Coupon,
  CouponResponseSchema,
  Product,
  ShoppingCart,
} from "../schemas/schema";

interface Store {
  total: number;
  contents: ShoppingCart;
  coupon: Coupon;
  addToCart: (product: Product) => void;
  updateQuantity: (id: Product["id"], quantity: number) => void;
  removeFromCart: (id: Product["id"]) => void;
  calculateTotal: () => void;
  applyCoupon: (couponName: string) => Promise<void>;
  applyDiscount: () => void;
}

export const useStore = create<Store>()(
  devtools((set, get) => ({
    contents: [],
    coupon: {
      percentage: 0,
      name: "",
      message: "",
    },
    addToCart: (product) => {
      const { id: productId, categoryId, ...data } = product;
      let contents: ShoppingCart = [];
      const duplicated = get().contents.findIndex(
        (item) => item.productId === productId
      );
      if (duplicated >= 0) {
        if (
          get().contents[duplicated].quantity >=
          get().contents[duplicated].inventory
        )
          return;
        contents = get().contents.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        contents = [
          ...get().contents,
          {
            ...data,
            quantity: 1,
            productId,
          },
        ];
      }

      set(() => ({ contents }));

      get().calculateTotal();
    },
    updateQuantity: (id, quantitys) => {
      const contents = get().contents.map((item) =>
        item.productId === id ? { ...item, quantity } : item
      );
      set(() => ({ contents }));
    },
    removeFromCart: (id) => {
      const contents = get().contents.filter((item) => item.productId !== id);
      set(() => ({ contents }));
    },
    calculateTotal: () => {
      const total = get().contents.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      set(() => ({ total }));
      if(get().coupon.percentage) {
        get().applyDiscount();
      }
    },
    applyCoupon: async (couponName: string) => {
      const req = await fetch("/coupons/api", {
        method: "POST",
        body: JSON.stringify({
          couponName,
        }),
      });
      const json = await req.json();
      const coupon = CouponResponseSchema.parse(json);
      set(() => ({ coupon }));
      if(coupon.percentage) {
        get().applyDiscount();
      }
    },
    applyDiscount: () => {
      const total = get().total - get().total * (get().coupon.percentage / 100);
      set(() => ({ total }));
    },
  }))
);
