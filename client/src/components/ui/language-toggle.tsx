import { useLanguage, Language } from "@/contexts/language-context";
import { useTranslation } from "@/translations";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
  variant?: "default" | "minimal";
}

export function LanguageToggle({ className, variant = "default" }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation(language);

  const toggleLanguage = () => {
    const newLanguage: Language = language === "en" ? "nl" : "en";
    setLanguage(newLanguage);
  };

  if (variant === "minimal") {
    return (
      <button
        onClick={toggleLanguage}
        className={cn(
          "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
          className
        )}
      >
        {language === "en" ? "NL" : "EN"}
      </button>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "text-sm font-medium rounded-full px-3 py-1 transition-colors",
          language === "en" 
            ? "bg-primary text-white hover:bg-primary hover:text-white cursor-default" 
            : "text-gray-800 bg-white hover:bg-gray-200 cursor-pointer"
        )}
      >
        {t("languageToggle.en")}
      </button>
      <button
        onClick={() => setLanguage("nl")}
        className={cn(
          "text-sm font-medium rounded-full px-3 py-1 transition-colors",
          language === "nl" 
            ? "bg-primary text-white hover:bg-primary hover:text-white cursor-default" 
            : "text-gray-800 bg-white hover:bg-gray-200 cursor-pointer"
        )}
      >
        {t("languageToggle.nl")}
      </button>
    </div>
  );
}