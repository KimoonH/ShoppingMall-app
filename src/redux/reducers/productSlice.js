import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
let initialState = {
    products: [],
    selectedItem: null,
    isLoading: false,
    error: null,
}

export const fetchProducts = createAsyncThunk(
    'product/fetchAll',
    async (keyword, thunkApi) => {
        try {
            let url = `https://my-json-server.typicode.com/KimoonH/ShoppingMall-app/products/${keyword}`;
            let response = await fetch(url);
            let data = await response.json();
            return await response.json();
        } catch (error) {
            thunkApi.rejectWithValue(error.message)
        }
    })

export const fetchProductsDetail = createAsyncThunk(
    'product/fetchDetail',
    async (id) => {
        let url = `https://my-json-server.typicode.com/KimoonH/ShoppingMall-app/products/${id}`;
        let response = await fetch(url);
        let data = await response.json();
    })

/*function productReducer(state = initialState, action) {
    let { type, payload } = action
    switch (type) {
        case "GET_PRODUCT_SUCCESS":
            return { ...state, products: payload.data };
        case "GET_SINGLE_PRODUCT_SUCCESS":
            return { ...state, selectedItem: payload.data }
        default:
            return { ...state };
    }


}

export default productReducer;*/

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchProductsDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductsDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedItem = action.payload;
            })
            .addCase(fetchProductsDetail.rejected, (state) => {
                state.isLoading = false;
            })
    },
})

export default productSlice.reducer;