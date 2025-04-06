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
        {/* SVG recreated from the exact description */}
        <svg width="70%" height="70%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g>
            {/* Left white vertical rectangle */}
            <rect x="20" y="20" width="25" height="60" fill="white" />
            
            {/* Right triangle with vertical right side, ending at 70% height */}
            <path d="M45,20 L75,20 L75,62 L45,20" fill="white" />
          </g>
        </svg>
      </div>
      {withText && (
        <span className={cn("ml-3 text-xl font-extrabold", textClassName)}>NOVELOPER</span>
      )}
    </div>
  );
}
