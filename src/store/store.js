import { configureStore } from "@reduxjs/toolkit";
import navReducer from "./navSlice"
import moduleReducer from "./moduleSlice";
import partNumberReducer from "./partNumberSlice"
import interviewReducer from "./interviewSlice"

const store = configureStore({
    reducer: {
        nav: navReducer,
        module: moduleReducer,
        partNumber: partNumberReducer,
        interview: interviewReducer,
    },
})

export default store