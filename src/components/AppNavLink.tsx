import { Link } from "react-router-dom";
import { Satellite, Leaf, Clock, Calendar, Sun, Rocket, BookOpen, Globe } from "lucide-react";

const iconMap = {
  satellite: Satellite,
  leaf: Leaf,
  clock: Clock,
  calendar: Calendar,
  sun: Sun,
  rocket: Rocket,
  book: BookOpen,
  globe: Globe,
};

interface AppNavLinkProps {
  to: string;
  icon: keyof typeof iconMap;
  label: string;
  color?: string;
  active?: boolean;
}

const AppNavLink = ({ to, icon, label, color = "text-primary", active = false }: AppNavLinkProps) => {
  const Icon = iconMap[icon];
  
  return (
    <Link
      to={to}
      className={`flex items-center gap-1.5 px-2 py-1 rounded-md transition-colors ${
        active 
          ? `${color} font-medium bg-secondary/50` 
          : `text-muted-foreground hover:text-foreground`
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden xl:inline">{label}</span>
    </Link>
  );
};

export default AppNavLink;