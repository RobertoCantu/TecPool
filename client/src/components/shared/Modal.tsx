// UI

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';

 type ModalProps = {
  open: boolean,
  close: () => void,
  title: string,
  subtitle?: string,
  dialogContent?: () => JSX.Element,
  CTA: any,
}

export const Modal = ({ close, dialogContent, CTA, open, title }: ModalProps) => {

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={close}
    >
      <Stack sx={{justifyContent: 'center', alignItems: 'center'}}>
        <DialogTitle sx={{ textAlign: 'center' }}>
          <Typography variant="h4">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{width: '100%'}}>{dialogContent && dialogContent()}</DialogContent>
        <DialogActions sx={{width: '100%'}}>{CTA}</DialogActions>
      </Stack>
    </Dialog>
  );
}
