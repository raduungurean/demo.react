import React, {useState, useEffect} from 'react';
import Navbar from "../components/Navbar";
import isLength from "validator/lib/isLength";
import isEmpty from "validator/lib/isEmpty";
import {useDispatch, useSelector} from "react-redux";
import {addPost, clearAddError, clearAddSuccess} from "../actions/posts";
import {selectIsAddingPost, selectShowAddPostErrorMessage, selectShowSuccessAddPost} from "../selectors/posts";
import Button from "@atlaskit/button/loading-button";
import {toast} from "react-toastify";
import {useHistory} from "react-router";

const AddPostComponent = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [isValid, setIsValid] = useState(false);
    const dispatch = useDispatch();
    const isAdding = useSelector(selectIsAddingPost);
    const showAddPostErrorMessage = useSelector(selectShowAddPostErrorMessage);
    const showSuccessAddPost = useSelector(selectShowSuccessAddPost);
    const history = useHistory();

    const showError = () => toast("Error adding post", {
        autoClose: 5000,
        type: toast.TYPE.ERROR,
        onClose: () => dispatch(clearAddError()),
    });

    useEffect(() => {
        if (showAddPostErrorMessage) {
            showError();
        }
        return () => {
            dispatch(clearAddError());
        }
    }, [showAddPostErrorMessage])

    const showSuccess = () => toast("Successfully added.", {
        autoClose: 5000,
        type: toast.TYPE.SUCCESS,
        onClose: () => dispatch(clearAddSuccess()),
    });

    useEffect(() => {
        if (showSuccessAddPost) {
            showSuccess();
            history.push('/');
        }
        return () => {
            dispatch(clearAddSuccess());
        }
    }, [showSuccessAddPost])

    useEffect(() => {
        let isValid = true;

        if (isEmpty(title)) {
            isValid = false;
        } else if (!isLength(title, {min: 1, max: undefined})) {
            isValid = false;
        }
        if (isEmpty(body)) {
            isValid = false;
        } else if (!isLength(body, {min: 1, max: undefined})) {
            isValid = false;
        }

        setIsValid(isValid);

    }, [title, body]);

    return (
        <div>
            <Navbar/>
            <div className="p-5">
                <h4 className="text-2xl mt-2 mb-2">Add Post</h4>
                <form onSubmit={async (event) => {
                    event.preventDefault();
                    await dispatch(addPost({
                        title, body
                    }));
                }}>
                    <div className="mt-8 max-w-lg">
                        <div className="grid grid-cols-1 gap-6">
                            <label className="block">
                                <span className="text-gray-700">Title</span>
                                <input
                                    onChange={(v) => setTitle(v.target.value)}
                                    value={title}
                                    type="text"
                                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                    placeholder=""
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Body</span>
                                <textarea
                                    onChange={(v) => setBody(v.target.value)}
                                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                                    rows="3"
                                    value={body}
                                />
                            </label>
                            <div className="w-1/4">
                                <Button
                                    isDisabled={!isValid}
                                    appearance="primary"
                                    type="submit"
                                    isLoading={isAdding}>
                                    Add Post
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPostComponent;