import { createContext, useReducer } from "react";
import { companiesReducer } from "../reducers/companiesReducer";
import { loginReducer } from "../reducers/loginReducer";


export const MainContext = createContext();

const companiesInitialState = {
    loading: false,
    companies: [],
    error: null
}

const loginInitialState = {
    loading: false,
    jwtoken: '',
    error: null
}

export const MainContextProvider = props => {
    const [companiesState, companiesDispatch] = useReducer(companiesReducer, companiesInitialState);
    const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState);

    return (
        <MainContext.Provider value={
            {
                companiesState,
                companiesDispatch,
                loginState,
                loginDispatch
            }
        }>
            {props.children}
        </MainContext.Provider>
    )
}