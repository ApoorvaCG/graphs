export interface Node {
  id: string;
  label: string;
}

export interface Edges {
  source: string;
  target: string;
}

export interface Graph {
  id: string;
  name: string;
  data: {
    nodes: Node[];
    edges: Edges[];
  };
}
