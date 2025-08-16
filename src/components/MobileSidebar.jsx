import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTimes,
  FaShoppingCart,
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useLogout } from "../hooks/useLogout";
import useTheme from "../hooks/useTheme";



export default function MobileSidebar({ isSidebar, setIsSidebar }) {
  const logout = useLogout();

  function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        {theme === "light" ? (
          <>
            <FaMoon className="text-gray-600" />
            <span className="text-gray-800">حالت تاریک</span>
          </>
        ) : (
          <>
            <FaSun className="text-yellow-400" />
            <span className="text-gray-200">حالت روشن</span>
          </>
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* لایه پس‌زمینه تیره */}
      {isSidebar && (
        <div
          className="absolute inset-0 bg-black/40 pointer-events-auto"
          onClick={() => setIsSidebar(false)}
        ></div>
      )}

      {/* محتوای منو (کشویی از بالا) */}
      <div
        className={`absolute top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-lg rounded-b-2xl p-5 
        transform transition-transform duration-300 ease-in-out pointer-events-auto
        ${isSidebar ? "translate-y-0" : "-translate-y-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* دکمه بستن */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold dark:text-white">منو</h2>
          <button
            onClick={() => setIsSidebar(false)}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* آیتم‌ها */}
        <ul className="space-y-4 mt-6">
          {/* خانه  */}
          <li>
            <NavLink
              to="/"
              onClick={() => setIsSidebar(false)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FaHome className="text-indigo-500" />
              <span className="dark:text-white">خانه</span>
            </NavLink>
          </li>
          {/* سبد خرید */}
          <li>
            <NavLink
              to="/cart"
              onClick={() => setIsSidebar(false)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <FaShoppingCart className="text-indigo-500" />
              <span className="dark:text-white">سبد خرید</span>
            </NavLink>
          </li>

          {/* سوییچ تم */}
          <ThemeToggle />

          {/* خروج */}
          <li
            onClick={() => {
              logout();
              setIsSidebar(false);
            }}
            className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FaSignOutAlt className="text-red-500" />
            <span className="dark:text-white">خروج</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
