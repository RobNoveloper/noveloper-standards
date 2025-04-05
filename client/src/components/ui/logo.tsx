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
        <svg width="60%" height="60%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M4 4h8v8h-8V4zm0 0h8v8L4 4z" 
            fill="white" 
            fillRule="evenodd"
          />
        </svg>
      </div>
      {withText && (
        <span className={cn("ml-3 text-xl font-extrabold", textClassName)}>NOVELOPER</span>
      )}
    </div>
  );
}
