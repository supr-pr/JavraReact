import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyC9JT5ti87j_nJym5LpBhp3071dfmOrNkM",
    authDomain: "javra-6d044.firebaseapp.com",
    databaseURL: "https://javra-6d044.firebaseio.com",
    projectId: "javra-6d044",
    storageBucket: "javra-6d044.appspot.com",
    messagingSenderId: "892338915369",
    appId: "1:892338915369:web:c12558a4c66cc3eba2b438",
    measurementId: "G-WHXRTLM51R"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error: ', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
