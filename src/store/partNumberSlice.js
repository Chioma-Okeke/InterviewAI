import { createSlice } from "@reduxjs/toolkit";

const partNumberSlice = createSlice({
    name: "partNumber",
    initialState: {
        partNumber: 1
    },
    reducers: {
        incrementPartNumber: (state) => {
            state.partNumber += 1
        },
        decrementPartNumber: (state) => {
            state.partNumber -= 1
        }
    }
})

export const {incrementPartNumber, decrementPartNumber} = partNumberSlice.actions
export default partNumberSlice.reducer