"use client";

import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import useToast from "@/hooks/use-toast";
import DefaultLayout from "@/layouts/default-layout";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const authService = new AuthService();

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: ErrorPageProps) => {
  const router = useRouter();
  const { setToastAlert } = useToast();
  const [errorCode, setErrorCode] = useState("404");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSignOut = async () => {
    try {
      await authService.signOut();
      router.push("/");
    } catch (error) {
      setToastAlert({
        type: "error",
        title: "Error!",
        message: "Failed to sign out. Please try again.",
      });
    }
  };

  const generateRandomErrorCode = useCallback(() => {
    const codes = ["404", "500", "503", "502", "400"];
    return codes[Math.floor(Math.random() * codes.length)];
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setErrorCode(generateRandomErrorCode());
    }, 3000);
    return () => clearInterval(interval);
  }, [generateRandomErrorCode]);

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-9xl font-extrabold text-white tracking-widest mb-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={errorCode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block"
                >
                  {errorCode}
                </motion.span>
              </AnimatePresence>
            </h1>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-8 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">Oops! Something went wrong</h2>
              <p className="text-xl text-purple-200 mb-8">
                We've encountered an unexpected error. Our team has been notified and is working on a fix.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
                  onClick={() => reset()}
                >
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-400 text-secondary-foreground hover:bg-purple-800 transition-all duration-300 transform hover:scale-105"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </div>
              <div className="mt-8">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-purple-300 hover:text-white transition-colors duration-300"
                >
                  {isExpanded ? "Hide" : "Show"} Error Details
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-left"
                    >
                      <pre className="bg-gray-800 p-4 rounded-md text-purple-300 text-sm overflow-x-auto">
                        {error.stack}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <p className="mt-8 text-purple-200">
              Need help? Join our{" "}
              <a
                href="https://discord.com/invite/A92xrEGCge"
                target="_blank"
                className="text-purple-400 hover:text-white underline transition-colors duration-300"
                rel="noopener noreferrer"
              >
                Discord server
              </a>{" "}
              for assistance.
            </p>
          </motion.div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Error;