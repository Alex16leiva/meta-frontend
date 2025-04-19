import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screen: null
}

export const screenSlicer = createSlice({
    name: 'screen',
    initialState,
    reducers: {
        registerScreen: (state, action) => {
            state.screen = action.payload;
        },
        unRegisterScreen: (state) => {
            state.screen = null;
        }
    }
})

export const { registerScreen, unRegisterScreen } = screenSlicer.actions;
export default screenSlicer.reducer;