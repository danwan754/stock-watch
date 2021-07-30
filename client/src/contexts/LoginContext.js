import { createContext, useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";

export const LoginContext = createContext();

const loginInitialState = {
    loading: false,
    username: 'dano13124@gmail.com',
    // jwtoken: '',
    jwtoken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3MjA5NTIwLCJleHAiOjE2Mjc4MTQzMjB9.CwQaJ0lm7287Pft4M8TrbqVevkCh5TGeeURbfRt0uvY",
    error: null
}


export const LoginContextProvider = props => {
    const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState);

    return (
        <LoginContext.Provider value={
            {
                loginState,
                loginDispatch
            }
        }>
            {props.children}
        </LoginContext.Provider>
    )
}