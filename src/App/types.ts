export interface Category {
  id: string;
  name: string;
  color: string;
  items?: Array<Item>;
}

export interface Item {
  id: string;
  name: string;
  x: string;
  y: string;
  width: string;
  height: string;
  display: boolean;
}

export interface ImageObjectDetection {
  jsonResponse: {
    OBJECT_DETECTION_JOB: {
      annotations: BoundingPoly[];
    };
  };
}

interface BoundingPoly {
  boundingPoly: BoundingPolyVertices[];
  categories: BoundingPolyCategory[];
  mid: string;
  score: null;
  type: "rectangle";
}

interface BoundingPolyCategory {
  name: string;
  confidence: 100;
}

export interface BoundingPolyVertices {
  normalizedVertices: Array<Vertice>;
}

interface Vertice {
  x: number;
  y: number;
}
