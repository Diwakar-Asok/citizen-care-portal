import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { generateSuggestion } from "../../services/openaiService";

interface AiSuggestionModalProps {
  open: boolean;
  onClose: () => void;
  onAccept: (text: string) => void;
  title: string;
  prompt: string;
}

export default function AiSuggestionModal({
  open,
  onClose,
  onAccept,
  title,
  prompt,
}: AiSuggestionModalProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const text = await generateSuggestion(prompt);
      setSuggestion(text);
    } catch (err) {
      console.error(err);
      setError(t("aiSuggestionError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pr: 2,
        }}
      >
        {t("aiWritingAssistant", { field: t(`form.${title}`) })}
        <IconButton
          onClick={onClose}
          aria-label="close"
          size="small"
          sx={{ ml: 2 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : suggestion ? (
          <TextField
            multiline
            fullWidth
            minRows={5}
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          />
        ) : (
          <Typography variant="body2">{t("aiSuggestion")}</Typography>
        )}
      </DialogContent>
      <DialogActions>
        {!suggestion && (
          <>
            {/* Close button before Generate */}
            <Button onClick={onClose}>{t("close")}</Button>
            <Button onClick={handleGenerate} variant="contained" disabled={loading}>
              {t("generate")}
            </Button>
          </>
        )}
        {suggestion && (
          <>
            <Button onClick={onClose}>{t("discard")}</Button>
            <Button
              onClick={() => {
                onAccept(suggestion);
                onClose();
              }}
              variant="contained"
            >
              {t("accept")}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
