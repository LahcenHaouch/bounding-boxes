import { makeStyles } from "@material-ui/core/styles";

import styles from "./styles";

interface Props {
  text?: string;
  color: string;
}

const useStyles = makeStyles(styles);

export default function ColorAvatar({ text, color }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.color} style={{ backgroundColor: color }}>
      {text}
    </div>
  );
}
