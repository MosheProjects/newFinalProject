import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext, createContext } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }


    function logout() {        

        return signOut(auth);
    }
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            console.log("whats in user?",user);
            setLoading(false);
        })
        return unsubscribe
    }, [])
    const value = {
        setCurrentUser,
        currentUser,
        signup,
        login,
        logout,
        resetPassword

    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>

    )
}
