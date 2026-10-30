const API_URL = import.meta.env.VITE_API_URL;

export async function getAllItems(
  apiPath: string,
  params?: {
    page?: number;
    size?: number;
    sort?: string[] | string;
    q?: string;
  },
) {
  const apiUrl = new URL(`${API_URL}${apiPath}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((item) => apiUrl.searchParams.append(key, item));
        } else {
          apiUrl.searchParams.set(key, String(value));
        }
      }
    });
  }

  const res = await fetch(apiUrl.toString(), {
    method: "GET",
  });
  if (!res.ok) throw new Error("Error fetch");
  return await res.json();
}
