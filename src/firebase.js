// Import the functions you need from the SDKs you need
import {useState, useEffect} from "react"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9IRJ4tOkfhHvoUzPMga_4rsiFoC1TrBo",
  authDomain: "webappcryptosas.firebaseapp.com",
  projectId: "webappcryptosas",
  storageBucket: "webappcryptosas.appspot.com",
  messagingSenderId: "722402384732",
  appId: "1:722402384732:web:6e060f174e607c060fbf99",
  measurementId: "G-F663DLF0YY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()

export function signup(email, password){
    return createUserWithEmailAndPassword(auth, email, password)
}
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function useAuth(){
    const [currentUser, setCurrentUser] = useState();
    useEffect(()=>{
       const unsub = onAuthStateChanged(auth ,(user)=>{setCurrentUser(user)})
       return unsub;
    },[])
    return( currentUser)
}

