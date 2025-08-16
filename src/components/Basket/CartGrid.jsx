import React from "react";
import { BsBasket2 } from "react-icons/bs";
import CartList from "./CartList";
import PaymentSummary from "./PaymentSummary";
import RecommendedProducts from "./RecommendedProducts";

function CartGrid() {
  return (
    <section className="max-w-[1200px] mx-auto h-auto px-4 pb-16">
      <div className="w-full">
        <div className="w-full flex justify-between items-start max-md:flex-col md:gap-x-10 md:my-32 max-md:my-20 max-md:space-y-10">
          <div className="w-180 max-md:w-full dark:bg-bg-dark-primer dark:border-white/10 border-white/30 bg-white/20 border-2 rounded-2xl  backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_40px_rgba(250,250,250,0.15)] overflow-hidden">
            {/* header */}
            <div className="w-full py-4 bg-blue-800 text-white text-xl flex items-center pr-4 gap-x-2">
              <BsBasket2 size={28} />
              سبد خرید
            </div>
            <div className="w-full divide-y-2 dark:divide-white/20 divide-gray-700/20">
              <CartList />
            </div>
          </div>
          <PaymentSummary />
        </div>
        <RecommendedProducts />
      </div>
    </section>
  );
}

export default CartGrid;
