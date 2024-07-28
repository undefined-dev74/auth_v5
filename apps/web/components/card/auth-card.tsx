
import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

type AuthCardProps = {
  children?: ReactNode;
  title: string;
  [key: string]: any; // This replaces the 'other' prop
};

const AuthCard = ({ children, title }: AuthCardProps) => (
  <Card className="bg-transparent rounded-lg overflow-hidden border-none">
    <div className="px-8 py-6">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </div>
    
  </Card>
);

export default AuthCard;
