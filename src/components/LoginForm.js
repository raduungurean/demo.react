import React from "react";
import SocialLoginButton from "./SocialLoginButton";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";
import {signInClearErrorMessage, signInWithEmailAndPassword} from "../actions/auth";
import {selectAuthInProgress, selectErrorSignIn, selectToken} from "../selectors/auth";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
import clsx from "clsx";
import ErrorMessage from "./ErrorMessage";
import ProgressSpinner from "./ProgressSpinner";
import {useHistory} from "react-router";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {config} from "../constants";

function LoginForm() {

    const inProgress = useSelector(selectAuthInProgress);
    const errorSignIn = useSelector(selectErrorSignIn);
    const token = useSelector(selectToken);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (token) {
            history.push('/home');
        }
    }, [token]);

    const signIn = async (email, password) => {
        setEmailError(false);
        setPasswordError(false);
        if (!isEmail(email)) {
            setEmailError(true);
        } else if (!isLength(password, {min:6, max: 100})) {
            setPasswordError(true);
        } else {
            await dispatch(signInWithEmailAndPassword({email, password}));
        }
    };

    return <form className="flex flex-col space-y-5">
        {errorSignIn && <ErrorMessage
            message="Wrong username or password"
            onHide={() => dispatch(signInClearErrorMessage())}
        />}
        <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
            <input
                onChange={(text) => {
                    setEmail(text.target.value)
                }}
                type="email"
                id="email"
                autoFocus
                className={clsx({
                    'px-4 py-2 transition duration-300 border rounded focus:border-transparent focus:outline-none focus:ring-4': true,
                    'border-gray-300 focus:ring-blue-200': !emailError,
                    'border-red-300 focus:ring-red-200': emailError,
                })}
            />
        </div>
        <div className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
                <span onClick={() => { alert('not implemented') }} className="cursor-pointer text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</span>
            </div>
            <input
                onChange={(text) => {
                    setPassword(text.target.value)
                }}
                type="password"
                id="password"
                className={clsx({
                    'px-4 py-2 transition duration-300 border rounded focus:border-transparent focus:outline-none focus:ring-4': true,
                    'border-gray-300 focus:ring-blue-200': !passwordError,
                    'border-red-300 focus:ring-red-200': passwordError,
                })}
            />
        </div>
        <div>
            <button
                type="button"
                onClick={() => signIn(email, password)}
                className="inline-flex justify-center items-center text-base w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4">
                {inProgress && <ProgressSpinner />}
                <span>Sign In</span>
            </button>
        </div>
        <div className="flex flex-col space-y-5">
            <span className="flex items-center justify-center space-x-2">
                <span className="h-px bg-gray-400 w-14"></span>
                <span className="font-normal text-gray-500">or login with</span>
                <span className="h-px bg-gray-400 w-14"></span>
            </span>
            <div className="flex flex-col space-y-4">
                <FacebookLogin
                    appId={config.FB_APP_ID}
                    autoLoad
                    callback={(response) => {console.log('### callback', response)}}
                    render={renderProps => (
                        <SocialLoginButton onClick={renderProps.onClick} type="facebook" title="Facebook"/>
                    )}
                />
                <SocialLoginButton onClick={() => alert('not implemented')} type="google" title="Google"/>
                <SocialLoginButton onClick={() => alert('not implemented')} type="github" title="Github"/>
            </div>
        </div>
    </form>;
}

export default LoginForm;