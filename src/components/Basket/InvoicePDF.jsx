import React from "react";
import Tooltip from "../Tooltip";
import { FaSave } from "react-icons/fa";

function InvoicePDF({ handleDownloadInvoice, invoiceRef, basket }) {
  return (
    <div className="max-w-[1200px] mx-auto px-4">
      <div className="flex justify-end mb-6">
        <Tooltip content="دانلود فاکتور" position="top">
          <button
            onClick={handleDownloadInvoice}
            className="dark:text-white bg-blue-700 text-dark-primary duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105 hover:bg-blue-800 transition-all py-3 px-4 rounded-lg flex items-center gap-2"
          >
            <FaSave size={22} />
          </button>
        </Tooltip>
      </div>

      {/* سایر بخش‌های CartGrid */}

      {/* کامپوننت مخفی برای PDF */}
      <div
        ref={invoiceRef}
        className="absolute opacity-0 pointer-events-none w-full"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">فاکتور سبد خرید</h2>

        {basket?.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm">تعداد: {item.count}</p>
            </div>
            <div>
              <p className="text-sm">
                قیمت واحد: {item.price.toLocaleString("fa-IR")} تومان
              </p>
              <p className="text-sm font-bold">
                جمع: {(item.price * item.count).toLocaleString("fa-IR")} تومان
              </p>
            </div>
          </div>
        ))}

        <div className="flex justify-between font-bold mt-4 text-lg">
          <span>مبلغ کل:</span>
          <span>
            {basket
              ?.reduce((sum, item) => sum + item.price * item.count, 0)
              .toLocaleString("fa-IR")}{" "}
            تومان
          </span>
        </div>
      </div>
    </div>
  );
}

export default InvoicePDF;
