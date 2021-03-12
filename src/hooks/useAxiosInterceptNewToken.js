import axios from "axios";
import {signInLocalStorage} from "../services/utils";
import {setToken} from "../actions/auth";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

export default function useAxiosInterceptNewToken() {

    const dispatch = useDispatch();

    useEffect(() => {
        axios.interceptors.response.use(
            async (successRes) => {
                if (successRes.headers && successRes.headers['newToken']) {
                    await signInLocalStorage(successRes.headers['newToken']);
                    await dispatch(setToken(successRes.headers['newToken']));
                }
                return successRes;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }, []);
}