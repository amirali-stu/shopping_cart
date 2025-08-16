import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [basket, setBasket] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setDiscount] = useState(0);

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

  const updateBasket = async (newBasketItem) => {
    setBasket((prevBasket) => {
      // بررسی می‌کنیم آیا محصول قبلاً وجود داشته
      const existingIndex = prevBasket.findIndex(
        (item) => item.id === newBasketItem.id
      );

      let updatedBasket = [...prevBasket];

      if (existingIndex !== -1) {
        // اگر محصول وجود داشت، فقط count اضافه می‌کنیم
        updatedBasket[existingIndex].count =
          (updatedBasket[existingIndex].count || 1) + 1;
      } else {
        // محصول جدید رو اضافه می‌کنیم و count رو 1 می‌گذاریم
        updatedBasket.push({ ...newBasketItem, count: 1 });
      }

      // ذخیره داخل localStorage
      setUserData((prev) => {
        if (!prev) return prev;
        const updatedUser = { ...prev, basket: updatedBasket };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser;
      });

      // آپدیت سرور
      if (userData?.id) {
        fetch(`http://localhost:4000/users/${userData.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ basket: updatedBasket }),
        }).catch((err) => console.error(err));
      }

      return updatedBasket;
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserData(null);
  };

  // افزایش تعداد محصول
  const onIncrease = (id) => {
    setBasket((prevBasket) => {
      const updatedBasket = prevBasket.map((item) =>
        item.id === id ? { ...item, count: (item.count || 1) + 1 } : item
      );

      updateBasketData(updatedBasket);
      return updatedBasket;
    });
  };

  // کاهش تعداد محصول
  const onDecrease = (id) => {
    setBasket((prevBasket) => {
      const updatedBasket = prevBasket.map((item) =>
        item.id === id
          ? { ...item, count: Math.max(1, (item.count || 1) - 1) }
          : item
      );

      updateBasketData(updatedBasket);
      return updatedBasket;
    });
  };

  // حذف محصول
  const onRemove = (id) => {
    const updatedBasket = basket.filter((item) => item.id !== id);
    updateBasketData(updatedBasket);
    setBasket(updatedBasket);
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
