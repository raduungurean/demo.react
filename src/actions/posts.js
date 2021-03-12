import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {post} from "../services/postRequest";
import {firebaseLoadPost, firebaseLoadPosts} from "../services/firebase";

export const addPost = createAsyncThunk(
    'add/post',
    async ({title, body}, {dispatch, rejectWithValue, getState}) => {
        const state = getState();
        const token = state.auth.user && state.auth.user.token ? state.auth.user.token : undefined;
        if (token) {
            const result = await post.request({title, body}, token);
            if (result.post_id) {
                try {
                    return await firebaseLoadPost(result.post_id)
                } catch (e) {
                    return undefined;
                }
            }
        }
        return undefined;
    }
);

export const loadPosts = createAsyncThunk(
    'load/posts',
    async (uid, {dispatch, rejectWithValue, getState}) => {
        try {
            return await firebaseLoadPosts(uid);
        } catch (e) {
            return undefined;
        }
    }
)

export const addingPost = createAction('sign-out/user');