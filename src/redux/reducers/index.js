import { combineReducers } from "redux";
import productReducer from "./productReducer";
import authenticateReducer from "./authenticateReducer";
import productDetailReducer from "./productDetailReducer";

export default combineReducers({
    auth: authenticateReducer,
    product: productReducer,
    detail: productDetailReducer
})