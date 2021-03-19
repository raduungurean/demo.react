import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {post} from "../services/postRequest";
import {firebaseLoadPost, firebaseLoadPosts} from "../services/firebase";

export const addPost = createAsyncThunk(
    'post/add',
    async ({title, body}, {dispatch, rejectWithValue, getState}) => {
        const state = getState();
        const token = state.auth.user && state.auth.user.token ? state.auth.user.token : undefined;
        if (token) {
            const result = await post.request({title, body}, token);
            if (result.post_id) {
                return await firebaseLoadPost(result.post_id)
            }
        }
    }
);

export const loadPosts = createAsyncThunk(
    'post/load-list',
    async (uid, {dispatch, rejectWithValue, getState}) => {
        return await firebaseLoadPosts(uid);
    }
);

export const clearAddError = createAction('post/clear-add-error');
export const clearAddSuccess = createAction('post/clear-add-success');