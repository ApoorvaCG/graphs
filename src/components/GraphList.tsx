import React, { useEffect, useState } from "react";
import graphData from "../scripts/graphsData.json";
import CreateGraph from "./CreateGraph";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import GraphListItem from "./GraphListItem";
import { Graph } from "../types";
import { useFetchData } from "../hooks/useFetchGraphData";
import { useDeleteGraph } from "../hooks/useDeleteGraphData";

const GraphList = () => {
  const [graphs, setGraphs] = useState<Graph[]>([]);
  const [selectedGraphId, setSelectedGraphId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { data, loading, error } = useFetchData<Graph[]>();
  const { deleteItem, deleteLoading, deleteError, deleteMessage } = useDeleteGraph();

  useEffect(() => {
    const fetchGraphs = async () => {
      if (data) {
        setGraphs(data);
      }
    };
    fetchGraphs();
  }, [data]);

  const handleGraphClick = (id: string) => {
    navigate(`/graph/${id}`);
  };

  // Handle search input changes
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter the graphs based on node labels
    const filtered: Graph[] = graphData.filter((graph) =>
      graph.data.nodes.some((node) => node.label.toLowerCase().includes(term))
    );
    setGraphs(filtered);
  };

  const deleteGraph = async () => {
    if (!selectedGraphId) return;
    deleteItem(selectedGraphId);
    // Update the state by removing the deleted graph
    setGraphs((prevGraphs) =>
      prevGraphs.filter((graph) => graph.id !== selectedGraphId)
    );
    closeDeleteModal();
  };

  const handleGraphCreated = (newGraph: Graph) => {
    setGraphs((prevGraphs) => [...prevGraphs, newGraph]);
  };

  const openModal = () => setIsModalOpen(true);

  const openDeleteModal = (id: string) => {
    setSelectedGraphId(id);
    setIsDeleteModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const closeDeleteModal = () => {
    setSelectedGraphId(null); // Clear the selected ID
    setIsDeleteModalOpen(false);
  };

  if (loading) return <div>Loading graphs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="graph-container">
        <header className="graph-header">
          <h1 className="title">Your Graphs</h1>
          <div className="actions">
            <input
              type="text"
              className="search-bar"
              placeholder="Search graphs..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="create-graph-btn" onClick={openModal}>
              Create Graph
            </button>
          </div>
        </header>
        {!loading && !graphs.length && <p>No results found</p>}
        {!deleteLoading && deleteError && (
          <p style={{ color: "#cc0000" }}>
            {deleteMessage}
          </p>
        )}
        {!deleteLoading && !deleteError && (
          <div style={{ padding: "10px", color: "green" }}>{deleteMessage}</div>
        )}

        <ul className="graph-list">
          {graphs.map((graph) => (
            <div key={graph.id}>
              <GraphListItem
                id={graph.id}
                name={graph.name}
                nodesLength={graph.data.nodes?.length || 0}
                edgesLength={graph.data.edges?.length || 0}
                handleGraphClick={handleGraphClick}
                handleGraphDelete={openDeleteModal} //{deleteGraph}
              />
            </div>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <CreateGraph
              onGraphCreated={handleGraphCreated}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div style={{ fontSize: "24px", fontWeight: 600 }}>
                Delete Graph
              </div>
              <IoClose size={20} onClick={closeDeleteModal} cursor={"pointer"} />
            </div>
            <div style={{ fontSize: "14px", fontWeight: 400 }}>
              Are you sure, you want to delete this graph?
            </div>
            <div className="modal-buttons">
              <button
                className="modal-button modal-button-yes"
                onClick={deleteGraph}
              >
                Yes
              </button>
              <button
                className="modal-button modal-button-no"
                onClick={closeDeleteModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      <div></div>
    </>
  );
};

export default GraphList;
