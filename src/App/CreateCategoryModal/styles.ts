import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    dialogContent: {
      display: "flex",
      paddingTop: theme.spacing(2),
    },
    colorPicker: {
      marginLeft: theme.spacing(2),
    },
  });

export default styles;
