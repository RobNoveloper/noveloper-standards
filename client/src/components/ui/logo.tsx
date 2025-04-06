import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  inverted?: boolean;
}

export function Logo({ 
  className,
  size = "md", 
  withText = true,
  inverted = false
}: LogoProps) {
  const sizeMap = {
    sm: "h-6",
    md: "h-8 sm:h-10",
    lg: "h-12"
  };

  // Use the right logo based on whether it's inverted
  const logoSrc = inverted 
    ? "/noveloper-logo-inverted.svg" 
    : "/noveloper-logo.svg";

  return (
    <div className="flex items-center">
      <img 
        src={logoSrc} 
        alt="Noveloper Logo" 
        className={cn(
          sizeMap[size],
          // If withText is false, we'd need to crop the image somehow
          // For now, we'll just keep the full logo 
          className
        )} 
      />
    </div>
  );
}
