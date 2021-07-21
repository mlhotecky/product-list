import {combineReducers} from "@reduxjs/toolkit";
import {productsReducer} from "./products";
import {reducer as toastrReducer} from "react-redux-toastr";

const rootReducer = combineReducers({
    products: productsReducer,
    toastr: toastrReducer
})

export default rootReducer;