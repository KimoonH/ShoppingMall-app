
function getProducts(keyword) {
    return async (dispatch, getState) => {
        let url = `https://my-json-server.typicode.com/KimoonH/ShoppingMall-app/products/${keyword}`;
        let response = await fetch(url);
        let data = await response.json();
        dispatch({ type: "GET_PRODUCT_SUCCESS", payload: { data } })
    };
}
function getProductDetail(id) {
    return async (dispatch) => {
        let url = `https://my-json-server.typicode.com/KimoonH/ShoppingMall-app/products/${id}`;
        let response = await fetch(url);
        let data = await response.json();
        dispatch({ type: "GET_SINGLE_PRODUCT_SUCCESS", payload: { data } });
    };
}
export const productAction = { getProducts, getProductDetail }