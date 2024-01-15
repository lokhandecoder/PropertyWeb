import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({ isOpen, onClose, onDelete }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="delete-confirmation-dialog">
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this property?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDelete} color="secondary">
          Yes, Delete
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
