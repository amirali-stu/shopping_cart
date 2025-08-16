import React from "react";
import team from "../assets/images/about-us/team.webp";
import team2 from "../assets/images/about-us/team.avif";
import mission from "../assets/images/about-us/mission.webp";

function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <header className="bg-indigo-600 dark:bg-indigo-700 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">درباره ما</h1>
          <p className="text-lg text-gray-200">
            آشنایی با تیم و اهداف فروشگاه ما
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16 space-y-16">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <img src={mission} alt="Our Team" className="rounded-lg shadow-lg" />
          <div>
            <h2 className="text-2xl font-semibold mb-4">ماموریت ما</h2>
            <p className="text-gray-700 dark:text-gray-300">
              هدف ما ارائه تجربه خرید آنلاین سریع، امن و لذت‌بخش است. با تمرکز
              روی کیفیت محصولات و رضایت مشتری، همیشه سعی داریم بهترین خدمات را
              ارائه کنیم.
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">تیم ما</h2>
            <p className="text-gray-700 dark:text-gray-300">
              تیم ما متشکل از افراد خلاق و متخصص است که در حوزه‌های مختلف
              دیجیتال و فروش آنلاین تجربه دارند. همکاری و نوآوری، اصل راهنمای
              ماست.
            </p>
          </div>
          <img src={team} alt="Mission" className="rounded-lg shadow-lg" />
        </section>
      </main>
    </div>
  );
}

export default AboutUs;
