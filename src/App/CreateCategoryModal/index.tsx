import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { v4 as uuidv4 } from "uuid";

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core";

import { Category } from "../types";
import styles from "./styles";

interface Props {
  status: boolean;
  closeModal: () => void;
  createCategory: (category: Category) => void;
}

const useStyles = makeStyles(styles);

const INITIAL_NAME = "";
const INITIAL_COLOR = "#f00";

export default function CreateCategoryModal({ status, closeModal, createCategory }: Props) {
  const classes = useStyles();

  const [name, setName] = useState<string>(INITIAL_NAME);
  const [color, setColor] = useState<string>(INITIAL_COLOR);

  const handleSubmit = () => {
    if (!name) {
      return;
    }

    createCategory({ id: uuidv4(), name, color });
    closeModal();
  };

  return (
    <Dialog open={status} onClose={closeModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create new category</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <TextField
          required
          id="standard-required"
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <HexColorPicker color={color} onChange={setColor} className={classes.colorPicker} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
