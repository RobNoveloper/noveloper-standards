import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
  inverted?: boolean;
}

export function Logo({ 
  className, 
  textClassName,
  size = "md", 
  withText = true,
  inverted = false
}: LogoProps) {
  const sizeMap = {
    sm: "h-6 w-6",
    md: "h-8 w-8 sm:h-10 sm:w-10",
    lg: "h-12 w-12"
  };

  // Different rounded corners for inverted vs regular
  const roundedStyle = inverted ? "rounded" : "rounded-lg";

  return (
    <div className="flex items-center">
      <div className={cn(
        roundedStyle, "flex items-center justify-center", 
        inverted ? "bg-gray-400" : "bg-black", 
        sizeMap[size], 
        className
      )}>
        {/* SVG recreated based on inverted or regular mode */}
        <svg width="80%" height="80%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g>
            {/* Left rectangle - perfectly centered */}
            <rect 
              x="24" 
              y="18" 
              width="24" 
              height="64" 
              fill={inverted ? "black" : "white"} 
            />
            
            {/* Right triangle - perfectly centered */}
            <path 
              d="M 48,18 L 72,18 L 72,73 L 48,18" 
              fill={inverted ? "black" : "white"} 
            />
          </g>
        </svg>
      </div>
      {withText && (
        <span className={cn("ml-3 text-xl font-extrabold", 
          inverted ? "text-gray-400" : "",
          textClassName)}>
          <span className={inverted ? "" : "bg-gradient-to-r from-black to-indigo-600 bg-clip-text text-transparent"}>
            NOVELOPER
          </span>
        </span>
      )}
    </div>
  );
}
