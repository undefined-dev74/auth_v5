import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { PanelLeft } from "lucide-react";
import ProfileSection from "./ProfileSection";

interface HeaderProps {
  isCollapsed: boolean;
}

const Header = ({ isCollapsed }: HeaderProps) => {
  return (
    <div
      className={cn(
        "sticky top-0 z-50  flex flex-1 items-center h-14 shadow-md gap-4 border-b border-l border-border/40 bg-background/05 backdrop-blur supports-[backdrop-filter]:bg-background/60 pr-2",
        isCollapsed ? "w-[calc(100%-52px)]" : "w-full"
      )}
    >
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
      </Sheet>
      <div className="flex ml-2 justify-center items-center gap-2">
        <ProfileSection />
      </div>
    </div>
  );
};

export default Header;
