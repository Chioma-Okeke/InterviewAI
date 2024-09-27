import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navSlice"
import moduleReducer from "./moduleSlice";
import partNumberReducer from "./partNumberSlice"

const store = configureStore({
    reducer: {
        nav: navReducer,
        module: moduleReducer,
        partNumber: partNumberReducer
    },
})

export default store