import ProductCard from "../../../../helpers/components/ProductCard";
import {
  CategoryWithProductsResponseSchema,
  Product,
} from "../../../../helpers/schemas/schema";
import React from "react";

type Params = Promise<{ categoryId: string }>;

async function getProducts(categoryId: string) {
  const url = `${process.env.API_URL}/categories/${categoryId}?products=true`;

  const response = await fetch(url);
  const data = await response.json();
  //const products = CategoryWithProductsResponseSchema.parse(data);
  return data.products;
}

export default async function StorePage({ params }: { params: Params }) {
  const { categoryId } = await params;
  const category = await getProducts(categoryId);

  return (
    <div>
      <h1>Products</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3  m-5">
        {category.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
