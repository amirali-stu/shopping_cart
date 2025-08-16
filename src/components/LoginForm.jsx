import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useAlert from "../hooks/useAlert";
import { useNavigate } from "react-router-dom";





export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    password: "",
    rePassword: "",
  });
  const { validateForm, login, register } = useAuth();
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm(formData, !isLogin); // چک rePassword فقط برای ثبت‌نام
    if (errors.length > 0) {
      errors.forEach((err) => showAlert("خطا!", err, "error"));
      return;
    }

    try {
      if (isLogin) {
        // ورود
        await login(formData.userName, formData.password);
        setIsLogin(true);
        showAlert("موفق!", "ورود با موفقیت انجام شد", "success", () => {
          navigate("/");
        });
      } else {
        // ثبت‌نام
        await register(formData);
        setIsLogin(true);
        showAlert("موفق!", "ثبت‌نام با موفقیت انجام شد✅", "success", () => {
          navigate("/");
        });
      }
    } catch (error) {
      showAlert("خطا!", error.message || "مشکلی پیش آمده", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen transition-colors duration-300 max-md:mx-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 border border-dark-primary/20 dark:border-gray-200/20">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          {isLogin ? "ورود به حساب" : "ثبت‌نام"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="نام"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                         bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition duration-200"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
            />
          )}

          <input
            type="text"
            placeholder="نام کاربری"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition duration-200"
            name="userName"
            autoComplete="username"
            value={formData.userName}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="گذواژه"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                       bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition duration-200"
            name="password"
            autoComplete="password"
            value={formData.password}
            onChange={handleChange}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="تکرار گذواژه"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 
                         bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition duration-200"
              name="rePassword"
              autoComplete="repassword"
              value={formData.rePassword}
              onChange={handleChange}
            />
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg 
                       shadow-md transition duration-200"
          >
            {isLogin ? "ورود" : "ثبت‌نام"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          {isLogin ? "حساب کاربری ندارید؟" : "حساب دارید؟"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline font-medium"
          >
            {isLogin ? "ثبت‌نام کنید" : "وارد شوید"}
          </button>
        </p>
      </div>
    </div>
  );
}
