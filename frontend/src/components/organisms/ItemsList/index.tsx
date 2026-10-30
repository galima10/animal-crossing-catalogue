import { getAllItems } from "@/services/getAllItems";
import { useState, useEffect } from "react";
import type { ApiResponseType, QueryParamsType } from "@/types/ApiResponseType";

interface ItemsListProps {
  path: string;
  params?: QueryParamsType;
}

export default function ItemsList({ path, params }: ItemsListProps) {
  const [items, setItems] = useState<ApiResponseType["data"]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVillagers() {
      try {
        const response = await getAllItems(path, params);

        setItems(response.data);
      } catch (err) {
        setError("Impossible de récupérer les villagers.");
      } finally {
        setLoading(false);
      }
    }

    fetchVillagers();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;
  return (
    <ul>
      {items.map((item) => (
        <li>Test</li>
      ))}
    </ul>
  );
}
