import {createReducer} from "@reduxjs/toolkit";
import {addPost, loadPosts} from "../actions/posts";

const initialState = {
    isAdding: false,
    postsList: [],
    showErrorMessage: false,
};

const postsReducer = createReducer(initialState, (builder) => {
    builder.addCase(addPost.pending, (state, action) => {
        state.isAdding = true;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
        state.isAdding = false;
        if (action.payload) {
            state.postsList.push(action.payload);
        }
    });
    builder.addCase(addPost.rejected, (state, action) => {
        state.isAdding = false;
        state.showErrorMessage = true;
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
        if (action.payload) {
            state.postsList.unshift(...action.payload)
        }
    });
});

export default postsReducer;