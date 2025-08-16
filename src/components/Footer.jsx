import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* لوگو و توضیح کوتاه */}
          <div>
            <h2 className="text-2xl font-bold mb-4">ShopMate</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              فروشگاه آنلاین شما برای خرید آسان و سریع محصولات دیجیتال و فیزیکی.
            </p>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h3 className="font-semibold mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  خانه
                </Link>
              </li>
              <li>
                <Link
                  to="/product"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  محصولات
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  تماس با ما
                </Link>
              </li>
            </ul>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div>
            <h3 className="font-semibold mb-4">ما را دنبال کنید</h3>
            <div className="flex space-x-3 rtl:space-x-reverse">
              <a
                href="#"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-indigo-600 hover:text-white transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-indigo-600 hover:text-white transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-indigo-600 hover:text-white transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="p-2 mr-3 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-indigo-600 hover:text-white transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* تماس با ما */}
          <div>
            <h3 className="font-semibold mb-4">تماس با ما</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ایمیل: amiralimosolo279@gmail.com
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              تلفن: 09054073722
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">آدرس: قم</p>
          </div>
        </div>

        <hr className="my-6 border-gray-300 dark:border-gray-700" />

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          © 2025 ShopMate. همه حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
