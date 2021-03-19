import {refreshToken, signOut} from "../actions/auth";
import {signOutLocalStorage} from "../services/utils";
import {firebaseAuth} from "../services/firebase";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {setAppIsLoading} from "../actions/layout";

export default function useRefreshToken() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        if (localStorageToken) {
            async function _refreshToken() {
                await dispatch(setAppIsLoading(true));
                await dispatch(refreshToken({
                    token: localStorageToken, onError: async (msg) => {
                        await dispatch(signOut());
                        await signOutLocalStorage();
                        await firebaseAuth.signOut();
                        await history.push('/');
                    }
                }))
                await dispatch(setAppIsLoading(false));
            }
            _refreshToken();
        }
    }, []);
}