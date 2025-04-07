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
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
        className={cn(
          "rounded-full px-3",
          language !== "en" && "text-gray-800 hover:text-gray-900 bg-white hover:bg-gray-100"
        )}
      >
        {t("languageToggle.en")}
      </Button>
      <Button
        variant={language === "nl" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("nl")}
        className={cn(
          "rounded-full px-3",
          language !== "nl" && "text-gray-800 hover:text-gray-900 bg-white hover:bg-gray-100"
        )}
      >
        {t("languageToggle.nl")}
      </Button>
    </div>
  );
}