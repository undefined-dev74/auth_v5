"use client";

import { useEffect, useState, FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import githubBlackImage from "@/public/logo/github-black.svg";
import githubWhiteImage from "@/public/logo/github-white.svg";

type Props = {
  handleSignIn: (code: string) => void;
  clientId: string;
};

export const    GitHubSignInButton: FC<Props> = ({ handleSignIn, clientId }) => {
  const [loginCallBackURL, setLoginCallBackURL] = useState<string>("");
  const [gitCode, setGitCode] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  console.log(theme)

  useEffect(() => {
    const code = searchParams.get("code");
    if (code && !gitCode) {
      setGitCode(code);
      handleSignIn(code);
    }
  }, [searchParams, gitCode, handleSignIn]);

  useEffect(() => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setLoginCallBackURL(`${origin}/`);
  }, []);

  return (
    <div className="w-full">
      <Link
        className="w-full"
        href={`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${loginCallBackURL}&scope=read:user,user:email`}
      >
        <button className="flex h-[46px] w-full items-center justify-center gap-2 rounded border border-gray-600 bg-gray-700  p-2 text-sm font-medium text-primary-foreground duration-300 ">
          <Image
            src={theme === "dark" ? githubWhiteImage : githubBlackImage}
            height={20}
            width={20}
            alt="GitHub Logo"
          />
          <span>Sign in with GitHub</span>
        </button>
      </Link>
    </div>
  );
};
