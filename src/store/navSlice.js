import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
    name: "nav",
    initialState: {
        showNavBar: true,
    },
    reducers: {
        toggleNavBar: (state) => {
            state.showNavBar = !state.showNavBar;
        },
    },
});

export const { toggleNavBar } = navSlice.actions;
export default navSlice.reducer
