import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import OfferCodeInput from "./OfferCodeInput";
import { CiMoneyCheck1 } from "react-icons/ci";
import InvoicePDF from "./InvoicePDF";
import html2pdf from "html2pdf.js";
import Tooltip from "../Tooltip";
import { FaSave } from "react-icons/fa";

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

  const handleDownloadInvoice = async () => {
    if (!invoiceRef.current || basket.length === 0) return;

    await document.fonts.ready; // صبر کن فونت لود شود

    html2pdf()
      .set({
        margin: 10,
        filename: "invoice.pdf",
        html2canvas: {
          scale: 2,
          scrollY: 0,
          useCORS: true,
          letterRendering: true,
        },
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
      <div className="w-full px-4 mt-4 flex flex-col gap-y-8 gap-x-4">
        <div className="flex items-center justify-baseline gap-x-4 w-full">
          <button className="text-center w-full flex items-center justify-center gap-x-2 cursor-pointer bg-green-600 hover:bg-green-700 transition-all text-white py-3 rounded-lg">
            پرداخت نهایی
          </button>

          <div className="flex items-center flex-col">
            <div className="flex justify-end">
              <Tooltip content="دانلود فاکتور" position="top">
                <button
                  onClick={handleDownloadInvoice}
                  className="text-white bg-blue-700 duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105 hover:bg-blue-800 transition-all py-3 px-4 rounded-lg flex items-center gap-2"
                >
                  <FaSave size={22} />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>

        <div>
          {/* نسخه پیش نمایش */}
          <p className="pb-2 dark:text-gray-100 text-dark-primary">
            پیش نمایش فاکتور
          </p>
          <div className="invoice-preview border p-4 rounded-lg bg-white shadow-m">
            <div className="overflow-x-auto max-w-full w-full rounded-lg">
              <table className="min-w-full border border-gray-300 dark:border-gray-600 rounded-lg table-fixed">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="w-1/3 text-start px-4 py-3 text-base truncate">
                      نام محصول
                    </th>
                    <th className="w-1/6 text-center px-4 py-3 text-base">
                      تعداد
                    </th>
                    <th className="w-1/6 text-end px-4 py-3 text-base truncate">
                      قیمت واحد
                    </th>
                    <th className="w-1/3 text-end px-4 py-3 text-base truncate">
                      جمع
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {basket.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 transition-colors"
                    >
                      <td className="px-4 py-3 max-w-[200px] truncate">
                        {item.name}
                      </td>
                      <td className="text-center px-4 py-3">{item.count}</td>
                      <td className="text-end px-4 py-3 truncate">
                        {item.price.toLocaleString("fa-IR")} تومان
                      </td>
                      <td className="text-end px-4 py-3 font-bold truncate">
                        {(item.price * item.count).toLocaleString("fa-IR")}{" "}
                        تومان
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-300 dark:border-gray-600 font-bold">
                    <td colSpan={3} className=" px-4 py-3">
                      مبلغ کل:
                    </td>
                    <td className=" px-4 py-3">
                      {finalAmount.toLocaleString("fa-IR")} تومان
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* نسخه دانلود (پنهان) */}
          <div
            style={{
              display: "none",
              fontFamily: "Dana-Medium",
              fontFamily: "Dana-Medium, sans-serif",
              background: "#f9f9f9",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <div
              ref={invoiceRef}
              style={{
                fontFamily: "sans-serif",
                background: "#f9f9f9",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                فاکتور خرید
              </h2>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "center",
                }}
              >
                <thead>
                  <tr style={{ background: "#e0e0e0" }}>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      نام محصول
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      تعداد
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      قیمت واحد
                    </th>
                    <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                      جمع
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {basket.map((item, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {item.name}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {item.count}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {item.price.toLocaleString("fa-IR")}
                      </td>
                      <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                        {(item.price * item.count).toLocaleString("fa-IR")}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ fontWeight: "bold", background: "#f0f0f0" }}>
                    <td
                      colSpan={3}
                      style={{ border: "1px solid #ccc", padding: "8px" }}
                    >
                      مبلغ کل:
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                      {finalAmount.toLocaleString("fa-IR")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSummary;
