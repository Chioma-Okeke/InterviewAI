import { createSlice } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
    name: "interview",
    initialState: {
        isPauseTextRequested: false,
        isPauseAudioRequested: false,
        isPauseVideoRequested: false,
    },
    reducers: {
        pauseTextInterview: (state) => {
            state.isPauseTextRequested = !state.isPauseTextRequested;
        },
        pauseAudioInterview: (state) => {
            state.isPauseAudioRequested = !state.isPauseAudioRequested;
        },
        pauseVideoInterview: (state) => {
            state.isPauseVideoRequested = !state.isPauseVideoRequested;
        },
    },
});

export const { pauseTextInterview, pauseAudioInterview, pauseVideoInterview } = interviewSlice.actions;
export default interviewSlice.reducer;
