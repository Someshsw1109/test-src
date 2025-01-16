import { combineReducers, createReducer } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import loadingBarReducer from "../slices/loadingBarSlice.jsx"
import profileReducer from "../slices/profileSlice.jsx"
import cartReducer from "../slices/cartSlice.jsx"
import itemReducer from "../slices/itemSlice.jsx"

const rootReducer=combineReducers({
    auth:authReducer, 
    loadingBar:loadingBarReducer,
    profile:profileReducer,
    cart:cartReducer,
    item:itemReducer,
})
export default rootReducer;