import BottomGradient from "@/components/bottom-gradient";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <>
      <div className="h-full w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-5">
          <h1 className="relative z-10 text-lg md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Investment Management and Tracking Made Easy
          </h1>
          <h2 className="bg-clip-text my-2  md:text-1xl text-transparent text-neutral-600  text-center font-sans font-bold">
            Monitor, Visualize, and Optimize Your Investments Efficiently
          </h2>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Get started in just three steps, effortlessly track your
            investments, and experience seamless adoption in days, not weeks.
          </p>
          <div className="w-full my-3 flex justify-center items-center">
            <Button className=" z-20 w-[15rem] bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
              <Link href="/auth/login">Login &rarr;</Link>
              <BottomGradient />
            </Button>
          </div>
        </div>
        <BackgroundBeams />
      </div>
      {/* <main className="flex h-full flex-col item-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
        <div className="space-y-6">
          <h1
            className={cn(
              "text-6xl font-semibold text-dark drop-shadow-sm",
              font.className
            )}
          >
            Auth
          </h1>
          <p className="text-dark text-lg">A simple authentication service</p>
          <div>
            <LoginButton>
              <Button variant="secondary" size="lg">
                Sign in
              </Button>
            </LoginButton>
          </div>
        </div>
      </main> */}
    </>
  );
}
