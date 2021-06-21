import { Collapse, List, ListItem, FormControlLabel, Radio } from "@material-ui/core";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import ColorAvatar from "../../components/ColorAvatar";

import { Category as CategoryType } from "../types";
import styles from "./styles";
import Item from "./Item";

interface Props {
  category: CategoryType;
  selectCategory: (id: string) => void;
  deleteItem: (itemId: string) => void;
  checked: boolean;
}

const useStyles = makeStyles(styles);

export default function Category({ category, selectCategory, deleteItem, checked }: Props) {
  const classes = useStyles();
  const { id, name, color, items } = category;

  const [open, setOpen] = useState<boolean>(false);

  const handleExpand = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div>
      <div className={classes.category}>
        <FormControlLabel control={<Radio checked={checked} onClick={() => selectCategory(id)} />} label={name} />
        <div className={classes.colorExpandContainer}>
          <ColorAvatar color={color} />
          {open ? (
            <ExpandLess className={classes.expand} onClick={handleExpand} />
          ) : (
            <ExpandMore className={classes.expand} onClick={handleExpand} />
          )}
        </div>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items?.length
            ? items.map((item) => (
                <ListItem>
                  <Item color={color} item={item} deleteItem={deleteItem}></Item>
                </ListItem>
              ))
            : null}
        </List>
      </Collapse>
    </div>
  );
}
