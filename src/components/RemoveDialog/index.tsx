import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface RemoveDialogProps {
  open: boolean;
  action: () => void;
  onClose: () => void;
}

export default function RemoveDialog({
  open,
  onClose,
  action,
}: RemoveDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <DialogTitle
        sx={{ typography: { xs: "h6", md: "h4" }, textAlign: "center" }}
      >
        Deseja realmente remover?
      </DialogTitle>
      <DialogActions sx={{ mt: { xs: 1, md: 5 } }}>
        <Button
          variant="outlined"
          color="error"
          size="large"
          onClick={action}
          sx={{ mr: 1 }}
        >
          SIM
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={onClose}
        >
          NÃO
        </Button>
      </DialogActions>
    </Dialog>
  );
}
