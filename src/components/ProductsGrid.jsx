import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Tooltip from "./Tooltip";

function ProductsGrid({ products, notFoundImage }) {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const { updateBasket, isAuthenticated } = useAuth();

  // تعداد صفحات کل
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // محصولات صفحه فعلی
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onAddToCart = (product) => {
    if (isAuthenticated) updateBasket(product);
  };

  return (
    <div>
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 max-md:grid-cols-1 gap-8">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
              <img
                src={product.image ? product.image : notFoundImage}
                alt={product.name}
                className="w-full h-full object-cover transform scale-75 hover:scale-100 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {product.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
                {product.description}
              </p>

              {/* بخش ستاره‌ها */}
              <div className="flex items-center mb-3">
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
                <span className="text-gray-700 dark:text-gray-300 text-sm mr-2">
                  {product.rating?.toFixed(1) || "بدون امتیاز"}
                </span>
              </div>

              <div className="flex md:items-center justify-between mb-3 md:flex-row-reverse max-sm:flex-col-reverse max-md:gap-y-1">
                <div className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                  {product.price.toLocaleString("fa-IR")} تومان
                </div>
                <span className="text-indigo-600 dark:text-indigo-400 ">
                  موجودی : {product.inventory}
                </span>
              </div>

              {/* دکمه اضافه کردن به سبد خرید */}
              {!isAuthenticated ? (
                <Tooltip content={"شما هنوز ثبت نام نکرده اید"} position="top">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="mt-auto bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 w-full"
                  >
                    افزودن به سبد خرید
                  </button>
                </Tooltip>
              ) : (
                <button
                  onClick={() => onAddToCart(product)}
                  className="mt-auto bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                >
                  افزودن به سبد خرید
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8 space-x-2 flex-wrap">
        {/* دکمه قبلی */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className={`px-2 text-sm py-1 rounded border ${
            currentPage === 1
              ? "cursor-not-allowed border-gray-300 text-gray-400"
              : "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
          }`}
        >
          قبلی
        </button>

        {/* دکمه‌های صفحات - دسکتاپ و تبلت */}
        <div className="hidden md:flex space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-300 text-gray-700 hover:bg-indigo-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* دکمه‌های صفحات - موبایل */}
        <div className="max-md:flex md:hidden items-center space-x-2">
          {/* صفحه 1 */}
          <button
            onClick={() => setCurrentPage(1)}
            className={`px-3 text-sm py-1 rounded border ${
              currentPage === 1
                ? "bg-indigo-600 text-white border-indigo-600"
                : "border-gray-300 text-gray-700 hover:bg-indigo-100"
            }`}
          >
            1
          </button>

          {/* اگر صفحه فعلی بیشتر از 3 هست ... نمایش بده */}
          {currentPage > 3 && (
            <span className="px-1 text-dark-primary dark:text-gray-100">
              ...
            </span>
          )}

          {/* صفحه فعلی اگر بین 2 تا (totalPages-1) بود، نمایش بده */}
          {currentPage > 1 && currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage)}
              className="px-3 text-sm py-1 rounded border bg-indigo-600 text-white border-indigo-600"
            >
              {currentPage}
            </button>
          )}

          {/* اگر فاصله بین صفحه فعلی و آخر زیاد بود ... نمایش بده */}
          {currentPage < totalPages - 2 && <span className="px-2">...</span>}

          {/* صفحه آخر */}
          {totalPages > 1 && (
            <button
              onClick={() => setCurrentPage(totalPages)}
              className={`px-3 text-sm py-1 rounded border ${
                currentPage === totalPages
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-gray-300 text-gray-700 hover:bg-indigo-100"
              }`}
            >
              {totalPages}
            </button>
          )}
        </div>

        {/* دکمه بعدی */}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-2 text-sm py-1 rounded border ${
            currentPage === totalPages
              ? "cursor-not-allowed border-gray-300 text-gray-400"
              : "border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
          }`}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}

export default ProductsGrid;
