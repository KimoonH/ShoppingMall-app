let initialState = {
    selectedItem: null,
};

function productDetailReducer(state = initialState, action) {
    let { type, payload } = action;
    switch (type) {
        case "GET_SINGLE_PRODUCT_SUCCESS":
            return { ...state, selectedItem: payload.data };
        default:
            return { ...state };
    }
}

export default productDetailReducer;