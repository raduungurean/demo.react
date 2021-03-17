import './App.css';
import LoginFormWrapper from "./components/LoginFormWrapper";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomeComponent from "./components/HomeComponent";
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectToken} from "./selectors/auth";
import {refreshToken} from "./actions/auth";
import useAxiosInterceptNewToken from "./hooks/useAxiosInterceptNewToken";
import StaticPage from "./components/StaticPage";

function App() {

    const token = useSelector(selectToken);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useAxiosInterceptNewToken();

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        if (localStorageToken) {
            async function _refreshToken() {
                await setIsLoading(true);
                await dispatch(refreshToken(localStorageToken))
                await setIsLoading(false);
            }

            _refreshToken();
        }

    }, []);

    if (isLoading) {
        return <span className="mt-2 ml-2">loading...</span>;
    }

    return <>
        <Router>
            <Switch>
                <Route exact path="/" component={LoginFormWrapper}/>
                <Route exact path="/privacy-policy" component={StaticPage}/>
                <Route exact path="/terms-of-service" component={StaticPage}/>
                <PrivateRoute exact token={token} path="/home" component={HomeComponent}/>
            </Switch>
        </Router>
    </>
}

export default App;
