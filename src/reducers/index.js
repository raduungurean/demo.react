import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './auth';
import postsReducer from './posts';
import layoutReducer from "./layout";

export default combineReducers({
    auth: authReducer,
    posts: postsReducer,
    layout: layoutReducer,
})