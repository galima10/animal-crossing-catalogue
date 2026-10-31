import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ApiResponseType } from "@/types/ApiResponseType";

interface ItemsState {
  items: ApiResponseType | null;
}

const initialState: ItemsState = {
  items: null,
};

export const itemSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<ApiResponseType>) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = itemSlice.actions;
export default itemSlice.reducer;
