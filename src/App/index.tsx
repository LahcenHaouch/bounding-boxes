import { makeStyles } from "@material-ui/core/styles";

import {
  ListItemIcon,
  ListItemText,
  ListItem,
  InputBase,
} from "@material-ui/core";
import { Add as AddIcon, Search as SearchIcon } from "@material-ui/icons";
import styles from "./styles";
import { useState } from "react";

import traffic from "../assets/traffic.jpg";

import CreateCategoryModal from "./CreateCategoryModal";
import Category from "./Category";

const useStyles = makeStyles(styles);

export default function App() {
  const classes = useStyles();

  const [createCategoryModalStatus, setCreateCategoryModalStatus] =
    useState<boolean>(false);

  const openCreateCategoryModal = () => {
    setCreateCategoryModalStatus(true);
  };

  const closeCreateCategoryModal = () => {
    setCreateCategoryModalStatus(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <img src={traffic} alt="traffic" className={classes.image} />
        <CreateCategoryModal
          status={createCategoryModalStatus}
          closeModal={closeCreateCategoryModal}
        />
      </div>
      <div className={classes.sideBar}>
        <div className={classes.searchContainer}>
          <div>
            <SearchIcon color="primary" />
          </div>
          <div className={classes.searchInput}>
            <InputBase placeholder="Search in categories" />
          </div>
        </div>
        <ListItem button onClick={openCreateCategoryModal}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="New category" />
        </ListItem>
        <Category category={{ name: "test", color: "pink" }}></Category>
      </div>
    </div>
  );
}
