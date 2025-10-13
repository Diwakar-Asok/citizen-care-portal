import { useEffect } from "react";
import i18n from "i18next";
import { Button } from "@mui/material";

export default function LanguageSwitcher() {
  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };

  useEffect(() => {
    const saved = localStorage.getItem("lang") || "en";
    i18n.changeLanguage(saved);
  }, []);

  return (
    <Button
      variant="outlined"
      size="small"
      onClick={toggleLang}
      sx={{ position: "relative" }}
    >
      {i18n.language === "en" ? "العربية" : "English"}
    </Button>
  );
}
