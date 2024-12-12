import { formatCurrency } from "../..";
import { Product } from "../../schemas/schema";
import Image from "next/image";
import AddProductButton from "./addProductButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded bg-white shadow  p-3 ">
      <div>
        <Image
          src={`${process.env.API_URL}/img/${product.image}`}
          alt={`Product: ${product.image}`}
          width={400}
          height={600}
          priority
        />
        <div className="p-3 space-y-2">
          <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
          <p className="text-gray-500">Stock: {product.inventory}</p>
          <p className="text-2xl font-extrabold  text-gray-900">
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>

      <AddProductButton product={product} /> 
    </div>
  );
}
