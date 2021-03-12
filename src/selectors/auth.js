export const selectAuthInProgress = state => state.auth.inProgress;
export const selectErrorSignIn = state => state.auth.errorSignIn;
export const selectToken = state => state.auth.user.token;