import React, {useState} from 'react';
import {useHistory} from "react-router";
import {signOut} from "../actions/auth";
import {signOutLocalStorage} from "../services/utils";
import {Transition} from "@headlessui/react";
import clsx from "clsx";
import {firebaseAuth} from "../services/firebase";
import {useDispatch} from "react-redux";

const Navbar = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const _signOut = async () => {
        try {
            await dispatch(signOut());
            await signOutLocalStorage();
            await firebaseAuth.signOut();
            await history.push('/');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="block lg:hidden h-8 w-auto" src="https://derby-today.web.app/static/media/logo_dark.05dae4d0.png" alt="Derby.Today"/>
                            <img className="hidden lg:block h-8 w-auto" src="https://derby-today.web.app/static/media/logo_dark.05dae4d0.png" alt="Derby.Today"/>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <span onClick={() => history.push('/home')} className="cursor-pointer bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</span>
                                <span onClick={() => history.push('/posts')} className="cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Posts</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">View notifications</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                            </svg>
                        </button>

                        <div className="ml-3 relative">
                            <div>
                                <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full" src="http://www.gravatar.com/avatar/d816b7b5cf4275b23110ced06e47f754?s=80" alt="" />
                                </button>
                            </div>
                            <Transition
                                show={isProfileMenuOpen}
                                enter="transition ease-out duration-75"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <div
                                    className={clsx({'origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5': true})}
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu"
                                >
                                    <a
                                        onClick={() => _signOut()}
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem">
                                        Sign out
                                    </a>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>

            { isMenuOpen && <div className="sm:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <span onClick={() => history.push('/home')} className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Dashboard</span>
                    <span onClick={() => history.push('/posts')} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer">Team</span>
                </div>
            </div> }
        </nav>
    );
};

export default Navbar;