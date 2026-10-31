import { useState, type Dispatch, type SetStateAction, useEffect } from "react";
import { toCapitalize } from "@/utils/toCapitalize";
import type { QueryParamsType } from "@/types/ApiResponseType";
import { filterTableMap, filterColumnsEnumMap } from "@/constants/mapNames";
import { API_PATH } from "@/constants/apiPath";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getAllItems } from "@/services/getAllItems";
import { setOptions } from "@/stores/features/itemsSlice";
import { setFilter } from "@/stores/features/headerSlice";

export function FilterButtonModule({
  path,
  setFilterValue,
}: {
  path: { label: string; filterName: string; table?: string }[];
  setFilterValue: Dispatch<SetStateAction<QueryParamsType["filter"]>>;
}) {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useAppDispatch();
  async function fetchItems(path: string) {
    const response = await getAllItems(path);
    dispatch(setOptions(response));
  }

  return (
    <div className="header-filter-btn">
      <button onClick={() => setShowOptions(!showOptions)}>Filter</button>
      {showOptions && path && (
        <ul className="header-filter-options">
          {path.map(
            (
              column: { label: string; filterName: string; table?: string },
              index,
            ) => (
              <li key={index}>
                <button
                  onClick={async () => {
                    setShowOptions(false);
                    setFilterValue({ column: column?.filterName, value: null });
                    dispatch(setFilter(null));
                    if (column?.table) {
                      await fetchItems(API_PATH[column?.table]);
                    } else {
                      dispatch(
                        setOptions(filterColumnsEnumMap[column?.filterName]),
                      );
                    }
                  }}
                >
                  {toCapitalize(column.label)}
                </button>
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}

export function FilterModule({
  setFilterValue,
  filterValue,
}: {
  setFilterValue: Dispatch<SetStateAction<QueryParamsType["filter"]>>;
  filterValue: QueryParamsType["filter"] | null;
}) {
  const [showOptions, setShowOptions] = useState(false);
  const options = useAppSelector((state) => state.item.filterOptions);

  return (
    <div className="header-filter">
      <p>Filtered by</p>
      <button onClick={() => setShowOptions(!showOptions)}>
        <span className="header-filter-label">
          <small>
            {toCapitalize(filterTableMap[filterValue?.column]?.label)}:
          </small>
        </span>
        <span className="header-filter-value">
          <small>
            {filterValue?.value
              ? toCapitalize(
                  options?.find(
                    (option) => option.filterValue === filterValue?.value,
                  )?.name,
                )
              : "NA"}
          </small>
        </span>
        <span
          className="header-filter-clear"
          onClick={() => setFilterValue(null)}
        >
          <small>&#215;</small>
        </span>
      </button>
      {showOptions && (
        <div className="header-filter-sub-options">
          <ul>
            {options?.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setFilterValue((prev) => ({
                      ...prev,
                      value: option.filterValue,
                    }));
                    setShowOptions(false);
                  }}
                >
                  {toCapitalize(option.name)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
