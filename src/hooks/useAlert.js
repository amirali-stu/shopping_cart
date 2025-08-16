// hooks/useAlert.js
import Swal from "sweetalert2";

export default function useAlert() {
  const showAlert = (title, text, icon = "info", onOk) => {
    Swal.fire({
      title,
      text,
      icon, // success, error, warning, info, question
      confirmButtonText: "باشه",
    }).then((result) => {
      if (result.isConfirmed && onOk) {
        onOk();
      }
    });
  };

  const showConfirm = (title, text, icon = "question", onOk) => {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed && onOk) {
        onOk();
      }
    });
  };

  return { showAlert, showConfirm };
}
