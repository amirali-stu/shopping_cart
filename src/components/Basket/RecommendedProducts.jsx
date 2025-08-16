import React from "react";
import { BiSolidOffer } from "react-icons/bi";
import RecommendedProductsSlider from "../RecommendedProductsSlider";

export default function RecommendedProducts() {
  return (
    <div
      className="w-full dark:bg-bg-dark-primer dark:border-white/10 border-white/30 bg-white/20 border-2 rounded-2xl
      backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_40px_rgba(250,250,250,0.15)] overflow-hidden"
    >
      {/* header */}
      <div className="w-full py-4 bg-blue-800 text-white text-xl flex items-center pr-4 gap-x-2">
        <BiSolidOffer size={28} />
        محصولات پیشنهادی مربوط به خواسته ی شما
      </div>

      {/* slider */}
      <RecommendedProductsSlider />
    </div>
  );
}
