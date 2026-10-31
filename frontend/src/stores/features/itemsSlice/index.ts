import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ApiResponseType, OneItemResponse } from "@/types/ApiResponseType";

interface ItemsState {
  items: ApiResponseType | null;
  filterOptions: { filterValue: string; name: string }[];
  selected: {
    item: OneItemResponse;
    type: "villager" | "furniture" | "insect" | "fish" | "seaCreature";
  } | null;
}

const initialState: ItemsState = {
  items: null,
  filterOptions: [],
  selected: null,
};

export const itemSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ApiResponseType>) => {
      state.items = action.payload;
    },
    setOptions: (
      state,
      action: PayloadAction<{ filterValue: string; name: string }[]>,
    ) => {
      state.filterOptions = action.payload;
    },
    setSelected: (
      state,
      action: PayloadAction<{
        item: OneItemResponse;
        type: "villager" | "furniture" | "insect" | "fish" | "seaCreature";
      }>,
    ) => {
      state.selected = {
        item: action.payload.item,
        type: action.payload.type,
      };
    },
    clearSelected: (state) => {
      state.selected = null;
    },
  },
});

export const { setItems, setOptions, setSelected, clearSelected } =
  itemSlice.actions;
export default itemSlice.reducer;
