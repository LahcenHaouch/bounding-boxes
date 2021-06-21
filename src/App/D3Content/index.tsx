import { useRef, useEffect } from "react";
import * as d3 from "d3";

import traffic from "../../assets/traffic.jpg";
import { Category, Item } from "../types";

interface Props {
  category?: Category;
  createItem: (item: Item) => void;
}

export default function D3Content({ category, createItem }: Props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = d3.select(canvasRef.current);

    const elements = canvas.selectAll("*");
    elements.remove();

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

    if (!category) {
      return;
    }

    category.items?.forEach(({ x, y, width, height }) =>
      svg
        .append("g")
        .append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height)
        .attr("class", "rect-main")
        .style("stroke", category.color)
    );

    const currentRect: any = {
      r: null,
      x0: null,
      y0: null,
      x: null,
      y: null,
      width: null,
      height: null,
    };

    svg.call(
      d3
        .drag()
        .on("start", (event) => {
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
            .attr("class", "rect-main")
            .style("stroke", category.color);
        })
        .on("drag", (event) => {
          const { x, y } = event;

          const calculatedX = Math.min(currentRect.x0, x);
          const calculatedY = Math.min(currentRect.y0, y);
          const width = Math.abs(currentRect.x0 - x);
          const height = Math.abs(currentRect.y0 - y);

          currentRect.x = calculatedX;
          currentRect.y = calculatedY;
          currentRect.width = width;
          currentRect.height = height;

          currentRect.r.attr("x", calculatedX).attr("y", calculatedY).attr("width", width).attr("height", height);
        })
        .on("end", (event) => {
          let idAddon = 1;

          if (category.items?.length) {
            idAddon = category.items.length + 1;
          }

          createItem({
            id: category.id + category.name[0].toUpperCase() + idAddon,
            x: currentRect.x,
            y: currentRect.y,
            width: currentRect.width,
            height: currentRect.height,
          });
        }) as any
    );
    return () => {
      const elements = d3.select(canvasRef.current).selectAll("*");

      elements.remove();
    };
  }, [category, createItem]);

  return <div ref={canvasRef} />;
}
