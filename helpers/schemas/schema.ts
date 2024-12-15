import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  price: z.coerce.number(),
  inventory: z.number(),
  categoryId: z.number(),
  
});

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const CategoriesResponseSchema = z.array(CategorySchema);
export const CategoryWithProductsResponseSchema = CategorySchema.extend({
  products: z.array(ProductSchema),
});

/* Shopping Cart */
const ShoppingCartItemSchema = ProductSchema.pick({ name: true, image: true, price: true, inventory: true }).extend({
  productId: z.number(),
  quantity: z.number(),
})
export const ShoppingCartSchema = z.array(ShoppingCartItemSchema);

export const CouponResponseSchema = z.object({
  name: z.string().default(''),
  message: z.string().default(''),
  percentage: z.coerce.number().min(0).max(100).default(0),
})


export type Product = z.infer<typeof ProductSchema>;
export type ShoppingCart = z.infer<typeof ShoppingCartSchema>;
export type CartItem = z.infer<typeof ShoppingCartItemSchema>;
export type Coupon = z.infer<typeof CouponResponseSchema>;