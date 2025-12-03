// src/components/common/ConfirmDeleteDialog.jsx

import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

function ConfirmDeleteDialog({ open, onClose, onConfirm, title, message }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>{title || "Xác nhận xóa"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message || "Bạn có chắc chắn muốn xóa không? Hành động này không thể hoàn tác."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;