import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  products: products ? products : null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  //userReducer
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(login.rejected,(state,action)=>{
        state.isError = true;
        state.message = action.payload
      })
  },
});

export const register = createAsyncThunk("products/getAllProducts",async (products, thunkAPI) => {
    try {
      return await authService.register(products);
    } catch (error) {
      const message = error.response.data.errors[0].message;
      return thunkAPI.rejectWithValue(message);//action.payload
    }
  }
);
export const { reset } = authSlice.actions;

export default authSlice.reducer;