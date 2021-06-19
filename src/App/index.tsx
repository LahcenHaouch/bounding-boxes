import { Fab, InputBase } from "@material-ui/core";
import { Add as AddIcon, Search as SearchIcon } from "@material-ui/icons";
import styles from "./styles";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";

import traffic from "../assets/traffic.jpg";

import CreateCategoryModal from "./CreateCategoryModal";

import { Category as CategoryType } from "./types";

import Category from "./Category";

const useStyles = makeStyles(styles);

export default function App() {
  const classes = useStyles();

  const [categories, setCategories] = useState<Array<CategoryType>>([]);
  const [searchText, setSearchText] = useState<string>("");

  const [createCategoryModalStatus, setCreateCategoryModalStatus] = useState<boolean>(false);

  const openCreateCategoryModal = () => {
    setCreateCategoryModalStatus(true);
  };

  const closeCreateCategoryModal = () => {
    setCreateCategoryModalStatus(false);
  };

  const createCategory = (category: CategoryType) => {
    setCategories((prevCategories) => [...prevCategories, category]);
  };

  const toDisplayCategories = categories.filter((category) =>
    category.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  );

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <img src={traffic} alt="traffic" className={classes.image} />
        {createCategoryModalStatus && (
          <CreateCategoryModal
            status={createCategoryModalStatus}
            closeModal={closeCreateCategoryModal}
            createCategory={createCategory}
          />
        )}
      </div>
      <div className={classes.sideBar}>
        <div className={classes.searchContainer}>
          <div>
            <SearchIcon color="primary" />
          </div>
          <div className={classes.searchInput}>
            <InputBase
              placeholder="Search categories"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>
        </div>
        {toDisplayCategories.map((category) => (
          <Category key={category.name} category={category} />
        ))}
        <div className={classes.createButton}>
          <Fab color="primary" aria-label="add" onClick={openCreateCategoryModal}>
            <AddIcon />
          </Fab>
        </div>
      </div>
    </div>
  );
}
