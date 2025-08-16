import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

export default function DownloadInvoice({ cartItems }) {
  const invoiceRef = useRef();

  const handleDownload = () => {
    if (!invoiceRef.current) return;

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

  const totalAmount = cartItems?.reduce(
    (sum, item) => sum + item.price * (item.count || 1),
    0
  );

  return (
    <div>
      {/* محتوای قابل تبدیل به PDF */}
      <div
        ref={invoiceRef}
        className="p-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-md"
      >
        <h2 className="text-xl font-bold mb-4">فاکتور سبد خرید</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-600">
              <th className="text-left p-2">محصول</th>
              <th className="text-right p-2">تعداد</th>
              <th className="text-right p-2">قیمت واحد</th>
              <th className="text-right p-2">جمع</th>
            </tr>
          </thead>
          <tbody>
            {cartItems?.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-700"
              >
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-right">{item.count || 1}</td>
                <td className="p-2 text-right">
                  {item.price.toLocaleString("fa-IR")} تومان
                </td>
                <td className="p-2 text-right">
                  {(item.price * (item.count || 1)).toLocaleString("fa-IR")}{" "}
                  تومان
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-right font-bold p-2">
                مجموع کل:
              </td>
              <td className="text-right font-bold p-2">
                {totalAmount.toLocaleString("fa-IR")} تومان
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* دکمه دانلود */}
      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        دانلود فاکتور PDF
      </button>
    </div>
  );
}
