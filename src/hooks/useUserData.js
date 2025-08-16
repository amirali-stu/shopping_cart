import { useState, useEffect } from "react";

export function useUserData(field = null) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      setValue(null);
      return;
    }

    try {
      const user = JSON.parse(userStr);
      if (field) {
        setValue(user[field] ?? null);
      } else {
        setValue(user);
      }
    } catch {
      setValue(null);
    }
  }, [field]);

  return value;
}
