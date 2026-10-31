import { useAppDispatch, useAppSelector } from "../redux";
import { setItems } from "@/stores/features/itemsSlice";
import { getAllItemsPaged } from "@/services/getAllItemsPaged";
import { useEffect } from "react";
import type { QueryParamsType } from "@/types/ApiResponseType";

export function useFetchItems(path: string, params?: QueryParamsType) {
  const dispatch = useAppDispatch();
  const header = useAppSelector((state) => state.header);
  const { page, size, q, sort, filter } = params ?? {};

  useEffect(() => {
    let ignore = false;

    async function fetchItems() {
      const response = await getAllItemsPaged(path, {
        page,
        size,
        q,
        sort,
        filter,
        ...(header.page && { page: Number(header.page) }),
        ...(header.size && { size: Number(header.size) }),
        ...(header.searchTerm && { q: header.searchTerm }),
        ...(header.sort && { sort: header.sort }),
        ...(header.filter && { filter: header.filter})
      });
      if (!ignore) dispatch(setItems(response));
    }
    fetchItems();

    return () => {
      ignore = true;
    };
  }, [dispatch, path, header, page, size, q, sort, filter]);
}
