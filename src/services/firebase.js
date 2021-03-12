import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyANA00vHT2j14PwVqZxGxd30fUf_ad4qn8",
    authDomain: "custom-jwt-auth.firebaseapp.com",
    projectId: "custom-jwt-auth",
    storageBucket: "custom-jwt-auth.appspot.com",
    messagingSenderId: "760198945140",
    appId: "1:760198945140:web:1a068139e56f3abc287421"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth();
export const firestoreDb = firebase.firestore();

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;

    const userRef = firestoreDb.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const {email, displayName, photoURL} = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestoreDb.doc(`users/${uid}`).get();

        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};

export const firebaseLoadPosts = async uid => {
    if (!uid) return null;
    try {
        const postsRef = firestoreDb.collection("posts");
        const query = postsRef.where("uid", "==", uid);
        const querySnapshot = await query.get();
        const postsArr = [];
        querySnapshot.forEach((doc) => {
            postsArr.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return postsArr;
    } catch (error) {
        console.error("Error fetching user", error);
    }
}

export const firebaseLoadPost = async postId => {
    if (!postId) return null;
    try {
        const postDocument = await firestoreDb.doc(`posts/${postId}`).get();

        return {
            postId,
            ...postDocument.data()
        };
    } catch (error) {
        console.error("Error fetching the post", error);
    }
}

export const firebaseLoadPage = async pageId => {
    if (!pageId) return null;
    try {
        const pageDocument = await firestoreDb.doc(`pages/${pageId}`).get();

        return {
            pageId: pageId,
            ...pageDocument.data()
        };
    } catch (error) {
        console.error("Error fetching the post", error);
    }
}