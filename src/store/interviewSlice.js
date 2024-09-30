import { createSlice } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
    name: "interview",
    initialState: {
        isPauseTextRequested: false,
        isPauseAudioRequested: false,
        isPauseVideoRequested: false,
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
        updateProfileData: (state, action) => {
            const { resumeUrl, experienceLevel, jobRole, firstName } =
                action.payload;
            state.interviewDetails.resumeUrl = resumeUrl;
            state.interviewDetails.experienceLevel = experienceLevel;
            state.interviewDetails.roleName = jobRole;
            state.interviewDetails.candidateFirstname = firstName;
            console.log(state.interviewDetails.candidateFirstname, "details in store");
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
} = interviewSlice.actions;
export default interviewSlice.reducer;
