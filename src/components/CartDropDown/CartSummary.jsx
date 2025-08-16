// CartSummary.jsx
import { NavLink } from "react-router-dom";

export default function CartSummary({ finalAmount, discount }) {
  return (
    <div className="mt-4 border-t pt-3">
      <div className="flex justify-between text-gray-900 dark:text-gray-100 font-semibold">
        <span>مجموع:</span>
        <span>
          {finalAmount.toLocaleString("fa-IR")} تومان
          {discount > 0 && (
            <span className="text-red-500 text-sm mr-2">
              ({discount}% تخفیف)
            </span>
          )}
        </span>
      </div>
      <NavLink
        to="/cart"
        className="block mt-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-center"
      >
        مشاهده سبد خرید
      </NavLink>
    </div>
  );
}
