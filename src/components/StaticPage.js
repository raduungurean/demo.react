import React from 'react';
import {useLocation} from "react-router";
import {useEffect, useState} from "react";
import {firebaseLoadPage} from "../services/firebase";
import DOMPurify from "dompurify";

const StaticPage = () => {
    const location = useLocation();
    const [page, setPage] = useState('');

    useEffect(() => {
        const pathName = location.pathname;
        const loadPage = async (pathName) => {
            const page = await firebaseLoadPage(pathName.substring(1));
            if (page) {
                setPage(page);
            }
        }
        if (pathName) {
            loadPage(pathName);
        }
    }, [location]);

    if (page) {
        return <div className="p-8" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(page.body) }}></div>;
    }
    return null;
};

export default StaticPage;