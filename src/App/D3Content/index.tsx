import { useRef, useEffect } from "react";
import * as d3 from "d3";

import traffic from "../../assets/traffic.jpg";
import { Category } from "../types";

interface Props {
  category?: Category;
}

export default function D3Content({ category }: Props) {
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
  }, [category]);

  return <div ref={canvasRef} />;
}
