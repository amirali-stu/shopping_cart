import React from "react";
import notFoundImage from "../assets/images/notFound/not-found.jpg";
import ProductsGrid from "./ProductsGrid";




function Product({ products }) {
  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <h2 className="text-3xl font-semibold mb-8 border-b text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 pb-3">
        محصولات ما
      </h2>

      <ProductsGrid
        products={products}
        notFoundImage={notFoundImage}
        onAddToCart={null}
      />
    </section>
  );
}

export default Product;
