"use client";

import { Product } from "../../schemas/schema";
import {useStore} from "../../store/store";

export default function AddProductButton({product}: {product: Product}) {

    const addToCart = useStore(state => state.addToCart);
  return (
    <button
      type="button"
      className="font-bold text-white bg-indigo-500 hover:bg-indigo-700 w-full py-2 border rounded-md transition-all"
        onClick={() => addToCart(product)}
    >
      Add to cart
    </button>
  );
}
