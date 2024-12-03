import { http, HttpResponse } from "msw";
import graphData from "../scripts/graphsData.json";

export const handlers = [
  // Mock for getting all graphs
  http.get("/api/graphs", async () => {
    const data = HttpResponse.json(graphData);
    return data;
  }),

  // Mock for getting a specific graph
  http.get("/api/graphs/:id", async ({ params }) => {
    const { id } = params;
    const graph = graphData.find((g) => g.id === id);
    if (!graph) {
      return new HttpResponse(`error fetching graph with id:${id}`);
    }
    const data = HttpResponse.json(graph);
    return data;
  }),

  // Mock for deleting a graph
  http.delete("/api/graphs/:id", async ({ params }) => {
    const { id } = params;

    // Find the index of the graph
    const graphIndex = graphData.findIndex((graph) => graph.id === id);
    // const deletedGraph = graphData.get(id);
    // if (!deletedGraph) {
    //   return new HttpResponse(`error fetching graph with id:${id}`, {status: 404});
    // }
    // Remove the graph from the list
    graphData.splice(graphIndex, 1);
    // graphData.delete(id);
    const data = HttpResponse.json(graphData);
    return data;
  }),

  // POST handler to create a new graph
  http.post("/api/graphs", async ({ request }) => {
    const { name } = await request.json();

    // Validate input
    if (!name || name.trim() === "") {
      return new HttpResponse("Graph name is required");
    }

    // Create new graph
    const newGraph = {
      id: `grph_${Math.floor(Math.random())}`, // Generate a unique ID
      name,
      data: {}, // Initialize data as an empty object
    };

    // Add the new graph to the in-memory data
    graphData.push(newGraph);
    console.log("new graph", newGraph, graphData);

    return HttpResponse.json(newGraph, { status: 201 });
  }),

  // POST handler to create a new graph node
  http.post("/api/graph/nodes", async ({ request }) => {
    const { label, graphId } = await request.json();

    // Validate input
    if (!label || label.trim() === "") {
      return new HttpResponse("Node label is required!");
    }

    const graph = graphData.find((g) => g.id === graphId);

    if (!graph) {
      return new HttpResponse(`Graph with ID ${graphId} not found`, {
        status: 404,
      });
    }

    // Create new graph node

    const newNode = { id: `nd_${Date.now()}`, label };
    graph.data.nodes.push(newNode);

    // Add the new graph to the in-memory data
    console.log("new graph", newNode, graphData);

    return HttpResponse.json(newNode, { status: 201 });
  }),

  // Edit a node
  http.put("/api/graph/nodes/:id", async ({ params, req }) => {
    const { id } = params;
    const { label } = await req.json();
    if (!label) {
      return new HttpResponse("Label is required!", { status: 400 });
    }
    const node = graphData.nodes.find((node) => node.id === id);
    if (node) {
      node.label = label;
      return HttpResponse.json(node, { status: 201 });
    }
    return new HttpResponse(`Node not found`, { status: 404 });
  }),

  // Mock for deleting a graph node
  http.delete("/api/graph/:graphId/nodes/:nodeId", async ({ params }) => {
    const { nodeId, graphId } = params;
    console.log("delete===idd===", nodeId, graphId);

    // Find the graph
    const graph = graphData.find((g) => g.id === graphId);
    if (!graph) {
      return new HttpResponse(`Graph with id:${graphId} not found`, {
        status: 404,
      });
    }

    // Find and delete the node
    const nodeIndex = graph.data.nodes.findIndex((node) => node.id === nodeId);
    if (nodeIndex === -1) {
      return new HttpResponse(`Node with ID:${nodeId} not found`, {
        status: 404,
      });
    }
    graph.data.nodes.splice(nodeIndex, 1);
    // Remove edges involving the deleted node
    graph.data.edges = graph.data.edges.filter(
      (edge) => edge.source !== nodeId && edge.target !== nodeId
    );
    // return res(ctx.status(200), ctx.json({ message: 'Node deleted successfully' }));

    return HttpResponse.json(graphData, { status: 200 });
  }),
];
