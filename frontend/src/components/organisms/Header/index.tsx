import TabButton from "@/components/atoms/TabButton";
import { TAB_PATHS } from "@/constants/navigationPath";
import AppSVG from "@/components/atoms/AppSvg";
import { useLocation } from "react-router-dom";
import { allowedSort } from "@/constants/allowedSortColumns";
import { useAppDispatch } from "@/hooks/redux";
import {
  setSearchTerm,
  setFilter,
  setSize,
  clearSort,
} from "@/stores/features/headerSlice";
import type { ChangeEvent } from "react";
import { useState } from "react";
import SortButton from "@/components/atoms/SortButton";
import SizeModule from "@/components/molecules/SizeModule";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const pathname = useLocation().pathname.replace(/^\//, "");
  const dispatch = useAppDispatch();

  function handleOnSearchTerm(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    dispatch(setSearchTerm(value));
    setSearchValue(value);
  }

  function resetHeaderActions() {
    setSearchValue("");
    dispatch(setSearchTerm(null));
    dispatch(setFilter(null));
    dispatch(clearSort());
  }
  return (
    <header>
      <div className="header-action-btn">
        <ul>
          <li>
            <TabButton
              name="all"
              path={TAB_PATHS.all}
              onClick={resetHeaderActions}
            />
          </li>
          <li>
            <TabButton
              name="villager"
              path={TAB_PATHS.villagers}
              onClick={resetHeaderActions}
            />
          </li>
          <li>
            <TabButton
              name="furniture"
              path={TAB_PATHS.furnitures}
              onClick={resetHeaderActions}
            />
          </li>
          <li>
            <TabButton
              name="insect"
              path={TAB_PATHS.insects}
              onClick={resetHeaderActions}
            />
          </li>
          <li>
            <TabButton
              name="fish"
              path={TAB_PATHS.fishs}
              onClick={resetHeaderActions}
            />
          </li>
          <li>
            <TabButton
              name="seaCreature"
              path={TAB_PATHS.seaCreatures}
              onClick={resetHeaderActions}
            />
          </li>
        </ul>
        <div className="header-search-filter-container">
          {pathname !== "all-items" && (
            <button className="header-filter-btn">Filter</button>
          )}

          <div className="header-search-bar">
            <input
              type="text"
              placeholder=""
              onChange={handleOnSearchTerm}
              value={searchValue}
            />
            <div />
            <AppSVG name="search" />
          </div>
        </div>
      </div>
      <div className="header-sort-filter">
        <SizeModule />
        {pathname !== "all-items" && (
          <>
            <div className="header-filter">
              <p>Filtered by</p>
              <button>
                <span className="header-filter-label">
                  <small>Species:</small>
                </span>
                <span className="header-filter-value">
                  <small>Dog</small>
                </span>
                <span className="header-filter-clear">
                  <small>&#215;</small>
                </span>
              </button>
            </div>

            <div className="header-sorter">
              <p>Sorter by</p>
              <ul>
                {allowedSort[pathname]?.map(
                  (
                    column: { label: string; sorterName: string },
                    index: number,
                  ) => (
                    <li key={index}>
                      <SortButton
                        label={column?.label}
                        sorterName={column?.sorterName}
                      />
                    </li>
                  ),
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
