import React, { useEffect, useState } from "react";
import { motion, useViewportScroll, useTransform } from "framer-motion";
import Product from "../components/Product";
import AboutPage from "../components/AboutPage";

function Home() {
  const [isProduct, setIsProduct] = useState([]);
  const { scrollY } = useViewportScroll();

  // تغییر ارتفاع و شفافیت Product بر اساس اسکرول
  const y = useTransform(scrollY, [0, 400], [100, 0]); // حرکت از پایین به بالا
  const opacity = useTransform(scrollY, [0, 400], [0, 1]); // کم‌کم ظاهر شود

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await fetch("http://localhost:4000/products");
      const data = await res.json();
      setIsProduct(data);
    };
    getAllProducts();
  }, []);

  return (
    <div>
      {/* Hero / About */}
      <div className="relative z-10">
        <AboutPage />
      </div>

      {/* Product روی AboutPage */}
      <motion.div style={{ y, opacity }} className="relative z-20 -mt-32 px-4">
        <Product products={isProduct} />
      </motion.div>

      {/* About */}
    </div>
  );
}

export default Home;
