import React, { useState } from "react";
import { CiMail, CiPhone, CiLocationOn } from "react-icons/ci";

function ContactPageComponent() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("پیام ارسال شد:", form);
    alert("پیام شما با موفقیت ارسال شد!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="bg-indigo-600 dark:bg-indigo-700 py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">تماس با ما</h1>
        <p className="text-gray-200 text-lg">با ما در ارتباط باشید</p>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* اطلاعات تماس */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4">راه‌های ارتباطی</h2>
          <div className="flex items-center gap-3">
            <CiMail size={28} />
            <span>amiralimosolo279@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <CiPhone size={28} />
            <span>09054073722</span>
          </div>
          <div className="flex items-center gap-3">
            <CiLocationOn size={28} />
            <span>قم</span>
          </div>
        </div>

        {/* فرم تماس */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
        >
          <div>
            <label className="block mb-1">نام شما</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div>
            <label className="block mb-1">ایمیل</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <div>
            <label className="block mb-1">پیام شما</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition"
          >
            ارسال پیام
          </button>
        </form>
      </main>
    </div>
  );
}

export default ContactPageComponent;
