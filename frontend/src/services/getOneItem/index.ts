import type { OneItemResponse } from "@/types/ApiResponseType";
const API_URL = import.meta.env.VITE_API_URL;

export async function getOneItem(apiPath: string, id: string) {
  const apiUrl = new URL(`${API_URL}${apiPath}/${id}`);

  const res = await fetch(apiUrl.toString(), {
    method: "GET",
  });
  if (!res.ok) throw new Error("Error fetch");
  const data = await res.json();
  return data.shift() as OneItemResponse;
}
