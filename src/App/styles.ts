import { Theme } from "@material-ui/core";

const styles = (theme: Theme) => ({
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
  },
  searchContainer: {
    display: "flex",
  },
  searchInput: {
    marginLeft: theme.spacing(2),
  },
  image: {
    display: "block",
    maxWidth: "100%",
  },
});

export default styles;
