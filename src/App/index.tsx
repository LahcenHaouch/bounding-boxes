import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Fab, InputBase } from "@material-ui/core";
import { Add as AddIcon, Search as SearchIcon, GetApp as GetAppIcon } from "@material-ui/icons";

import CreateCategoryModal from "./CreateCategoryModal";
import ExportModal from "./ExportModal";
import { Category as CategoryType, Item } from "./types";
import styles from "./styles";
import Category from "./Category";
import D3Content from "./D3Content";

const useStyles = makeStyles(styles);

export default function App() {
  const classes = useStyles();

  const [categories, setCategories] = useState<Array<CategoryType>>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [createCategoryModalStatus, setCreateCategoryModalStatus] = useState<boolean>(false);
  const [exportModalStatus, setExportModalStatus] = useState<boolean>(false);

  const openCreateCategoryModal = () => {
    setCreateCategoryModalStatus(true);
  };
  const closeCreateCategoryModal = () => {
    setCreateCategoryModalStatus(false);
  };

  const openExportModal = () => {
    setExportModalStatus(true);
  };
  const closeExportModal = () => {
    setExportModalStatus(false);
  };

  const createCategory = (category: CategoryType) => {
    if (!categories.length) {
      setSelectedCategoryId(category.id);
    }

    setCategories((prevCategories) => [...prevCategories, category]);
  };
  const selectCategory = (id: string) => setSelectedCategoryId(id);
  const deleteCategory = (id: string) =>
    setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));

  const createItem = (item: Item) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === selectedCategoryId) {
          if (!category.items) {
            category.items = [item];
          } else {
            if (category.items.includes(item)) {
            } else {
              category.items.push(item);
            }
          }
        }
        return category;
      })
    );
  };
  const deleteItem = (categoryId: string, itemId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          if (category.items) {
            category.items = category.items.filter(({ id }) => id !== itemId);
          }
        }
        return category;
      })
    );
  };
  const switchDisplayForItem = (categoryId: string, itemId: string, display: boolean) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          if (category.items) {
            category.items = category.items.map((item) => {
              if (item.id === itemId) {
                return {
                  ...item,
                  display,
                };
              }
              return item;
            });
          }
        }
        return category;
      })
    );
  };

  const toDisplayCategories = categories.filter((category) =>
    category.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  );

  const selectedCategory = categories.find(({ id }) => id === selectedCategoryId);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        {categories.length >= 1 ? (
          <Fab className={classes.export} color="primary" aria-label="add" onClick={openExportModal}>
            <GetAppIcon />
          </Fab>
        ) : null}
        <D3Content category={selectedCategory} createItem={createItem} />
        {createCategoryModalStatus && (
          <CreateCategoryModal
            status={createCategoryModalStatus}
            closeModal={closeCreateCategoryModal}
            createCategory={createCategory}
          />
        )}
        {exportModalStatus && (
          <ExportModal status={exportModalStatus} closeModal={closeExportModal} categories={categories} />
        )}
      </div>
      <div className={classes.sideBar}>
        <div className={classes.searchContainer}>
          <div>
            <SearchIcon style={{ color: "lightgrey" }} />
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
          <Category
            checked={category.id === selectedCategoryId}
            key={category.id}
            category={category}
            selectCategory={selectCategory}
            deleteCategory={deleteCategory}
            deleteItem={deleteItem}
            switchDisplayForitem={switchDisplayForItem}
          />
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
