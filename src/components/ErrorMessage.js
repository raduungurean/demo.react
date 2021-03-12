import React from 'react';

function ErrorMessage({message, onHide}) {
    return <div className="p-3 border border-red-300 rounded text-red-500 flex flex-row text-sm justify-between">
        <span>{message}</span>
        <span className="cursor-pointer" onClick={onHide}>
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </span>
    </div>;
}

export default ErrorMessage;