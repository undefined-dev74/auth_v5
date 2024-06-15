import { Home, icons, Store } from "lucide-react";
export const navItems = [
  {
    path: "/dashboard/default",
    icon: Home,
    label: "Dashboard",
    activePath: "/dashboard",
  },
  {
    path: "/stores/list",
    icon: Store,
    label: "Stores",
    activePath: "/stores",
  },
];

const Icon = ({ name, color, size }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};

export default Icon;
