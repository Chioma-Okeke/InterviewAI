import { createSlice } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
    name: "interview",
    initialState: {
        isPauseTextRequested: false,
        isPauseAudioRequested: false,
        isPauseVideoRequested: false,
        isEndTextRequested: false,
        isEndAudioRequested: false,
        isEndVideoRequested: false,
        interviewDetails: {
            candidateFirstname: "Chioma",
            resumeUrl:
                "http://res.cloudinary.com/dwforfxu5/raw/upload/v1727645810/dlalptxtsjr5pjhooti7.pdf",
            roleName: "",
            experienceLevel: "",
            jobDescription: "",
        },
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
        endTextInterview: (state) => {
            state.isEndTextRequested = !state.isEndTextRequested;
        },
        endAudioInterview: (state) => {
            state.isEndAudioRequested = !state.isEndAudioRequested;
        },
        endVideoInterview: (state) => {
            state.isEndVideoRequested = !state.isEndVideoRequested;
        },
        updateProfileData: (state, action) => {
            const { resumeUrl, experienceLevel, jobRole, firstName } =
                action.payload;
            state.interviewDetails.resumeUrl = resumeUrl;
            state.interviewDetails.experienceLevel = experienceLevel;
            state.interviewDetails.roleName = jobRole;
            state.interviewDetails.candidateFirstname = firstName;
        },
        updateDescription: (state, action) => {
            const { description } = action.payload;
            state.interviewDetails.jobDescription = description;
        },
        updateUserFirstName: (state, action) => {
            const { firstName } = action.payload;
            state.interviewDetails.candidateFirstname = firstName;
        },
    },
});

export const {
    pauseTextInterview,
    pauseAudioInterview,
    pauseVideoInterview,
    updateProfileData,
    updateDescription,
    updateUserFirstName,
    endTextInterview,
    endAudioInterview,
    endVideoInterview,
} = interviewSlice.actions;
export default interviewSlice.reducer;
