import React from 'react';

function PostItem(props) {
    return <li className="flex flex-row mb-4 w-full">
        <div
            className="select-none rounded-md flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 rounded border p-3 mt-2 border-gray-800 hover:shadow-2xl relative">
            <div className="flex-1 pl-1 mr-16">
                <div className="text-2xl">{props.post.title}</div>
                <div className="text-xs mb-4">Post id: {props.post.id}</div>
                <div className="text-sm">{props.post.body}</div>
            </div>
            <div className="absolute -right-4 -top-4">
                <button type="button" onClick={() => props.onDeleteClick(props.post.id)} className="bg-gray-500 rounded-full p-2 inline-flex items-center justify-center text-gray-200 hover:text-gray-100 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                    <span className="sr-only">Delete Post</span>
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    </li>;
}

export default PostItem;