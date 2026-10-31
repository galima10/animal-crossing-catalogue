import { toCapitalize } from "@/utils/toCapitalize";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { addSort, removeSort } from "@/stores/features/headerSlice";

export default function SortButton({
  label,
  sorterName,
}: {
  label: string;
  sorterName: string;
}) {
  const dispatch = useAppDispatch();
  const sort = useAppSelector((state) => state.header.sort);
  const currentSorts = !sort ? [] : typeof sort === "string" ? [sort] : sort;

  const currentSort = currentSorts.find((item) =>
    item.startsWith(`${sorterName}:`),
  );

  const sortState = currentSort?.endsWith(":asc")
    ? "ASC"
    : currentSort?.endsWith(":desc")
      ? "DESC"
      : "";

  function handleChangeSort() {
    dispatch(addSort(sorterName));
  }
  return (
    <div>
      <button
        onClick={handleChangeSort}
        className={sortState ? "active" : null}
      >
        <small>
          {toCapitalize(label)}{" "}
          {sortState === "ASC" ? "▼" : sortState === "DESC" ? "▲" : "+"}
        </small>
      </button>
    </div>
  );
}
