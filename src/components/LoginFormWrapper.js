import React from "react";
import LoginForm from "./LoginForm";

function LoginFormWrapper() {
    return <div className="flex items-center min-h-screen p-4 bg-gray-200 justify-center">
        <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md sm:w-5/6">
            <div className="p-4 py-6 text-white bg-gray-800 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
                <div className="my-3 text-4xl font-bold tracking-wider text-center">
                    <span className="cursor-pointer" onClick={() => {}}>Derby.Today</span>
                </div>
                <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
                    This is a demo app
                </p>
                <p className="flex flex-col items-center justify-center mt-10 text-center">
                    <span>Don't have an account?</span>
                    <span onClick={() => { alert ('not implemented')}} className="cursor-pointer underline">Get Started!</span>
                </p>
                <p className="mt-6 text-sm text-center text-gray-300">Read our <span onClick={() => {}} className="underline cursor-pointer">terms and conditions</span></p>
            </div>
            <div className="p-5 bg-white md:flex-1">
                <h3 className="my-4 text-2xl font-semibold text-gray-700">Account Login</h3>
                <LoginForm/>
            </div>
        </div>
    </div>;
}

export default LoginFormWrapper;