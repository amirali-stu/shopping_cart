import { useState, useRef } from "react";
import { SlBasket } from "react-icons/sl";
import { FiTrash2 } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Protected from "../Protected";
import CartList from "./CartList";
import CartSummary from "./CartSummary";

function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const {
    basket,
    discount,
    totalAmount,
    loading,
    onIncrease,
    onDecrease,
    onRemove,
  } = useAuth();

  // برای نمایش باکس هنگام ورود و خروج موس
  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 250);
  };

  if (loading) return <p>در حال بررسی وضعیت ورود...</p>;

  const finalAmount = totalAmount * (1 - (discount || 0) / 100);

  return (
    <div
      className="relative max-md:hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink
        to="/cart"
        aria-label="سبد خرید"
        className="relative text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
      >
        <SlBasket size={24} />
        <Protected>
          {basket.length > 0 && (
            <span className="absolute -top-1 text-center pt-1 -right-2 text-xs bg-red-600 text-white rounded-full px-1">
              {basket.length}
            </span>
          )}
        </Protected>
      </NavLink>

      <div
        className={`absolute left-0 mt-2 w-80 sm:w-96 max-w-[90vw] bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden
          transition-[max-height,opacity,transform] duration-300 ease-in-out origin-top p-4 
          ${
            isOpen
              ? "max-h-[520px] opacity-100 scale-y-100 pointer-events-auto"
              : "max-h-0 opacity-0 scale-y-0 pointer-events-none"
          }`}
        style={{ transformOrigin: "top" }}
      >
        <Protected
          msg={
            <p className="text-gray-900 dark:text-gray-100 text-center">
              شما هنوز ثبت نام نکرده اید
            </p>
          }
        >
          <CartList
            basket={basket}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onRemove={onRemove}
          />
          {basket.length > 0 && (
            <CartSummary finalAmount={finalAmount} discount={discount} />
          )}
        </Protected>
      </div>
    </div>
  );
}

export default CartDropdown;
