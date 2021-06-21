import { makeStyles } from "@material-ui/core/styles";
import { Visibility, Delete } from "@material-ui/icons";

import { Item as ItemType } from "../../types";
import ColorAvatar from "../../../components/ColorAvatar";
import styles from "./styles";

interface Props {
  color: string;
  item: ItemType;
  categoryId: string;
  deleteItem: (categoryId: string, itemId: string) => void;
}

const useStyles = makeStyles(styles);

export default function Item({ color, item, categoryId, deleteItem }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ColorAvatar color={color} text={item.name} />
      <Visibility className={classes.visibility} />
      <Delete className={classes.delete} onClick={() => deleteItem(categoryId, item.id)} />
    </div>
  );
}
