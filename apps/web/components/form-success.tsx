import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface FormSuccessProps {
  message: string;
  onDismiss?: () => void;
}

export const FormSuccess = ({ message, onDismiss }: FormSuccessProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, [message]);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!message || !isVisible) return null;

  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center justify-between gap-x-2 text-sm text-emerald-500">
      <div className="flex gap-x-2 items-center">
        <CheckCircledIcon className="h-4 w-4" />
        <p>{message}</p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleDismiss}
        className="bg-transparent w-6 h-6 hover:bg-emerald-500/20 hover:text-emerald border-none"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
