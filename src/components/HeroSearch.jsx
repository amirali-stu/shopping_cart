// components/SearchInput.jsx
import React from "react";
import { FiSearch } from "react-icons/fi";



const SearchInput = ({ placeholder = "جستجو..." }) => {
  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      <div className="relative max-sm:mx-2">
        {/* Input شیشه‌ای */}
        <input
          type="text"
          placeholder={placeholder}
          className="
            w-full
            pl-14
            pr-4
            py-4
            text-lg
            md:text-xl
            rounded-2xl
            bg-white/20
            dark:bg-gray-900/30
            backdrop-blur-xl
            border border-white/30
            dark:border-gray-700/50
            focus:outline-none
            focus:ring-4
            focus:ring-blue-400/50
            placeholder-gray-400
            dark:placeholder-gray-300
            text-gray-900
            dark:text-white
            transition
            duration-300
            hover:bg-white/30
            dark:hover:bg-gray-900/50
          "
        />
        {/* آیکون شیشه‌ای */}
        <div
          className="
          w-12 h-[80%]
          absolute left-3 top-1/2 -translate-y-1/2
          bg-white/20 dark:bg-gray-900/30
          backdrop-blur-xl
          rounded-full
          flex items-center justify-center
          border border-white/30 dark:border-gray-700/50
          transition duration-300
          hover:bg-white/30 dark:hover:bg-gray-900/50
        "
        >
          <FiSearch className="text-gray-500 dark:text-gray-300 text-xl" />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
