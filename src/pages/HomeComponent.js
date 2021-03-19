import React, {useState} from 'react';
import Navbar from "../components/Navbar";
import {useEffect, useContext} from "react";
import {UserContext} from "../providers/UserProvider";
import {useDispatch, useSelector} from "react-redux";
import {loadPosts} from "../actions/posts";
import {selectPosts} from "../selectors/posts";
import {useHistory} from "react-router";
import PostItem from "../components/PostItem";
import ConfirmationModal from "../components/ConfirmationModal";

const HomeComponent = () => {
    const user = useContext(UserContext);
    let uid = user ? user.uid : undefined;
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    const history = useHistory();
    const [toDeletePostId, setToDeletePostId] = useState(undefined);

    useEffect(() => {
        if (uid && posts.length === 0) {
            dispatch(loadPosts(uid));
        }
    }, [uid, posts]);

    return (
        <div className="">
            <Navbar/>

            {toDeletePostId && <ConfirmationModal onYes={() => alert('delete')} onClose={() => setToDeletePostId(undefined)} />}

            <div className="container mb-2 flex flex-col mx-auto w-full items-center justify-center">
                <div className="text-3xl flex mt-4 pl-4 pr-0 text-left w-3/4 justify-between flex-wrap flex-row">
                    <div>Posts</div>
                    <span onClick={() => history.push('add-post')}
                          className="cursor-pointer bg-gray-500 rounded-full font-bold text-white text-sm px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600 mr-6">
                        Add New
                    </span>
                </div>

                <ul className="flex flex-col p-4 w-3/4">
                    {posts.slice().sort((a, b) => a.id < b.id ? 1 : -1).map(post =>
                        <PostItem
                            key={post.id}
                            post={post}
                            onDeleteClick={(postId) => {
                                setToDeletePostId(postId)
                            }}
                        />)}
                </ul>
            </div>
        </div>
    );
};

export default HomeComponent;