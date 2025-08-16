import React from "react";
import SplitText from "./SplitText";
import TextType from "./TextType";
import DarkVeil from "./DarkVeil";
import useTheme from "../hooks/useTheme";
import HeroSearch from "./HeroSearch";

function AboutPage() {
  const { theme, toggleTheme } = useTheme();
  const getDarkVeilSettings = (theme) => {
    if (theme === "light") {
      return {
        hueShift: 0,
        speed: 2,
      };
    } else {
      return {
        hueShift: 18000,
        speed: 2,
      };
    }
  };

  const settings = getDarkVeilSettings(theme);

  return (
    <section className="w-full -mt-16 mb-16 relative h-screen text-center">
      <DarkVeil {...settings} />

      <div className="absolute h-screen bg-white/90 dark:bg-inherit inset-0 flex flex-col items-center justify-center z-10">
        <SplitText
          text="فروشگاه آنلاین ما"
          className="text-4xl font-extrabold mb-4 text-gray-900 dark:text-gray-100"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          <TextType
            text={[
              "با یک کلیک، خریدی راحت",
              "همیشه در کنار شما، همیشه آنلاین",
              "قیمت مناسب، کیفیت عالی",
              "از انتخاب تا تحویل، سریع و مطمئن",
              "فروشگاه شما، همیشه باز",
              "همه چیز، همین‌جا",
              "با ما، خرید لذت‌بخش‌تره",
              "انتخاب هوشمند، خرید آسان",
              "بهترین‌ها را از ما بخواهید",
              "یک تجربه‌ی جدید از خرید آنلاین",
            ]}
            typingSpeed={80} // سرعت تایپ
            deletingSpeed={40} // سرعت پاک کردن
            pauseDuration={1500} // مکث بین جملات
            loop={true} // تکرار بی‌نهایت
            showCursor={true} // نمایش نشانگر تایپ
            cursorCharacter="|" // کاراکتر نشانگر
            textColors={["#4ade80", "#38bdf8", "#facc15", "#f472b6"]} // رنگ‌های مختلف
            className="max-sm:text-2xl sm:text-4xl font-bold"
          />
        </p>
        <HeroSearch />
      </div>
    </section>
  );
}

export default AboutPage;
