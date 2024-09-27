import { createSlice } from "@reduxjs/toolkit";

const moduleSlice = createSlice({
    name: "module",
    initialState: {
        showModule: false,
    },
    reducers: {
        toggleModule: (state) => {
            state.showModule = !state.showModule
        },
    },
})

export const {toggleModule}  = moduleSlice.actions
export default moduleSlice.reducer