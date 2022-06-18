import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from 'components/Button';
import { IButtonType } from 'shared/types/commonTypes';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onCloseConfirmDialog: () => void;
  onConfirm: () => void;
  cancelLabel?: string;
  confirmLabel?: string;
  isProcessing?: boolean;
}

const ConfirmDialog: React.FC<Props> = ({
  isOpen,
  title,
  message,
  onCloseConfirmDialog,
  onConfirm,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  isProcessing = false,
}) => (
  <Dialog open={isOpen} maxWidth="sm">
    <DialogTitle className="text-color-no-primary-bg font-semibold">
      {title}
    </DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions className="border mt-4">
      <div className="px-2 py-1 flex justify-between w-full">
        <Button
          className="px-6 py-1.5 rounded-lg font-semibold"
          isSecondary
          label={cancelLabel}
          onClickHandler={onCloseConfirmDialog}
        />
        <Button
          type={IButtonType.Submit}
          className="px-8 py-1.5 rounded-lg font-semibold"
          label={confirmLabel}
          onClickHandler={onConfirm}
          isInProgress={isProcessing}
        />
      </div>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
