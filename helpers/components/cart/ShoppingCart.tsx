"use client";
import { useStore } from "../../store/store";
import Amount from "./Amount";
import ShoppingCartItem from "./ShoppingCartItem";

export default function ShoppingCart() {
  const contents = useStore((state) => state.contents);
  const total = useStore((state) => state.total);
  return (
    <>
      <h2 className="text-4xl font-bold text-indigo-800 ">Shopping Cart:</h2>
      {contents.length ? (
        <>
          <ul
            role="list"
            className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
          >
            {contents.map((item) => (
              <ShoppingCartItem key={item.productId} item={item} />
            ))}
          </ul>
          <dl>
            <Amount label="Total to Pay" amount={total} />
          </dl>

        </>

      ) : (
        <p className="m-5 text-gray-600">There's nothing over here</p>
      )}
    </>
  );
}
