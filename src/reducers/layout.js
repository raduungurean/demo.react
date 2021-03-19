import {createReducer} from "@reduxjs/toolkit";
import {setAppIsLoading} from "../actions/layout";

const initialState = {
    appIsLoading: false,
};

const layoutReducer = createReducer(initialState, (builder) => {
    builder.addCase(setAppIsLoading, (state, action) => {
        state.appIsLoading = action.payload;
    });
});

export default layoutReducer;