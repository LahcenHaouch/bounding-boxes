import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: "100%",
    },
    content: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "lightgrey",
    },
    sideBar: {
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
    },
    searchContainer: {
      display: "flex",
      paddingRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    searchInput: {
      marginLeft: theme.spacing(2),
    },
    createButton: {
      marginTop: "auto",
      display: "flex",
      justifyContent: "center",
    },
    image: {
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%",
    },
    export: {
      position: "absolute",
      top: "30px",
      right: "300px",
    },
  });

export default styles;
