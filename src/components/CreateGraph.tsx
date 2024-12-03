import React, { FC, FormEvent, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Graph } from '../types';
import { API_URL } from "../constants";

interface CreateGraphProps {
  onGraphCreated: (graph: Graph) => void;
  closeModal: () => void;
}

const CreateGraph: FC<CreateGraphProps> = ({ onGraphCreated, closeModal }) =>  {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateGraph = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Graph name is required");
      return;
    } else {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.message || "Failed to create graph herer");
          setIsLoading(false);
          return;
        }

        const newGraph: Graph = await response.json();
        onGraphCreated(newGraph); 
        setName(""); 
      } catch (err) {
        setError("Failed to create graph haii");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div style={{ fontSize: "24px", fontWeight: 600 }}>
          Create a New Graph
        </div>
        <IoClose size={20} onClick={closeModal} cursor={"pointer"} />
      </div>
      <form onSubmit={(e)=>handleCreateGraph(e)}>
        <label>
          Name:
          <input
            type="text"
            placeholder="Enter graph name"
            style={{ outline: "none" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <span style={{ color: "red" }}>{error}</span>}
        </label>

        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    </>
  );
};

export default CreateGraph;
