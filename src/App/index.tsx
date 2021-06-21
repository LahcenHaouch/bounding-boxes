import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { makeStyles } from "@material-ui/core";
import { Fab, InputBase } from "@material-ui/core";
import { Add as AddIcon, Search as SearchIcon } from "@material-ui/icons";

import traffic from "../assets/traffic.jpg";
import CreateCategoryModal from "./CreateCategoryModal";
import { Category as CategoryType } from "./types";
import styles from "./styles";
import Category from "./Category";

const useStyles = makeStyles(styles);

export default function App() {
  const classes = useStyles();

  const canvasRef = useRef(null);

  const [categories, setCategories] = useState<Array<CategoryType>>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [createCategoryModalStatus, setCreateCategoryModalStatus] = useState<boolean>(false);

  useEffect(() => {
    const canvas = d3.select(canvasRef.current);

    const node = canvas.node() as any;

    if (!node) {
      return;
    }

    const svg = canvas
      .append("svg")
      .attr("height", 500)
      // .attr("width", node.getBoundingClientRect().width);
      .attr("width", 500)
      .style("background", `url(${traffic})`);

    const currentRect: any = {
      r: null,
      x0: null,
      y0: null,
    };

    svg.call(
      d3
        .drag()
        .on("start", (event, d) => {
          const { x, y } = event;

          currentRect.x0 = x;
          currentRect.y0 = y;

          currentRect.r = svg
            .append("g")
            .append("rect")
            .attr("x", currentRect.x0)
            .attr("y", currentRect.y0)
            .attr("width", 1)
            .attr("height", 1)
            .attr("class", "rect-main");
        })
        .on("drag", (event, d) => {
          const { x, y } = event;

          currentRect.r
            .attr("x", Math.min(currentRect.x0, x))
            .attr("y", Math.min(currentRect.y0, y))
            .attr("width", Math.abs(currentRect.x0 - x))
            .attr("height", Math.abs(currentRect.y0 - y));
        })
        .on("end", (event, d) => console.log(currentRect)) as any
    );
    return () => {
      const elements = d3.select(canvasRef.current).selectAll("*");

      elements.remove();
    };
  }, []);

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
        {/* <img src={traffic} alt="traffic" className={classes.image} ref={canvasRef} /> */}
        <div ref={canvasRef} />
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
