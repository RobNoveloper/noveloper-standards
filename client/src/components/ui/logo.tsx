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
      <div className={cn("bg-black rounded-lg flex items-center justify-center", sizeMap[size], className)}>
        {/* SVG recreated from the exact description */}
        <svg width="85%" height="85%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g>
            {/* Left white vertical rectangle */}
            <rect x="15" y="15" width="30" height="70" fill="white" />
            
            {/* Right triangle with vertical right side, extending longer vertically (85% height) */}
            <path d="M45,15 L85,15 L85,75 L45,15" fill="white" />
          </g>
        </svg>
      </div>
      {withText && (
        <span className={cn("ml-3 text-xl font-extrabold", textClassName)}>NOVELOPER</span>
      )}
    </div>
  );
}
