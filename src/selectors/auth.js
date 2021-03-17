export const selectAuthInProgress = state => state.auth.inProgress;
export const selectAuthInProgressProvider = state => state.auth.inProgressProvider;
export const selectErrorSignIn = state => state.auth.errorSignIn;
export const selectToken = state => state.auth.user.token;