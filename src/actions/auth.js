import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {auth} from "../services/auth";
import {signInLocalStorage} from "../services/utils";
import {firebaseAuth} from "../services/firebase";

export const signInInProgress = createAction('sign-in/progress')
export const signInProviderInProgress = createAction('sign-in-provider/progress')
export const setToken = createAction('sign-in/set-token')
export const signInClearErrorMessage = createAction('sign-in/clear-error')

export const signInWithEmailAndPassword = createAsyncThunk(
    'sign-in/email',
    async ({email, password}, {dispatch, rejectWithValue}) => {
        dispatch(signInInProgress(true));
        let response;
        try {
            response = await auth.signIn(email, password);
            if (response && response.access_token && response.firebase_token) {
                const firebaseUser = await firebaseAuth.signInWithCustomToken(response.firebase_token);
                await signInLocalStorage(response.access_token);
            }
        }
        finally {
            dispatch(signInInProgress(false));
        }
        return response ? response : undefined;
    }
)

export const signInWithProviderAndAccessToken = createAsyncThunk(
    'sign-in/provider',
    async ({provider, token}, {dispatch, rejectWithValue}) => {
        dispatch(signInProviderInProgress({
            provider: provider,
            inProgress: true,
        }));
        let response;
        try {
            response = await auth.signInWithProviderAndToken(provider, token);
            if (response && response.access_token && response.firebase_token) {
                const firebaseUser = await firebaseAuth.signInWithCustomToken(response.firebase_token);
                await signInLocalStorage(response.access_token);
            }
        }
        finally {
            dispatch(signInProviderInProgress({
                provider: provider,
                inProgress: false,
            }));
        }
        return response ? response : undefined;
    }
)

export const refreshToken = createAsyncThunk(
    'refresh/token',
    async ({token, onError}, {dispatch, rejectWithValue}) => {
        try {
            let response = await auth.refreshToken(token);
            if (response && response.access_token && response.firebase_token) {
                const firebaseUser = await firebaseAuth.signInWithCustomToken(response.firebase_token);
                await signInLocalStorage(response.access_token);
            }
            return response ? response : undefined;
        } catch (e) {
            onError(e.message);
            rejectWithValue(e.message);
        }
    }
)

export const signOut = createAction('sign-out/user');