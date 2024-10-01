import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
    name: "module",
    initialState: {
        isResumeRequested: false,
    },
    reducers: {
        resumeTimer: (state) => {
            state.isResumeRequested = true
        },
    },
})

export const {resumeTimer}  = timerSlice.actions
export default timerSlice.reducer