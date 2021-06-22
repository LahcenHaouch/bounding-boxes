import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    category: {
      display: "flex",
      alignItems: "center",
    },
    colorExpandContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      marginLeft: theme.spacing(2),
      width: "100%",
    },
    colorSelected: {
      borderRadius: "50%",
      height: "20px",
      width: "20px",
    },
    expand: {
      cursor: "pointer",
    },
    delete: {
      cursor: "pointer",
      color: "red",
    },
  });

export default styles;
