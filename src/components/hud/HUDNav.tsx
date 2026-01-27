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
  { label: "COURSE", href: "/course" },
  { label: "PROJECTS", href: "/showcase" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACT", href: "/contact" },
];

export function HUDNav() {
  const location = useLocation();

  return (
    <nav className="relative z-50 flex justify-center">
      {/* Pill-shaped container with cyan glow border */}
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute -inset-1 bg-primary/20 rounded-full blur-md" />
        
        {/* Main pill container */}
        <div className="relative bg-background/40 backdrop-blur-md rounded-full border border-primary/60 shadow-[0_0_20px_hsl(var(--primary)/0.3),0_0_40px_hsl(var(--primary)/0.15)] px-6 py-2">
          {/* Inner subtle glow line at top */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <ul className="flex items-center justify-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href === "/home" && location.pathname === "/");
              
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "relative px-4 py-2 text-xs font-bold tracking-wider transition-all duration-300 block",
                      "hover:text-primary",
                      isActive 
                        ? "text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]" 
                        : "text-foreground/70"
                    )}
                  >
                    {item.label}
                    
                    {/* Laser underline for active state */}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-0.5">
                        <span className="absolute inset-0 bg-primary rounded-full" />
                        <span className="absolute inset-0 blur-sm bg-primary/80" />
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