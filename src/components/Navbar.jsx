import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoPerson, IoMoon, IoSunnyOutline, IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import CartDropdown from "./CartDropDown/CartDropdown";
import { useAuth } from "../context/AuthContext";
import Protected from "./Protected";
import { useUserData } from "../hooks/useUserData";
import useTheme from "../hooks/useTheme";
import Tooltip from "./Tooltip";
import { IoExitOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import MobileSidebar from "./MobileSidebar";

function Navbar({ isSidebar, setIsSidebar }) {
  const { theme, toggleTheme } = useTheme(); // state برای تم سایت
  const { loading, basket, userData, isAuthenticated } = useAuth(); // گرفتن اطلاعات لاگین بودن کاربر و همچنین اطلاعات حساب
  const handleLogout = useLogout(); // هوک برای خروج از حساب کاربر

  const linkBaseClass =
    "relative px-3 py-2 font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300 ease-in-out";
  const activeLinkClass =
    "text-indigo-600 dark:text-indigo-400 before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-indigo-500 dark:before:bg-indigo-400 before:rounded-md";

  // برای هاور روی سبدخرید

  if (loading) {
    return <p>در حال بررسی وضعیت ورود...</p>;
  }

  return (
    <>
      <header className="w-full sticky top-4 z-40 flex justify-center">
        <nav className="w-full max-w-[1200px] mx-4 px-6 py-3 backdrop-blur-md bg-white/30 dark:bg-gray-900/30 rounded-xl shadow-lg flex justify-between items-center h-16 transition-all duration-300">
          {/* لوگو یا نام سایت */}
          <div className="max-lg:hidden text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 select-none cursor-default">
            فروشگاه من
          </div>

          {/* منوی لینک‌ها */}
          <ul className="flex items-center lg:space-x-6 max-lg:space-x-3">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `max-md:hidden relative px-3 py-2 font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300 ease-in-out ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-indigo-500 dark:before:bg-indigo-400 before:rounded-md"
                      : ""
                  }`
                }
              >
                خانه
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `max-md:hidden relative px-3 py-2 font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300 ease-in-out ${
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400 before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-indigo-500 dark:before:bg-indigo-400 before:rounded-md"
                      : ""
                  }`
                }
              >
                محصولات
              </NavLink>
            </li>
            <li>
              <IoMenu
                className="md:hidden text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                size={22}
                onClick={() => setIsSidebar(true)}
              />
            </li>
          </ul>

          {/* دکمه‌ها و آیکون‌ها */}
          <ul className="flex items-center space-x-4">
            {/* تغییر تم */}
            <li>
              <button
                onClick={toggleTheme}
                aria-label="تغییر تم"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 hover:bg-indigo-100 dark:hover:bg-indigo-600 transition-colors duration-300 shadow-md max-md:hidden"
              >
                {theme === "light" ? (
                  <IoMoon size={22} />
                ) : (
                  <IoSunnyOutline size={22} />
                )}
              </button>
            </li>

            {/* سبد خرید */}
            <li>
              <CartDropdown cartItems={basket} />
            </li>

            {/* ثبت نام */}
            {!isAuthenticated && (
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    ` ${
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-500 dark:border-indigo-400 pb-0.5"
                        : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                    }`
                  }
                >
                  ثبت نام / ورود
                </NavLink>
              </li>
            )}

            {/* آیکون پروفایل */}
            {isAuthenticated && (
              <Protected>
                <li>
                  <Tooltip content={`سلام ${userData?.name}`} position="right">
                    <button
                      type="button"
                      className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                    >
                      <IoPerson size={24} />
                    </button>
                  </Tooltip>
                </li>
              </Protected>
            )}
            {/* آیکون خروج از حساب */}
            {isAuthenticated && (
              <Protected>
                <li>
                  <Tooltip content={`خروج از حساب`} position="bottom">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-gray-600 rotate-180 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                    >
                      <IoExitOutline size={24} />
                    </button>
                  </Tooltip>
                </li>
              </Protected>
            )}
          </ul>
        </nav>
      </header>

      <MobileSidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
    </>
  );
}

export default Navbar;
