import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "lightgrey",
      borderRadius: "8px",
      padding: "2px",
      color: "white",
    },
    visibility: {
      marginLeft: theme.spacing(),
      marginRight: theme.spacing(),
      color: "grey",
      cursor: "pointer",
    },
    delete: {
      color: "grey",
      cursor: "pointer",
    },
  });

export default styles;
