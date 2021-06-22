import { Category, ImageObjectDetection, BoundingPolyVertices, Item } from "./types";

export const INITIAL_DIMENSIONS = [850, 638];

export const exportData = (categories: Array<Category>): ImageObjectDetection => {
  return {
    jsonResponse: {
      OBJECT_DETECTION_JOB: {
        annotations: categories.map((category) => ({
          boundingPoly: category.items ? category.items.map((item) => getVerticesFromItem(item)) : [],
          categories: [{ confidence: 100, name: category.name }],
          mid: category.id,
          score: null,
          type: "rectangle",
        })),
      },
    },
  };
};

const getVerticesFromItem = (item: Item): BoundingPolyVertices => {
  const [imageWidth, imageHeight] = INITIAL_DIMENSIONS;
  const { width, height } = item;

  const result: BoundingPolyVertices = {
    normalizedVertices: [
      { x: (parseInt(item.x, 10) * 100) / imageWidth, y: (parseInt(item.y, 10) * 100) / imageHeight },
      { x: (parseInt(item.x, 10) * 100) / imageWidth, y: (parseInt(item.y + height, 10) * 100) / imageHeight },
      { x: (parseInt(item.x + width, 10) * 100) / imageWidth, y: (parseInt(item.y, 10) * 100) / imageHeight },
      {
        x: (parseInt(item.x + width, 10) * 100) / imageWidth,
        y: (parseInt(item.y + height, 10) * 100) / imageHeight,
      },
    ],
  };

  return result;
};
