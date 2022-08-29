import React from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import firebaseConfig from './configs/firebase.config';

// firebase.initializeApp(firebaseConfig);  // old version
const app = initializeApp(firebaseConfig);



export const handleGoogleSignIn = () => {
    // google provider
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
            // console.log(result);
            const { displayName, photoURL, email } = user;
            const signInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signInUser;

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

export const handleSignOut = () => {
    const auth = getAuth();
    return signOut(auth).then(res => {
        // Sign-out successful.
        const signOutUser = {
            isSignIn: false,
            name: '',
            photoURL: '',
            email: '',
            success: false
        }
        return signOutUser;
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}

export const createUserWithEmailAndPasswordFunnction = (name, email, password) => {

    //here i face problem that, google only accept password at least 6 digit
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        .then((res) => {
            // Signed in
            // const user = userCredential.user;
            // ...
            // console.log(user);
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;

            // 6. video start
            updateUserName(name);
            verifyEmail();
            return newUserInfo;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log("errorMessage: ", errorMessage);
            const newUserInfo = {};
            newUserInfo.error = errorMessage;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

export const signInWithEmailAndPasswordFunction = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
        // .then((userCredential) => {
        .then((res) => {
            // Signed in
            // const user = userCredential.user;
            // ...
            const newUserInfo = res.user
            newUserInfo.error = '';
            newUserInfo.success = true;

            return newUserInfo;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("errorMessage: ", errorMessage);
            const newUserInfo = {};
            newUserInfo.error = errorMessage;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
        displayName: name
    }).then(() => {
        // Profile updated!
        // ...
        console.log('user name updated successfully');
    }).catch((error) => {
        // An error occurred
        // ...
        console.log(error);
    });
}

const verifyEmail = () => {

    const auth = getAuth();
    sendEmailVerification(auth.currentUser)
        .then(() => {
            // Email verification sent!
            // ...
        });
}

export const resetPassword = email => {

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
}