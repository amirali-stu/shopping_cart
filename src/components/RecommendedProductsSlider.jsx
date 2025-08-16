// Slider.jsx
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsBasket2 } from "react-icons/bs";
import { BiSolidOffer } from "react-icons/bi";

// ماژول‌های Swiper
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// CSS Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useAuth } from "../context/AuthContext";

const RecommendedProductsSlider = () => {
  const { basket, setBasket, totalAmount, setTotalAmount } = useAuth();

  const [isProducts, setIsProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // گرفتن تمام محصولات
  useEffect(() => {
    const getAllProducts = async () => {
      const res = await fetch("http://localhost:4000/products");
      const data = await res.json();
      setIsProducts(data);
    };
    getAllProducts();
  }, []);

  // فیلتر محصولات پیشنهادی بر اساس دسته‌های موجود در سبد
  useEffect(() => {
    if (basket.length > 0 && isProducts.length > 0) {
      const basketCategories = [
        ...new Set(basket.map((item) => item.category)),
      ];
      const filtered = isProducts.filter((product) =>
        basketCategories.includes(product.category)
      );
      setRecommendedProducts(filtered);
    } else {
      setRecommendedProducts([]);
    }
  }, [basket, isProducts]);

  // تابع افزودن به سبد خرید
  const addToBasket = (product) => {
    const existingItem = basket.find((item) => item.id === product.id);
    let updatedBasket;

    if (existingItem) {
      updatedBasket = basket.map((item) =>
        item.id === product.id ? { ...item, count: item.count + 1 } : item
      );
    } else {
      updatedBasket = [...basket, { ...product, count: 1 }];
    }

    setBasket(updatedBasket);
    setTotalAmount(
      updatedBasket.reduce((sum, item) => sum + item.price * item.count, 0)
    );

    // ذخیره در localStorage و API
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.id) {
      fetch(`http://localhost:4000/users/${userData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ basket: updatedBasket }),
      }).catch((err) => console.error(err));
    }

    // بعد از اضافه شدن به سبد، صفحه به بالا اسکرول کنه
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
        }}
        autoplay={{ delay: 3000 }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {recommendedProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300 relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {product.price.toLocaleString("fa-IR")} تومان
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => {
                    const rating = product.rating || 0;
                    return (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < rating
                            ? "text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.118L10 13.347l-3.38 2.455c-.785.57-1.838-.196-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L3.623 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.966z" />
                      </svg>
                    );
                  })}
                </div>
                <button
                  onClick={() => addToBasket(product)}
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-teal-500 text-white py-2 rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  افزودن به سبد خرید
                  <BsBasket2 size={18} />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-pagination-custom absolute bottom-2 z-10 left-0 w-full flex justify-center gap-2"></div>

        <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-0 z-10">
          <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-800 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </div>

        <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-0 z-10">
          <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-800 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Swiper>
    </div>
  );
};

export default RecommendedProductsSlider;
