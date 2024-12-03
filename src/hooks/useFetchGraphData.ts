import { useState, useEffect } from "react";
import { API_URL } from "../constants";

type FetchGraphData<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export const useFetchData = <T,>(
  id?: string | null
): FetchGraphData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const endpoint = id ? `${API_URL}/${id}` : API_URL;
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ id]);

  return { data, loading, error };
};
