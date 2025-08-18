import { createContext, useContext, useEffect, useState } from "react";
import useAlert from "../hooks/useAlert";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [basket, setBasket] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const { showAlert } = useAlert();
  const [inventoryMap, setInventoryMap] = useState({}); // id => تعداد موجودی

  // وقتی صفحه لود شد یا محصولات رو گرفتیم
  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => {
        const map = {};
        data.forEach((p) => (map[p.id] = p.inventory));
        setInventoryMap(map);
      });
  }, []);

  // وقتی basket آپدیت می‌شه
  useEffect(() => {
    if (basket?.length) {
      setTotalAmount(
        basket.reduce((acc, item) => acc + item.price * item.count, 0)
      );
    } else {
      setTotalAmount(0);
    }
  }, [basket]);

  const checkAuth = async () => {
    try {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (!localUser?.id) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      const res = await fetch(`http://localhost:4000/users/${localUser.id}`);
      if (!res.ok) throw new Error("User not found");

      const foundUser = await res.json();
      setIsAuthenticated(true);
      setUserData(foundUser);
    } catch (err) {
      console.error("Auth check error:", err);
      setIsAuthenticated(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (formData, isRegister = false) => {
    const errors = [];

    if (!formData.userName.trim()) errors.push("نام کاربری الزامی است.");
    if (!formData.password.trim()) errors.push("گذرواژه الزامی است.");

    const nameRegex = /^[a-zA-Zآ-ی\s]+$/;
    if (!nameRegex.test(formData.userName))
      errors.push("نام کاربری باید فقط شامل حروف باشد.");

    if (formData.password.length < 6)
      errors.push("گذرواژه باید حداقل ۶ کاراکتر باشد.");

    if (isRegister) {
      if (!formData.rePassword || !formData.rePassword.trim()) {
        errors.push("تکرار گذرواژه الزامی است.");
      } else if (formData.password !== formData.rePassword) {
        errors.push("گذرواژه‌ها با هم مطابقت ندارند.");
      }
    }

    return errors;
  };

  const login = async (userName, password) => {
    try {
      const res = await fetch(
        `http://localhost:4000/users?userName=${encodeURIComponent(
          userName
        )}&password=${encodeURIComponent(password)}`
      );
      const users = await res.json();

      if (users.length === 1) {
        const user = users[0];

        // ذخیره کل user داخل localStorage
        localStorage.setItem("user", JSON.stringify(user));

        setIsAuthenticated(true);
        setUserData(user);
      } else {
        throw new Error("نام کاربری یا گذرواژه اشتباه است");
      }
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      // 1️⃣ چک کردن وجود کاربر با همین userName
      const resCheck = await fetch(
        `http://localhost:4000/users?userName=${encodeURIComponent(
          userData.userName
        )}`
      );
      const existingUsers = await resCheck.json();

      if (existingUsers.length > 0) {
        throw new Error("این نام کاربری قبلاً ثبت شده است.");
      }

      const newUserData = {
        ...userData,
        basket: [],
      };

      const res = await fetch(`http://localhost:4000/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserData),
      });

      if (!res.ok) throw new Error("ثبت‌نام با خطا مواجه شد");

      const newUser = await res.json();

      // ذخیره کل user داخل localStorage
      localStorage.setItem("user", JSON.stringify(newUser));

      setIsAuthenticated(true);
      setUserData(newUser);
    } catch (err) {
      console.error("Register error:", err);
      throw err;
    }
  };

  // هنگام افزودن محصول به سبد
  const updateBasket = async (product) => {
    try {
      // 1️⃣ گرفتن موجودی واقعی محصول از سرور
      const res = await fetch(`http://localhost:4000/products/${product.id}`);
      if (!res.ok) throw new Error("خطا در دریافت محصول از سرور");
      const productFromServer = await res.json();

      if (productFromServer.inventory <= 0) {
        showAlert("خطا", "این محصول موجودی ندارد", "error");
        return;
      }

      // 2️⃣ آپدیت سبد خرید به صورت سینکرون
      setBasket((prevBasket) => {
        const existingItem = prevBasket.find((item) => item.id === product.id);
        let updatedBasket;
        if (existingItem) {
          updatedBasket = prevBasket.map((item) =>
            item.id === product.id ? { ...item, count: item.count + 1 } : item
          );
        } else {
          updatedBasket = [...prevBasket, { ...product, count: 1 }];
        }

        updateBasketData(updatedBasket);
        return updatedBasket;
      });

      // 3️⃣ کم کردن موجودی محلی
      setInventoryMap((prev) => ({
        ...prev,
        [product.id]: productFromServer.inventory - 1,
      }));

      // 4️⃣ بروزرسانی موجودی روی سرور
      await fetch(`http://localhost:4000/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inventory: productFromServer.inventory - 1 }),
      });
    } catch (err) {
      console.error(err);
      showAlert("خطا", "مشکل در افزودن محصول به سبد خرید", "error");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserData(null);
  };

  // افزایش تعداد محصول
  const onIncrease = async (id) => {
    const available = inventoryMap[id] || 0;

    if (available <= 0) {
      showAlert("خطا", "موجودی در انبار به اتمام رسیده", "error");
      return;
    }

    setBasket((prevBasket) => {
      const updatedBasket = prevBasket.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      );
      updateBasketData(updatedBasket);
      return updatedBasket;
    });

    // کم کردن موجودی محلی
    setInventoryMap((prev) => ({ ...prev, [id]: prev[id] - 1 }));

    // بروزرسانی موجودی سرور
    const productFromServer = await fetch(
      `http://localhost:4000/products/${id}`
    ).then((res) => res.json());
    await fetch(`http://localhost:4000/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inventory: productFromServer.inventory - 1 }),
    }).catch((err) => console.error(err));
  };

  // کاهش تعداد محصول با بازگرداندن موجودی به سرور
  const onDecrease = async (id) => {
    const existingItem = basket.find((item) => item.id === id);
    if (!existingItem || existingItem.count <= 1) return; // حداقل یک عدد بماند

    setBasket((prevBasket) => {
      const updatedBasket = prevBasket.map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      );
      updateBasketData(updatedBasket);
      return updatedBasket;
    });

    // افزایش موجودی محلی
    setInventoryMap((prev) => ({ ...prev, [id]: prev[id] + 1 }));

    // بروزرسانی موجودی سرور
    const productFromServer = await fetch(
      `http://localhost:4000/products/${id}`
    ).then((res) => res.json());
    await fetch(`http://localhost:4000/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inventory: productFromServer.inventory + 1 }),
    }).catch((err) => console.error(err));
  };

  const onRemove = async (id) => {
    try {
      const itemToRemove = basket.find((item) => item.id === id);
      if (!itemToRemove) return;

      // حذف از سبد
      const updatedBasket = basket.filter((item) => item.id !== id);
      updateBasketData(updatedBasket);
      setBasket(updatedBasket);

      // بازگرداندن موجودی محلی
      setInventoryMap((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + (itemToRemove.count || 0),
      }));

      // بروزرسانی موجودی روی سرور
      const productFromServer = await fetch(
        `http://localhost:4000/products/${id}`
      ).then((res) => res.json());
      await fetch(`http://localhost:4000/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inventory: productFromServer.inventory + (itemToRemove.count || 0),
        }),
      });
    } catch (err) {
      console.error(err);
      showAlert("خطا", "مشکل در حذف محصول از سبد خرید", "error");
    }
  };

  // تابع مشترک برای آپدیت مبلغ و ذخیره
  const updateBasketData = (updatedBasket) => {
    // محاسبه مجموع
    setTotalAmount(
      updatedBasket.reduce((acc, curr) => acc + curr.price * curr.count, 0)
    );

    // ساخت یوزر آپدیت شده
    const updatedUser = userData
      ? { ...userData, basket: updatedBasket }
      : null;

    // ذخیره در state و localStorage
    if (updatedUser) {
      setUserData(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // ارسال به سرور
      fetch(`http://localhost:4000/users/${updatedUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ basket: updatedBasket }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("خطا در بروزرسانی سبد خرید");
        })
        .catch((err) => console.error("❌ مشکل در آپدیت سبد:", err));
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (userData?.basket) {
      setBasket(userData.basket);
    } else {
      setBasket([]);
    }
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLogin,
        setIsLogin,
        loading,
        login,
        register,
        logout,
        validateForm,
        userData,
        setUserData,
        basket,
        updateBasket,
        onIncrease,
        onDecrease,
        onRemove,
        updateBasketData,
        totalAmount,
        setTotalAmount,
        setBasket,
        discount,
        setDiscount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
