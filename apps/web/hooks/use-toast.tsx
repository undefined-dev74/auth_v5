import { useContext } from "react";
import { toastContext } from "@/context/toast-context";

const useToast = () => {
  const toastContextData = useContext(toastContext);
  if (toastContextData === undefined) {
    throw new Error("useToast must be used within a ToastContextProvider");
  }
  return toastContextData;
};

export default useToast;
