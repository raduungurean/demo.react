import {createReducer} from "@reduxjs/toolkit";
import {addPost, clearAddError, clearAddSuccess, loadPosts} from "../actions/posts";

const initialState = {
    isAdding: false,
    postsList: [],
    showAddPostErrorMessage: false,
    showAddPostSuccessMessage: false,
};

const postsReducer = createReducer(initialState, (builder) => {
    builder.addCase(addPost.pending, (state, action) => {
        state.isAdding = true;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
        state.isAdding = false;
        state.postsList.push(action.payload);
        state.showAddPostSuccessMessage = true;
    });
    builder.addCase(addPost.rejected, (state, action) => {
        state.isAdding = false;
        if (action.error) {
            state.showAddPostErrorMessage = true;
        }
    });
    builder.addCase(loadPosts.fulfilled, (state, action) => {
        state.postsList.unshift(...action.payload)
    });
    builder.addCase(clearAddError, (state, action) => {
        if (state.showAddPostErrorMessage) {
            state.showAddPostErrorMessage = false;
        }
    });
    builder.addCase(clearAddSuccess, (state, action) => {
        if (state.showAddPostSuccessMessage) {
            state.showAddPostSuccessMessage = false;
        }
    });
});

export default postsReducer;