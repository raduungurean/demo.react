export const signInLocalStorage = (token) => {
    localStorage.setItem('token', token);
}

export const signOutLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firebaseToken');
}

export const isSignedInLocalStorage = () => {
    return !!localStorage.getItem('token');
}

export function later(delay) {
    return new Promise(function(resolve) {
        setTimeout(resolve, delay);
    });
}