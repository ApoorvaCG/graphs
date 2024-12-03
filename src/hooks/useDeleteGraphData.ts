import { useState } from "react";
import { API_URL } from "../constants";

export const useDeleteGraph = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const deleteItem = async (id: string): Promise<void> => {
    setDeleteLoading(true);
    setDeleteError(null);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete the graph");
      }
    } catch (err: any) {
      setDeleteError(err.message || "An error occurred while deleting the graph");
    } finally {
      setDeleteLoading(false);
    }
  };

  return { deleteItem, deleteLoading, deleteError };
};
