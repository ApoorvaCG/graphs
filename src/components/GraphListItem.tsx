import React from "react";
import { BsTrash } from "react-icons/bs";
import { IoAnalyticsOutline } from "react-icons/io5";
import { LuDot } from "react-icons/lu";

function GraphListItem({
  id,
  name,
  nodesLength,
  edgesLength,
  handleGraphClick,
  handleGraphDelete,
}: {
  id: string;
  name: string;
  nodesLength: number;
  edgesLength: number;
  handleGraphClick: Function;
  handleGraphDelete: Function;
}) {
  return (
    <>
      <li key={id} className="graph-item">
        <div
          onClick={() => handleGraphClick(id)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <span className="graph-name ">{name}</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.75rem",
              color: "#59636e",
            }}
          >
            <IoAnalyticsOutline size={18} />
            <span>{nodesLength} Nodes</span>
            <LuDot size={16} />
            <span>{edgesLength} Edges</span>
          </div>
        </div>
        <BsTrash
          title="Delete graph"
          size={14}
          cursor={"pointer"}
          color="red"
          onClick={() => handleGraphDelete(id)}
        />
      </li>
    </>
  );
}

export default GraphListItem;
