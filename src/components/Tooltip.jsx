import { useState, useRef, useEffect } from "react";

export default function Tooltip({ children, content, position = "top" }) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  // برای جلوگری از flicker وقتی موس سریع میره و میاد
  const showTip = () => {
    clearTimeout(timeoutRef.current);
    setVisible(true);
  };

  const hideTip = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 200);
  };

  // کلاس‌های موقعیت تولتیپ
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      onFocus={showTip}
      onBlur={hideTip}
      tabIndex={0} // برای دسترسی کیبوردی
    >
      {children}

      {/* Tooltip Box */}
      <div
        className={`
          pointer-events-none
          absolute
          z-50
          whitespace-nowrap
          rounded-md
          bg-indigo-600
          text-white
          text-sm
          px-3
          py-1.5
          shadow-lg
          select-none
          transition-all
          duration-300
          ease-out
          transform
          opacity-0
          scale-75
          ${positionClasses[position]}
          ${visible ? "opacity-100 scale-100 pointer-events-auto" : ""}
        `}
      >
        {content}
        {/* پیکان تولتیپ */}
        <div
          className={`
            absolute
            w-3
            h-3
            bg-indigo-600
            rotate-45
            ${position === "top" && "bottom-[-6px] left-1/2 -translate-x-1/2"}
            ${position === "bottom" && "top-[-6px] left-1/2 -translate-x-1/2"}
            ${position === "left" && "right-[-6px] top-1/2 -translate-y-1/2"}
            ${position === "right" && "left-[-6px] top-1/2 -translate-y-1/2"}
          `}
        />
      </div>
    </div>
  );
}
