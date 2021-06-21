import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    color: {
      borderRadius: "50%",
      height: "20px",
      width: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "10px",
    },
  });

export default styles;
