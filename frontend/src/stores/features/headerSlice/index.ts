import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HeaderState {
  searchTerm: string | null;
  sort: string | string[] | null;
  filter: {
    column: string;
    value: string;
  } | null;
  size: string | null;
  page: string | null;
}

const initialState: HeaderState = {
  searchTerm: null,
  sort: null,
  filter: null,
  size: "20",
  page: null,
};

export const headerSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string | null>) => {
      if (action.payload === "" || !action.payload) state.searchTerm = null;
      else state.searchTerm = action.payload;
    },
    addSort: (state, action: PayloadAction<string>) => {
      const sorterName = action.payload;

      const currentSorts = !state.sort
        ? []
        : typeof state.sort === "string"
          ? [state.sort]
          : [...state.sort];

      const existingSort = currentSorts.find((sort) =>
        sort.startsWith(`${sorterName}:`),
      );

      if (!existingSort) {
        // 1er clic : ASC
        currentSorts.push(`${sorterName}:asc`);
      } else if (existingSort.endsWith(":asc")) {
        // 2e clic : DESC
        const index = currentSorts.indexOf(existingSort);
        currentSorts[index] = `${sorterName}:desc`;
      } else {
        // 3e clic : suppression
        const filteredSorts = currentSorts.filter(
          (sort) => sort !== existingSort,
        );

        state.sort =
          filteredSorts.length === 0
            ? null
            : filteredSorts.length === 1
              ? filteredSorts[0]
              : filteredSorts;

        return;
      }

      state.sort = currentSorts.length === 1 ? currentSorts[0] : currentSorts;
    },
    removeSort: (state, action: PayloadAction<string>) => {
      if (typeof state.sort === "string") {
        state.sort = null;
      } else {
        state.sort = state.sort.filter((elem) => elem !== action.payload);
      }
    },
    setPage: (state, action: PayloadAction<string | null>) => {
      if (action.payload === "" || !action.payload) state.page = null;
      else state.page = action.payload;
    },
    setFilter: (
      state,
      action: PayloadAction<{
        column: string;
        value: string;
      }>,
    ) => {
      if (!action.payload) state.filter = null;
      else state.filter = action.payload;
      console.log(state.filter)
    },
    setSize: (state, action: PayloadAction<string | null>) => {
      if (action.payload === "" || !action.payload) state.size = null;
      else state.size = action.payload;
    },
    clearSort: (state) => {
      state.sort = null;
    },
  },
});

export const {
  setSearchTerm,
  addSort,
  removeSort,
  setFilter,
  setSize,
  setPage,
  clearSort,
} = headerSlice.actions;
export default headerSlice.reducer;
