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
      {/* Minimal horizontal nav bar */}
      <div className="relative mx-auto w-fit">
        {/* Subtle glass background */}
        <div className="relative bg-background/30 backdrop-blur-sm rounded-lg px-2 py-1">
          {/* Subtle bottom glow line */}
          <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          
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
                        ? "text-primary text-glow-primary" 
                        : "text-foreground/70"
                    )}
                  >
                    {item.label}
                    
                    {/* Laser underline for active state */}
                    {isActive && (
                      <span className="absolute bottom-0.5 left-2 right-2 h-0.5">
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
