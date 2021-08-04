import { createContext, useReducer } from "react"
import { newListReducer } from "../reducers/newListReducer"


export const NewListContext = createContext();

const initialState = {
    isOpen: false
}

export const NewListContextProvider = props => {
    const [newListState, newListDispatch] = useReducer(newListReducer, initialState);

    return (
        <NewListContext.Provider value={
            {
                newListState,
                newListDispatch
            }
        }>
            {props.children}
        </NewListContext.Provider>
    )
}