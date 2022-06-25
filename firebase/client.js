import * as firebase from "firebase/app";
import { GithubAuthProvider, signInWithPopup, getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDdD7-nxwimdYRjvViqCrH41EQPfM2WpsI",
    authDomain: "devter-b92d1.firebaseapp.com",
    projectId: "devter-b92d1",
    storageBucket: "devter-b92d1.appspot.com",
    messagingSenderId: "270724186431",
    appId: "1:270724186431:web:648f9e5522a5cf1327538a",
    measurementId: "G-WKYKB2DGE4"
};

/* initializeApp(firebaseConfig)

export const loginWithGitHub = () => {
    const githubProvider = new GithubAuthProvider()
    return auth.signInWithPopup(githubProvider)
} */

firebase.initializeApp(firebaseConfig)

export const loginWithGitHub = () => {
    const githubProvider = new GithubAuthProvider()
    const auth = getAuth()
    return signInWithPopup(auth, githubProvider)
        .then(userCredential => {
            const { user } = userCredential
            return user
        })
}