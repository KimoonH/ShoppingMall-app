import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers"
import { composeWithDevTools } from "@redux-devtools/extension";

import productSlice from "./reducers/productSlice";
import { configureStore } from "@reduxjs/toolkit";



/*let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);*/

const store = configureStore({
    reducer: {
        //auth: authenticateReducer,
        product: productSlice,
    }
})

export const productActions = productSlice.actions
export default store; 