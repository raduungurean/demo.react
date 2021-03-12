import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './auth';
import postsReducer from './posts';

export default combineReducers({
    auth: authReducer,
    posts: postsReducer,
})