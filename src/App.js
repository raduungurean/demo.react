import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import LoginFormWrapper from "./components/LoginFormWrapper";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomeComponent from "./pages/HomeComponent";
import AddPostComponent from "./pages/AddPostComponent";
import {useSelector} from "react-redux";
import {selectToken} from "./selectors/auth";
import useAxiosInterceptNewToken from "./hooks/useAxiosInterceptNewToken";
import StaticPage from "./components/StaticPage";
import {ToastContainer} from "react-toastify";
import RefreshToken from "./components/RefreshToken";
import React from 'react';
import {selectAppIsLoading} from "./selectors/layout";

function App() {

    const token = useSelector(selectToken);
    const isLoading = useSelector(selectAppIsLoading);

    useAxiosInterceptNewToken();

    return <>
        <Router>
            <RefreshToken/>
            {isLoading ? <span className="mt-2 ml-2">loading...</span> :
                <Switch>
                    <Route exact path="/" component={LoginFormWrapper}/>
                    <Route exact path="/privacy-policy" component={StaticPage}/>
                    <Route exact path="/terms-of-service" component={StaticPage}/>
                    <PrivateRoute exact token={token} path="/home" component={HomeComponent}/>
                    <PrivateRoute exact token={token} path="/add-post" component={AddPostComponent}/>
                </Switch>}
        </Router>
        <ToastContainer/>
    </>
}

export default App;
