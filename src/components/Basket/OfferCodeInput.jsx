import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function OfferCodeInput({ setDiscount, setFinalAmount }) {
  const { totalAmount } = useAuth(); // گرفتن از context
  const [hasOfferCode, setHasOfferCode] = useState(false);
  const [offerCode, setOfferCode] = useState("");

  const applyOfferCode = () => {
    if (offerCode === "#offer55") {
      const discountPercent = 25;
      setDiscount(discountPercent);
      setFinalAmount(totalAmount * (1 - discountPercent / 100));
    } else {
      setDiscount(0);
      setFinalAmount(totalAmount);
    }
  };

  return (
    <div className="flex items-center flex-col gap-y-4">
      <div className="flex items-center justify-between w-full">
        <span>کد تخفیف دارید؟</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={hasOfferCode}
            onChange={() => setHasOfferCode(!hasOfferCode)}
            className="sr-only"
          />
          <div
            className={`w-14 h-7 rounded-full transition-colors duration-500 ease-in-out
              ${
                hasOfferCode
                  ? "bg-gradient-to-r from-green-400 to-teal-500"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
          ></div>
          <div
            className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out
              ${hasOfferCode ? "translate-x-7" : "translate-x-0"}`}
          ></div>
        </label>
      </div>

      {hasOfferCode && (
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={offerCode}
            onChange={(e) => setOfferCode(e.target.value)}
            placeholder="کد تخفیف..."
            className="w-full pr-18 pl-4 py-2 rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white/30 dark:bg-gray-800/40 backdrop-blur-md placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-400 transition-all duration-300"
          />
          <button
            onClick={applyOfferCode}
            className="absolute top-1/2 right-1 -translate-y-1/2 px-4 py-1 bg-gradient-to-r from-teal-400 to-green-400 text-white text-sm font-semibold rounded-xl shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
          >
            ثبت
          </button>
        </div>
      )}
    </div>
  );
}
