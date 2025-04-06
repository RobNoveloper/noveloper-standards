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
      <div className={cn("bg-black rounded-2xl flex items-center justify-center", sizeMap[size], className)}>
        {/* SVG recreated from the provided image */}
        <svg width="70%" height="70%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g>
            {/* Left rectangle */}
            <rect x="20" y="20" width="30" height="60" fill="white" />
            {/* Right triangle */}
            <polygon points="50,20 80,20 50,80" fill="white" />
          </g>
        </svg>
      </div>
      {withText && (
        <span className={cn("ml-3 text-xl font-extrabold", textClassName)}>NOVELOPER</span>
      )}
    </div>
  );
}
