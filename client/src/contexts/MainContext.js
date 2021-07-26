import { createContext, useReducer } from "react";
import { companiesReducer } from "../reducers/companiesReducer";
import { companyReducer } from "../reducers/companyReducer";
import { listsReducer } from "../reducers/listsReducer";
import { loginReducer } from "../reducers/loginReducer";


export const MainContext = createContext();

const companiesInitialState = {
    loading: false,
    companies: [],
    error: null
}

const loginInitialState = {
    loading: false,
    // jwtoken: '',
    jwtoken: "",
    error: null
}

const listsInitialState = {
    loading: false,
    lists: [], // [{ listName: 'name1', stocks: [{ ticker: 'AAPL', companyName: 'Apple Inc' }]}]
    error: null
}

const companyInitialState = {
    loading: false,
    company: '',
    companyObj: {},
    news: [],
    error: null
}

export const MainContextProvider = props => {
    const [companiesState, companiesDispatch] = useReducer(companiesReducer, companiesInitialState);
    const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState);
    const [listsState, listsDispatch] = useReducer(listsReducer, listsInitialState);
    const [companyState, companyDispatch] = useReducer(companyReducer, companyInitialState);

    return (
        <MainContext.Provider value={
            {
                companiesState,
                companiesDispatch,
                loginState,
                loginDispatch,
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