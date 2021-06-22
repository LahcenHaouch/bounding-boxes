import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    dialogContent: {
      display: "flex",
      paddingTop: theme.spacing(),
    },
  });

export default styles;
