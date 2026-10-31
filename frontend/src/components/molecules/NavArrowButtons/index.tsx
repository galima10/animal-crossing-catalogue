import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setPage } from "@/stores/features/headerSlice";

export default function NavArrowButtons() {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector((state) => state.item.items?.pagination);
  function handleNextPage() {
    if (!pagination) return;
    if (!pagination?.hasNextPage) return;
    dispatch(setPage(Number(pagination?.currentPage) + 1));
  }
  function handlePrevPage() {
    if (!pagination) return;
    if (!pagination?.hasPreviousPage) return;
    dispatch(setPage(Number(pagination?.currentPage) - 1));
  }
  return (
    <ul className="paging-arrow-btns">
      <li>
        <button onClick={handlePrevPage} className="arrow-left-btn">«</button>
      </li>
      <li>
        <button onClick={handleNextPage} className="arrow-right-btn">»</button>
      </li>
    </ul>
  );
}
