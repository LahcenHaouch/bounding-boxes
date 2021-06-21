import { Theme, createStyles } from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    color: {
      borderRadius: "50%",
      height: "20px",
      width: "20px",
    },
  });

export default styles;
