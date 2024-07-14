import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

const Header = ({ label }: HeaderProps) => {
  const pathname = usePathname();

  const mapHeaderText: Record<string, string> = {
    "/auth/reset": "Reset",
    "/auth/login": "Login",
    "/auth/register": "Register",
  };

  return (
    <div className="w-full flex flex-col gap-y-4 items-center">
      <h1 className={cn("text-3xl font-semibold", font.className)}>
        {mapHeaderText[pathname]}
      </h1>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};

export default Header;
