import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setPage } from "@/stores/features/headerSlice";

export default function NavIndicator() {
  const dispatch = useAppDispatch();
  const page = useAppSelector(
    (state) => state.item.items?.pagination.currentPage,
  );
  const totalPage = useAppSelector(
    (state) => state.item.items?.pagination.totalPages,
  );
  return (
    <div className="paging-indicator">
      <input
        type="number"
        value={page ?? ""}
        max={totalPage}
        onChange={(e) => {
          const value = e.target.value;
          if (Number(value) > totalPage) dispatch(setPage(Number(totalPage)));
          else dispatch(setPage(Number(value)));
        }}
      />
      / {totalPage}
    </div>
  );
}
