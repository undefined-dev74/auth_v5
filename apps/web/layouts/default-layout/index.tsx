"use client";
import { ToastContextProvider } from "@/context/toast-context";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  gradient?: boolean;
};

const DefaultLayout: FC<Props> = ({ children, gradient = false }) => (
  <div
    className={`h-full w-full overflow-hidden ${
      gradient ? "" : "bg-[#191919]"
    }`}
  >
    <ToastContextProvider>{children}</ToastContextProvider>
  </div>
);

export default DefaultLayout;
