import { createSlice } from "@reduxjs/toolkit";

const init = window.innerWidth > 1024 ? true : false

const navSlice = createSlice({
    name: "nav",
    initialState: {
        showNavBar: init,
    },
    reducers: {
        toggleNavBar: (state) => {
            state.showNavBar = !state.showNavBar;
        },
    },
});

export const { toggleNavBar } = navSlice.actions;
export default navSlice.reducer
