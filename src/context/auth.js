import React, { createContext,useReducer, useContext } from 'react';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

let user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).user : "";
let token = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')).token : "";

export const initialState = {
    user: "" || user,
    token: "" || token,
    loading: false,
    errorMessage: null
}

const authReducer = (initialState, action) => {
    switch (action.type) {
        case 'LOGIN': 
        return {
            ...initialState,
            user: action.payload,
            token: action.payload.token
        }
        case 'LOGOUT':
            return {
                ...initialState,
                user: "",
                token: ""
            }
        case 'LOGIN_ERROR':
            return {
                ...initialState,
                loading:false,
                errorMessage: action.error
            }
        default: 
            throw new Error (`Unknown action type: ${action.type}` )
    }
}

export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {user:null})

    return (
        <AuthDispatchContext.Provider value={dispatch}>
                    <AuthStateContext.Provider value={state}>
                        {children}
                    </AuthStateContext.Provider>

        </AuthDispatchContext.Provider>

    )
    
}

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext)