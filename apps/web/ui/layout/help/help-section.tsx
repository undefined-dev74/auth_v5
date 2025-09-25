"use client";

import { useResizeObserver } from "@app/ui";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { HelpArticles } from "./help-articles";

export function HelpSection() {
  const [screen, setScreen] = useState<"main" | "contact">("main");

  const containerRef = useRef<HTMLDivElement>(null);
  const resizeObserverEntry = useResizeObserver(containerRef);

  return (
    <motion.div
      className="w-full overflow-y-scroll sm:w-[32rem]"
      animate={{
        height: resizeObserverEntry?.borderBoxSize[0].blockSize ?? "auto",
        maxHeight: "calc(100vh - 10rem)",
      }}
      transition={{ type: "spring", duration: 0.3 }}
    >
      <div ref={containerRef}>
        {screen === "main" && <HelpArticles setScreen={setScreen} />}
        {/* {screen === "contact" && <ContactForm setScreen={setScreen} />} */}
      </div>
    </motion.div>
  );
}
