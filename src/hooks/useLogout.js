import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // پاک کردن اطلاعات از استیت و localStorage
    navigate("/login"); // هدایت به صفحه لاگین
  };

  return handleLogout;
};
