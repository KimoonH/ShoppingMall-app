import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

let initialState = {
    productList: [],
    selectedItem: null,
    isLoading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk('product/fetchAll', async (searchQuery, thunkApi) => {
    try {
        let url = `https://my-json-server.typicode.com/KimoonH/ShoppingMall-app/products/${keyword}`;
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        thunkApi.rejectWithValue(error.message);
    }
});

export const fetchfetchProductsDetail = createAsyncThunk('product/fetchDetail', async (id, thunkApi) => {
    try {
        let url = `https://my-json-server.typicode.com/KimoonH/ShoppingMall-app/products/${id}`;
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        thunkApi.rejectWithValue(error.message);
    }
});


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchfetchProductsDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchfetchProductsDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedItem = action.payload;
            })
            .addCase(fetchfetchProductsDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

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

console.log('productSlice', productSlice);

export const productActions = productSlice.actions;
export default productSlice.reducer;