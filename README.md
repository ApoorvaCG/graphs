Graphs App

This is a React-based application that allows users to create, view, and manage graphs with nodes and edges. It supports operations such as adding and deleting graphs, as well as searching for graphs by node labels. The app uses the react-force-graph-3d library for rendering interactive 3D graph visualizations.

Features,

- Search functionality: Search graphs by node labels.
- 3D Graph visualization: Use react-force-graph-3d to render graphs interactively.
- Modal-based UI: Modals for creating graphs and confirming deletions.

using MSW for mocking the backend API,\

`if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}`

Run the Application,

`npm start`

The app will be available at http://localhost:3000.
