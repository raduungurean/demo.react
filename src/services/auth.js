import {config} from '../constants'
import axios from 'axios';

function signIn(email, password) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.url.AUTH}/auth/login`, {
            email,
            password,
        }).then((response) => {
            resolve(response.data);
        }).catch(err => reject(err));
    });
}

function signInWithProviderAndToken(provider, token) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.url.AUTH}/auth/${provider}`, {
            code: token,
        }).then((response) => {
            resolve(response.data);
        }).catch(err => reject(err));
    });
}

function refreshToken(token) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.url.AUTH}/auth/refresh`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            resolve(response.data);
        }).catch(err => reject(err));
    });
}

export const auth = {
    signIn,
    refreshToken,
    signInWithProviderAndToken
};