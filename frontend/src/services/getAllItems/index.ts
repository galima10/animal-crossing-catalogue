const API_URL = import.meta.env.VITE_API_URL;

export async function getAllItems(apiPath: string) {
  const apiUrl = new URL(`${API_URL}${apiPath}`);

  const res = await fetch(apiUrl.toString(), {
    method: "GET",
  });
  if (!res.ok) throw new Error("Error fetch");
  const data = await res.json();
  return data as { filterValue: string; name: string }[];
}
