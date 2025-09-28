import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';

const ConfirmDialog = ({ 
  visible, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning' // 'warning', 'danger', 'info'
}) => {
  const getIconClass = () => {
    switch (type) {
      case 'danger':
        return 'k-icon k-i-warning';
      case 'info':
        return 'k-icon k-i-info';
      default:
        return 'k-icon k-i-question';
    }
  };

  const getConfirmButtonLook = () => {
    switch (type) {
      case 'danger':
        return 'primary';
      default:
        return 'primary';
    }
  };

  if (!visible) return null;

  return (
    <Dialog
      title={title}
      onClose={onClose}
      width={400}
    >
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <span className={getIconClass()} style={{ fontSize: '24px', color: '#ff6b35' }}></span>
        <p style={{ margin: 0, fontSize: '16px' }}>{message}</p>
      </div>

      <DialogActionsBar>
        <Button onClick={onClose} look="flat">
          {cancelText}
        </Button>
        <Button onClick={onConfirm} look={getConfirmButtonLook()}>
          {confirmText}
        </Button>
      </DialogActionsBar>
    </Dialog>
  );
};

export default ConfirmDialog;