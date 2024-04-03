import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
let initialState = {
    products: [],
    selectedItem: null,
    isLoading: false;
    error: null;
}

const getProducts = createAsyncThunk(
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
        getSingleProduct(state, action) {
            state.selectedItem = action.payload.data;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, () => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload.data;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export default productSlice.reducer;