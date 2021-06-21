import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff, Delete } from "@material-ui/icons";

import { Item as ItemType } from "../../types";
import ColorAvatar from "../../../components/ColorAvatar";
import styles from "./styles";

interface Props {
  color: string;
  item: ItemType;
  categoryId: string;
  deleteItem: (categoryId: string, itemId: string) => void;
  switchDisplayForItem: (categoryId: string, itemId: string, display: boolean) => void;
}

const useStyles = makeStyles(styles);

export default function Item({ color, item, categoryId, deleteItem, switchDisplayForItem }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ColorAvatar color={color} text={item.name} />
      {item.display ? (
        <VisibilityOff
          className={classes.visibility}
          onClick={() => switchDisplayForItem(categoryId, item.id, false)}
        />
      ) : (
        <Visibility className={classes.visibility} onClick={() => switchDisplayForItem(categoryId, item.id, true)} />
      )}
      <Delete className={classes.delete} onClick={() => deleteItem(categoryId, item.id)} />
    </div>
  );
}
