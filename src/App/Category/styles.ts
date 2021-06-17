import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      // padding: theme.spacing(),
    },
    category: {
      display: "flex",
      alignItems: "center",
    },
    formLabel: {
      // marginLeft: theme.spacing(2),
    },
    expand: {
      cursor: "pointer",
    },
  });

export default styles;
