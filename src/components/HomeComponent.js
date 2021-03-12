import React from 'react';
import Navbar from "./Navbar";
import {useEffect, useContext, useState} from "react";
import {UserContext} from "../providers/UserProvider";
import AddPostModal from "./AddPostModal";
import {useDispatch, useSelector} from "react-redux";
import {addPost, loadPosts} from "../actions/posts";
import {selectIsAddingPost, selectPosts, selectShowErrorMessage} from "../selectors/posts";

const HomeComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = useContext(UserContext);
    let uid = user ? user.uid : undefined;
    const dispatch = useDispatch();
    const isAdding = useSelector(selectIsAddingPost)
    const posts = useSelector(selectPosts);
    const showErrorMessage = useSelector(selectShowErrorMessage);

    useEffect(() => {
        if (uid) {
            dispatch(loadPosts(uid));
        }
    }, [uid]);

    return (
        <div className="">
            <Navbar/>

            <AddPostModal
                isOpen={isOpen}
                adding={isAdding}
                onClose={() => setIsOpen(false)}
                onSubmit={async (post) => {
                    await dispatch(addPost(post));
                    await setIsOpen(false);
                }}
            />

            <div className="container mb-2 flex flex-col mx-auto w-full items-center justify-center">
                <div className="text-3xl flex mt-4 pl-4 pr-0 text-left w-3/4 justify-between flex-wrap flex-row">
                    <div>Posts</div>
                    <span onClick={() => setIsOpen(!isOpen)}
                          className="cursor-pointer bg-gray-500 rounded-full font-bold text-white text-sm px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
                        Add New
                    </span>
                </div>

                {showErrorMessage && <div className="p-4 pb-0 w-3/4">
                    <div className="bg-red-50 border-l-8 border-red-900 mt-2 ">
                        <div className="flex items-center justify-between flex-wrap flex-row">
                            <div className="p-2">Error adding post.</div>
                        </div>
                    </div>
                </div>}

                <ul className="flex flex-col p-4 w-3/4">
                    {posts.slice().sort((a, b) => a.id < b.id ? 1 : -1).map(post =>
                        <li key={post.id} className="flex flex-row mb-2 w-full">
                            <div
                                className="select-none rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 rounded border p-3 mt-2 border-gray-800 hover:shadow-2xl">
                                <div className="flex-1 pl-1 mr-16">
                                    <div className="text-2xl">{post.title}</div>
                                    <div className="text-xs mb-4">Post id: {post.id}</div>
                                    <div className="text-sm">{post.body}</div>
                                </div>
                                <div
                                    className="text-wrap text-center flex flex-col text-white text-sm rounded-md bg-gray-800 justify-center items-center mr-5 p-2">
                                    Delete post
                                </div>
                            </div>
                        </li>)}
                </ul>
            </div>
        </div>
    );
};

export default HomeComponent;