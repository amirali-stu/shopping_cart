import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [isSidebar, setIsSidebar] = useState(false);
  const [isProduct, setIsProduct] = useState([]);
  const [isLogin, setIsLogin] = useState([]);

  return (
    <div className="w-full mx-auto relative bg-white dark:bg-gray-900">
      <Navbar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
      <main className="w-full">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Register />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </main>
    </div>
  );
}

export default App;
