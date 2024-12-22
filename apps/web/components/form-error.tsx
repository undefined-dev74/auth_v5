"use client";

import { useState, useEffect } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface FormErrorProps {
  message: string;
  onDismiss?: () => void;
}

export const FormError = ({ message, onDismiss }: FormErrorProps) => {
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
    <div className="bg-destructive/15 p-3 rounded-md flex items-center justify-between gap-x-2 text-sm text-destructive">
      <div className="flex gap-x-2 items-center">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <p>{message}</p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={handleDismiss}
        className="bg-transparent w-6 h-6 hover:bg-destructive/20 hover:text-destructive border-none"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
