import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import OfferCodeInput from "./OfferCodeInput";
import Tooltip from "../Tooltip";
import { FaSave } from "react-icons/fa";
import { CiMoneyCheck1 } from "react-icons/ci";
import InvoicePDF from "./InvoicePDF";

function PaymentSummary() {
  const { basket, totalAmount, setTotalAmount, discount, setDiscount } =
    useAuth();
  const [finalAmount, setFinalAmount] = useState(0); // مبلغ نهایی بعد از تخفیف

  // هر بار که basket تغییر کرد، totalAmount رو محاسبه کن
  useEffect(() => {
    const newTotal = basket.reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );
    setTotalAmount(newTotal);
  }, [basket]);

  useEffect(() => {
    setFinalAmount(totalAmount * (1 - discount / 100));
  }, [totalAmount, discount]);

  //   تابع بخش دانلود فاکتور سبد خرید
  const invoiceRef = useRef();
  const handleDownloadInvoice = () => {
    console.log("basket برای PDF:", basket);
    if (!invoiceRef.current || basket.length === 0) return;

    html2pdf()
      .set({
        margin: 10,
        filename: "invoice.pdf",
        html2canvas: { scale: 2, scrollY: 0 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(invoiceRef.current)
      .save();
  };

  return (
    <div className="w-120 max-md:w-full max-md:mb-10 dark:bg-bg-dark-primer dark:border-white/10 border-white/30 bg-white/20 border-2 rounded-2xl backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_40px_rgba(250,250,250,0.15)] flex flex-col overflow-hidden pb-4">
      <div className="w-full">
        {/* header */}
        <div className="w-full py-4 bg-blue-800 text-white text-xl flex items-center pr-4 gap-x-2">
          <CiMoneyCheck1 size={28} />
          اطلاعات پرداخت
        </div>

        {/* main */}
        <div className="**:flex **:items-center **:justify-between px-4 py-2 **:dark:text-white **:text-dark-primary my-2 space-y-3 border-b-2 dark:border-white/20 border-gray-700/20">
          <div>
            <span>مبلغ کل: </span>
            <span>{totalAmount.toLocaleString("fa-IR")} تومان</span>
          </div>
          <div>
            <span className="!text-red-500">تخفیف: </span>
            <span className="!text-red-500">{discount}% درصد</span>
          </div>
          <OfferCodeInput
            setDiscount={setDiscount}
            setFinalAmount={setFinalAmount}
          />
        </div>
        <div className="**:flex **:items-center **:justify-between **:text-xl **:dark:text-white **:text-dark-primary px-4">
          <div className="">
            <span>مبلغ قابل پرداخت: </span>
            <span>{finalAmount.toLocaleString("fa-IR")} تومان</span>
          </div>
        </div>
      </div>
      <div className="w-full px-4 mt-4 flex items-center justify-center gap-x-4">
        <button className="text-center w-full flex items-center justify-center gap-x-2 cursor-pointer bg-green-600 hover:bg-green-700 transition-all text-white py-3 rounded-lg">
          پرداخت نهایی
        </button>

        <InvoicePDF
          handleDownloadInvoice={handleDownloadInvoice}
          invoiceRef={invoiceRef}
          basket={basket}
        />
      </div>
    </div>
  );
}

export default PaymentSummary;
