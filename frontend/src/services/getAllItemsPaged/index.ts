const API_URL = import.meta.env.VITE_API_URL;
import type { QueryParamsType, ApiResponseType } from "@/types/ApiResponseType";

export async function getAllItemsPaged(apiPath: string, params?: QueryParamsType) {
  const apiUrl = new URL(`${API_URL}${apiPath}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "filter") {
          apiUrl.searchParams.set(value.column, value.value);
        } else if (Array.isArray(value)) {
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
  const data = await res.json();
  return data as ApiResponseType;
}

