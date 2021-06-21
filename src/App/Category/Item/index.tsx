import { makeStyles } from "@material-ui/core/styles";
import { Visibility, Delete } from "@material-ui/icons";

import { Item as ItemType } from "../../types";
import ColorAvatar from "../../../components/ColorAvatar";
import styles from "./styles";

interface Props {
  color: string;
  item: ItemType;
}

const useStyles = makeStyles(styles);

export default function Item({ color, item }: Props) {
  const classes = useStyles();

  const name = item.id.substring(item.id.length - 2);

  console.log(item.id);

  return (
    <div className={classes.root}>
      <ColorAvatar color={color} text={name} />
      <Visibility className={classes.visibility} />
      <Delete className={classes.delete} />
    </div>
  );
}
