import { useContext } from "react";
import { toastContext } from "@/context/toast-context";

const useToast = () => {
  const toastContextData = useContext(toastContext);
  return toastContextData;
};

export default useToast;
