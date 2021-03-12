import {config} from '../constants'
import axios from 'axios';

function postRequest(postData, token) {
    return new Promise((resolve, reject) => {
        axios.post(`${config.url.APP}/posts`, postData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            resolve(response.data);
        }).catch(err => reject(err));
    });
}

export const post = {
    request: postRequest,
};