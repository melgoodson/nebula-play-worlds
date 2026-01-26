import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "HOME", href: "/home" },
  { label: "PLAYIQ AR", href: "/scan" },
  { label: "WORLDS", href: "/worlds" },
  { label: "CHALLENGES", href: "/challenges" },
  { label: "PROJECTS", href: "/showcase" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

export function HUDNav() {
  const location = useLocation();

  return (
    <nav className="relative z-50">
      {/* Main nav container with glowing pill shape */}
      <div className="relative mx-auto w-fit">
        {/* Outer glow effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 blur-xl rounded-full" />
        
        {/* Nav bar with thick glowing border */}
        <div className="relative glass-panel rounded-full px-1 py-0.5 border-2 border-primary/50 shadow-[0_0_20px_hsl(var(--primary)/0.4),inset_0_1px_0_hsl(var(--primary)/0.3)]">
          {/* Top highlight line */}
          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
          
          {/* Bottom subtle line */}
          <div className="absolute inset-x-4 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          {/* Corner glowing nodes */}
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/80 shadow-[0_0_10px_hsl(var(--primary))]" />
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/80 shadow-[0_0_10px_hsl(var(--primary))]" />
          
          <ul className="flex items-center justify-center gap-0">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === "/home" && location.pathname === "/");
              
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "relative px-5 py-2.5 text-xs font-bold tracking-widest transition-all duration-300 block",
                      "hover:text-primary hover:text-glow-primary",
                      isActive 
                        ? "text-primary text-glow-primary" 
                        : "text-foreground/80"
                    )}
                  >
                    {item.label}
                    
                    {/* Laser underline for active state */}
                    {isActive && (
                      <span className="absolute bottom-1 left-3 right-3 h-0.5">
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent" />
                        <span className="absolute inset-0 blur-sm bg-primary" />
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
