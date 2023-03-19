import { createSlice, PayloadAction} from "@reduxjs/toolkit";
export interface range {
    maxPrice: number;
    minPrice: number;
  }
const filterSlipe = createSlice({
  name: "filter",
  initialState:{
    sort: 1,
    page: 1,
    range:{
        maxPrice:0,
        minPrice:0
    },
    rangeFilter: {
        maxPrice:0,
        minPrice:0,
    }
  },
  reducers: {
    setRange(state, action: PayloadAction<range>) {
        state.rangeFilter={
            maxPrice:0,
            minPrice:0
        };
        state.range = action.payload;
    },
   
    setRangeFilter(state, action: PayloadAction<range>) {
        state.rangeFilter=action.payload;
    },
    setSort(state, action: PayloadAction<number>) {
        state.sort=action.payload
    }
  },
});
export const filterAction = filterSlipe.actions;
export const filterReducer = filterSlipe.reducer;
