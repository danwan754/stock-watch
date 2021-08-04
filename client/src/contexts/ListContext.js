import { createContext, useReducer } from "react"
import { listReducer } from "../reducers/listReducer"


export const ListContext = createContext();

const initialState = {
    isOpen: false
}

export const ListContextProvider = props => {
    const [listState, listDispatch] = useReducer(listReducer, initialState);

    return (
        <ListContext.Provider value={
            {
                listState,
                listDispatch
            }
        }>
            {props.children}
        </ListContext.Provider>
    )
}