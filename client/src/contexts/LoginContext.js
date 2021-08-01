import { createContext, useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";

export const LoginContext = createContext();

const loginInitialState = {
    loading: false,
    username: 'blah@gmail.com',
    // jwtoken: '',
    jwtoken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3Nzg1Mzk0LCJleHAiOjE2MjgzOTAxOTR9.ymCL9tA2mhV3jgxoj8UDtJzuiq-79Z0MVFy6B3mns2g",
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