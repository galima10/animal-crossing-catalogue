import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ApiResponseType } from "@/types/ApiResponseType";

interface ItemsState {
  items: ApiResponseType | null;
  filterOptions: { filterValue: string; name: string }[];
}

const initialState: ItemsState = {
  items: null,
  filterOptions: [],
};

export const itemSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ApiResponseType>) => {
      state.items = action.payload;
    },
    setOptions: (state, action: PayloadAction<{ filterValue: string; name: string }[]>) => {
      state.filterOptions = action.payload;
    },
  },
});

export const { setItems, setOptions } = itemSlice.actions;
export default itemSlice.reducer;
