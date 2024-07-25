import * as React from "react";
import { cn } from "@/lib/utils";
import { CircleAlert, CircleCheck } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  hasSuccess?: boolean;
  helperText?: string;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      hasError = false,
      hasSuccess = false,
      helperText,
      errorMessage,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            hasError
              ? "border-red-500 focus-visible:ring-red-500"
              : hasSuccess
              ? "border-green-500 focus-visible:ring-green-500"
              : "border-input focus-visible:ring-primary",
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && !errorMessage && (
          <p
            className={cn(
              "mt-1 flex gap-1 items-center text-xs font-bold",
              hasSuccess ? "text-green-700" : "text-gray-500"
            )}
          >
            {hasSuccess && <CircleCheck className="w-3 h-3" />}
            {helperText}
          </p>
        )}
        {errorMessage && (
          <p className="mt-1 flex gap-1 items-center text-xs font-bold text-red-500">
            <CircleAlert className="w-3 h-3" />
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
