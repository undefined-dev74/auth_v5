import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex h-full flex-col item-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
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
    </main>
  );
}
