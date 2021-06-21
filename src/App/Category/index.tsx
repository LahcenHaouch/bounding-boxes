import { Collapse, List, ListItem, ListItemIcon, ListItemText, FormControlLabel, Radio } from "@material-ui/core";
import { useState } from "react";
import { StarBorder, ExpandLess, ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import ColorAvatar from "../../components/ColorAvatar";

import { Category as CategoryType } from "../types";
import styles from "./styles";

interface Props {
  category: CategoryType;
  selectCategory: (id: string) => void;
  checked: boolean;
}

const useStyles = makeStyles(styles);

export default function Category({ category, selectCategory, checked }: Props) {
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
          <ListItem button>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}
