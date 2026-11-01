import { getAllItems } from "@/services/getAllItems";
import { useAppDispatch } from "../redux";
import { setOptions } from "@/stores/features/itemsSlice";

export function useFetchFilterOptions(path: string) {
  const dispatch = useAppDispatch();
  async function fetchItems() {
    const response = await getAllItems(path);
    dispatch(setOptions(response));
  }
  fetchItems();
}
