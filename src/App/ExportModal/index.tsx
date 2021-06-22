import { CopyBlock, monokaiSublime } from "react-code-blocks";
import { Dialog, DialogContent, DialogTitle, makeStyles } from "@material-ui/core";

import { Category } from "../types";
import { exportData } from "../utils";
import styles from "./styles";

interface Props {
  status: boolean;
  closeModal: () => void;
  categories: Array<Category>;
}

const useStyles = makeStyles(styles);

export default function ExportModal({ status, categories, closeModal }: Props) {
  const classes = useStyles();

  const code = JSON.stringify(exportData(categories));

  return (
    <Dialog open={status} onClose={closeModal} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Image Object Detection (bounding box)</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <CopyBlock text={code} language="javascript" theme={monokaiSublime} />
      </DialogContent>
    </Dialog>
  );
}
