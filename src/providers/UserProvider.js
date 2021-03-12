import React, { Component, createContext } from "react";
import { firebaseAuth, generateUserDocument } from "../services/firebase";

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
    state = {
        user: null
    };

    componentDidMount = async () => {
        firebaseAuth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                // console.log('### userAuth', userAuth.uid);
                try {
                    const user = await generateUserDocument(userAuth);
                    this.setState({user});
                } catch (e) {
                    console.log(e);
                }
            } else {
                // logged out from firebase
                // TODO, remove from store, redirect to sign in
            }
        });
    };

    render() {
        const { user } = this.state;
        return (
            <UserContext.Provider value={user}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;