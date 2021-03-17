import {createReducer} from "@reduxjs/toolkit";
import {
    refreshToken,
    setToken,
    signInClearErrorMessage,
    signInInProgress, signInProviderInProgress,
    signInWithEmailAndPassword, signInWithProviderAndAccessToken,
    signOut
} from "../actions/auth";

const initialState = {
    user: {
        token: null,
        id: null
    },
    inProgress: false,
    inProgressProvider: {},
    errorSignIn: false
};

const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(signInInProgress, (state, action) => {
            state.inProgress = action.payload;
        })
        .addCase(signInProviderInProgress, (state, action) => {
            state.inProgressProvider[action.payload.provider] = action.payload.inProgress;
        })
        .addCase(signInWithEmailAndPassword.fulfilled, (state, action) => {
            if (action.payload) {
                state.user.token = action.payload.access_token;
            }
        })
        .addCase(signInWithEmailAndPassword.rejected, (state, action) => {
            state.errorSignIn = true;
        })
        .addCase(signInWithProviderAndAccessToken.fulfilled, (state, action) => {
            if (action.payload) {
                state.user.token = action.payload.access_token;
            }
        })
        .addCase(signInWithProviderAndAccessToken.rejected, (state, action) => {
            state.errorSignIn = true;
        })
        .addCase(signOut, (state, action) => {
            state.user.token = undefined;
        })
        .addCase(signInClearErrorMessage, (state, action) => {
            state.errorSignIn = false;
        })
        .addCase(setToken, (state, action) => {
            state.user.token = action.payload;
        })
        .addCase(refreshToken.fulfilled, (state, action) => {
            if (action.payload) {
                state.user.token = action.payload.access_token;
            }
        });
});

export default authReducer;