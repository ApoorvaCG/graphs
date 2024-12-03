import React, { useEffect, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { useParams, useNavigate } from "react-router-dom";
import graphData from "../scripts/graphsData.json";
import * as THREE from "three";
import { IoArrowBack } from "react-icons/io5";
import { Node, Edges } from "../types";
import { useFetchData } from "../hooks/useFetchGraphData";

interface GraphData {
  nodes: Node[];
  links: Edges[];
}

const GraphView = () => {
  const { id: graphId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [forceGraphData, setForceGraphData] = useState<GraphData | null>(null);
  const { data, loading, error } = useFetchData<{ id: string; name: string; data: {nodes:Node[], edges:Edges[]} }>(
    graphId
  );
  useEffect(() => {
    const fetchGraphData = async () => {
      if(data){
        const { nodes, edges } = data?.data;
        setForceGraphData({
          nodes: nodes.map((node: Node) => ({
            id: node.id,
            label: node.label,
          })),
          links: edges.map((edge: Edges) => ({
            source: edge.source,
            target: edge.target,
          })),
        });
        }
    };
    fetchGraphData();
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!graphData) {
    return <div>Loading graph data...</div>;
  }

  return (
    <div style={{ height: "100vh" }}>
      <div
        style={{
          padding: "10px 20px",
          width: "100%",
          borderBottom: "solid",
          borderBottomWidth: "1px",
          borderBottomColor: "#ededee",
        }}
      >
        <div
          style={{ display: "flex", gap: 4, alignItems: "center", cursor:'pointer' }}
          onClick={() => navigate("/")}
        >
          <IoArrowBack size={20} />
          Graph List
        </div>
      </div>
      <ForceGraph3D
        graphData={{
          nodes: forceGraphData?.nodes || [],
          links: forceGraphData?.links || [],
        }}
        nodeAutoColorBy="id"
        linkColor={() => "#000"}
        onNodeClick={(node) => console.log("Node clicked:", node)}
        nodeLabel="label"
        backgroundColor={"#fff"}
        nodeOpacity={1}
        linkOpacity={0.3}
        nodeThreeObject={(node: Node) => {
          const label = new THREE.Sprite(
            new THREE.SpriteMaterial({
              color: "black", 
              opacity: 1, 
            })
          );

          label.scale.set(5, 5, 1); 
          return label;
        }}
      />
    </div>
  );
};

export default GraphView;
