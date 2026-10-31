import { useAppDispatch, useAppSelector } from "../redux";
import { setItems } from "@/stores/features/itemsSlice";
import { getAllItems } from "@/services/getAllItems";
import { useEffect } from "react";
import type { QueryParamsType } from "@/types/ApiResponseType";

export function useFetchItems(path: string, params?: QueryParamsType) {
  const dispatch = useAppDispatch();
  const header = useAppSelector((state) => state.header);
  const { page, size, q, sort } = params ?? {};

  useEffect(() => {
    let ignore = false;

    async function fetchItems() {
      const response = await getAllItems(path, {
        page,
        size,
        q,
        sort,
        ...(header.page && { page: Number(header.page) }),
        ...(header.size && { size: Number(header.size) }),
        ...(header.searchTerm && { q: header.searchTerm }),
        ...(header.sort && { sort: header.sort }),
      });
      if (!ignore) dispatch(setItems(response));
    }
    fetchItems();

    return () => {
      ignore = true;
    };
  }, [dispatch, path, header, page, size, q, sort]);
}
