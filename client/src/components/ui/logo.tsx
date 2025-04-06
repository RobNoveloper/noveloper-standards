import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  textClassName?: string;
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export function Logo({ 
  className, 
  textClassName,
  size = "md", 
  withText = true 
}: LogoProps) {
  const sizeMap = {
    sm: "h-6 w-6",
    md: "h-8 w-8 sm:h-10 sm:w-10",
    lg: "h-12 w-12"
  };

  return (
    <div className="flex items-center">
      <div className={cn("bg-black rounded-xl flex items-center justify-center", sizeMap[size], className)}>
        <svg width="70%" height="70%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {/* Updated logo to match the exact design */}
          <g>
            {/* Left rectangle */}
            <rect x="4" y="4" width="7" height="16" fill="white" />
            {/* Triangle */}
            <polygon points="11,4 20,4 11,20" fill="white" />
          </g>
        </svg>
      </div>
      {withText && (
        <span className={cn("ml-3 text-xl font-extrabold", textClassName)}>NOVELOPER</span>
      )}
    </div>
  );
}
