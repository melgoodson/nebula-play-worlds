import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface HoloIconProps {
  icon: LucideIcon;
  label: string;
  className?: string;
  color?: "primary" | "secondary" | "accent" | "tertiary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function HoloIcon({
  icon: Icon,
  label,
  className,
  color = "primary",
  size = "md",
  onClick,
}: HoloIconProps) {
  const colorStyles = {
    primary: {
      icon: "text-primary",
      glow: "shadow-[0_0_20px_hsl(var(--primary)/0.4)]",
      base: "bg-primary/30",
    },
    secondary: {
      icon: "text-secondary",
      glow: "shadow-[0_0_20px_hsl(var(--secondary)/0.4)]",
      base: "bg-secondary/30",
    },
    accent: {
      icon: "text-accent",
      glow: "shadow-[0_0_20px_hsl(var(--accent)/0.4)]",
      base: "bg-accent/30",
    },
    tertiary: {
      icon: "text-tertiary",
      glow: "shadow-[0_0_20px_hsl(var(--tertiary)/0.4)]",
      base: "bg-tertiary/30",
    },
  };

  const sizeStyles = {
    sm: { container: "w-16 h-16", icon: 24, text: "text-xs" },
    md: { container: "w-20 h-20", icon: 32, text: "text-sm" },
    lg: { container: "w-24 h-24", icon: 48, text: "text-sm" },
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center gap-3 transition-transform duration-300",
        "hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg",
        className
      )}
    >
      {/* Hologram container */}
      <div className={cn("relative", sizeStyles[size].container)}>
        {/* Outer glow ring */}
        <div className={cn(
          "absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          colorStyles[color].glow
        )} />
        
        {/* Icon container with glass effect */}
        <div className={cn(
          "relative w-full h-full rounded-lg glass-panel border border-hud-glass-border/30",
          "flex items-center justify-center overflow-hidden",
          "group-hover:border-hud-glass-border/60 transition-colors duration-300"
        )}>
          {/* Scanline effect */}
          <div className="absolute inset-0 opacity-30 scanlines" />
          
          {/* Icon */}
          <Icon 
            size={sizeStyles[size].icon} 
            className={cn(
              colorStyles[color].icon,
              "relative z-10 transition-all duration-300",
              "group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_currentColor]"
            )} 
          />
          
          {/* Holographic shimmer on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Projected base disk */}
        <div className={cn(
          "absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-1 rounded-full blur-sm",
          colorStyles[color].base
        )} />
        
        {/* Additional glow lines */}
        <div className={cn(
          "absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/5 h-0.5 rounded-full blur-md opacity-60",
          colorStyles[color].base
        )} />
      </div>
      
      {/* Label */}
      <span className={cn(
        "font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-300",
        sizeStyles[size].text
      )}>
        {label}
      </span>
    </button>
  );
}
