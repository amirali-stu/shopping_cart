import React, { memo } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";

const CartItem = memo(function CartItem({ product }) {
  const { onDecrease, onRemove, onIncrease } = useAuth();

  return (
    <div className="w-full p-4">
      <div className="flex h-20 items-center justify-between">
        <div className="h-full flex flex-col justify-evenly">
          <h4 className="text-2xl dark:text-white text-dark-primary max-w-[320px] max-md:max-w-[180px] truncate">
            {product.name}
          </h4>
          <div className="flex items-center gap-x-2">
            <p className="text-sm dark:text-white text-dark-primary">
              {product.price.toLocaleString("fa-IR")} هزار تومان
            </p>
            <div className="flex items-center gap-x-1 max-md:hidden">
              {[...Array(5)].map((_, i) => {
                const rating = product.rating || 0;
                return (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < rating
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.118L10 13.347l-3.38 2.455c-.785.57-1.838-.196-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L3.623 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.966z" />
                  </svg>
                );
              })}
            </div>
          </div>
        </div>
        <img
          src={product.image}
          alt=""
          className="w-20 h-20 rounded-md"
          loading="lazy"
        />
      </div>
      <div className="space-y-3 my-3">
        <p className="text-sm dark:text-white text-dark-primary line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-x-8">
          <button
            className="w-8 h-8 flex items-center justify-center cursor-pointer rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
            aria-label="decrease"
            onClick={() => onDecrease(product.id)}
          >
            <FaMinus size={12} />
          </button>
          <span className="px-2 text-gray-900 dark:text-gray-100">
            {product.count}
          </span>
          <button
            className="w-8 h-8 flex items-center justify-center rounded bg-green-500 hover:bg-green-600 cursor-pointer text-white transition-colors"
            aria-label="increase"
            onClick={() => onIncrease(product.id)}
          >
            <FaPlus size={12} />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-x-2">
        <button
          className="text-center w-full flex items-center justify-center gap-x-2 cursor-pointer mt-4 bg-red-600 hover:bg-red-700 transition-all text-white  p-3 rounded-lg"
          onClick={() => onRemove(product.id)}
        >
          <p>حذف از سبد خرید</p>
          <IoClose />
        </button>
      </div>
    </div>
  );
});

export default CartItem;
