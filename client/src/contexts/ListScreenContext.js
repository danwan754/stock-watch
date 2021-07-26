import { createContext, useReducer } from "react";
import { listScreenReducer } from "../reducers/listScreenReducer";


export const ListScreenContext = createContext();

const listScreenInitialState = {
    company: ''
}

export const ListScreenContextProvider = props => {
    const [listScreenState, listScreenDispatch] = useReducer(listScreenReducer, listScreenInitialState);

    return (
        <ListScreenContext.Provider value={
            {
                listScreenState,
                listScreenDispatch
            }
        }>
            {props.children}
        </ListScreenContext.Provider>
    )
}
