import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface PlatformButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export function PlatformButton({
  children,
  onClick,
  className,
  variant = "primary",
  size = "md",
  disabled = false,
}: PlatformButtonProps) {
  const variantStyles = {
    primary: {
      bg: "bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20",
      border: "border-primary/50",
      text: "text-primary",
      glow: "shadow-[0_0_30px_hsl(var(--primary)/0.3),0_0_60px_hsl(var(--primary)/0.1)]",
      arc: "bg-primary",
    },
    secondary: {
      bg: "bg-gradient-to-r from-secondary/20 via-secondary/30 to-secondary/20",
      border: "border-secondary/50",
      text: "text-secondary",
      glow: "shadow-[0_0_30px_hsl(var(--secondary)/0.3),0_0_60px_hsl(var(--secondary)/0.1)]",
      arc: "bg-secondary",
    },
  };

  const sizeStyles = {
    sm: "px-6 py-2 text-sm",
    md: "px-12 py-4 text-base",
    lg: "px-20 py-5 text-xl",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "group relative overflow-visible",
        "transition-all duration-300 transform",
        "hover:scale-105 active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        className
      )}
    >
      {/* Platform base with fog effect */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[120%] h-8 platform-fog" />
      
      {/* Electric arcs on sides */}
      <div className={cn(
        "absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full opacity-0 group-hover:opacity-100",
        "animate-electric transition-opacity duration-300",
        variantStyles[variant].arc
      )} />
      <div className={cn(
        "absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full opacity-0 group-hover:opacity-100",
        "animate-electric transition-opacity duration-300 delay-75",
        variantStyles[variant].arc
      )} />
      
      {/* Main button */}
      <div
        className={cn(
          "relative glass-panel rounded-lg border-2",
          "transition-all duration-300",
          variantStyles[variant].bg,
          variantStyles[variant].border,
          variantStyles[variant].glow,
          sizeStyles[size],
          "group-hover:shadow-[0_0_40px_hsl(var(--primary)/0.5),0_0_80px_hsl(var(--primary)/0.2)]"
        )}
      >
        {/* Top highlight */}
        <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
        
        {/* Bottom shadow line */}
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-background/50 to-transparent" />
        
        {/* Corner accents */}
        <div className={cn("absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 rounded-tl-lg", variantStyles[variant].border)} />
        <div className={cn("absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 rounded-tr-lg", variantStyles[variant].border)} />
        <div className={cn("absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 rounded-bl-lg", variantStyles[variant].border)} />
        <div className={cn("absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 rounded-br-lg", variantStyles[variant].border)} />
        
        {/* Text content */}
        <span className={cn(
          "relative z-10 font-bold tracking-widest uppercase",
          variantStyles[variant].text,
          "group-hover:text-glow-primary"
        )}>
          {children}
        </span>
        
        {/* Animated energy fill on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-700" />
      </div>
      
      {/* Circular glow platform underneath */}
      <div className={cn(
        "absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-2 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-opacity",
        variantStyles[variant].arc
      )} />
    </button>
  );
}
