import { createContext, useReducer } from "react";
import { companyInitialState } from "../initialStates/company";
import { companiesInitialState } from '../initialStates/companies';
import { listsInitialState } from "../initialStates/lists";
import { companiesReducer } from "../reducers/companiesReducer";
import { companyReducer } from "../reducers/companyReducer";
import { listsReducer } from "../reducers/listsReducer";
// import { loginReducer } from "../reducers/loginReducer";


export const MainContext = createContext();

// const companiesInitialState = {
//     loading: false,
//     companies: [],
//     error: null
// }

// const loginInitialState = {
//     loading: false,
//     // jwtoken: '',
//     jwtoken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjI3MjA5NTIwLCJleHAiOjE2Mjc4MTQzMjB9.CwQaJ0lm7287Pft4M8TrbqVevkCh5TGeeURbfRt0uvY",
//     error: null
// }

// const companyInitialState = {
//     loading: false,
//     company: '',
//     companyObj: {},
//     news: [],
//     error: null
// }

export const MainContextProvider = props => {
    const [companiesState, companiesDispatch] = useReducer(companiesReducer, companiesInitialState);
    // const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState);
    const [listsState, listsDispatch] = useReducer(listsReducer, listsInitialState);
    const [companyState, companyDispatch] = useReducer(companyReducer, companyInitialState);

    return (
        <MainContext.Provider value={
            {
                companiesState,
                companiesDispatch,
                // loginState,
                // loginDispatch,
                listsState,
                listsDispatch,
                companyState,
                companyDispatch
            }
        }>
            {props.children}
        </MainContext.Provider>
    )
}