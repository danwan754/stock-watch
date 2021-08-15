import { createContext, useEffect, useReducer } from "react";
import { loginInitialState } from "../initialStates/login";
import { loginReducer } from "../reducers/loginReducer";
import { setRefreshTimeOut } from "../util/timeOutTokenRefresh";

export const LoginContext = createContext();

export const LoginContextProvider = props => {
    const [loginState, loginDispatch] = useReducer(loginReducer, loginInitialState);
  
    useEffect( async () => {
      async function authRefresh() {
          if (!loginState.jwtoken) {
              if (!await setRefreshTimeOut(loginDispatch)) {
                console.log('no refresh token');
              } else {
                  console.log('used refresh token');
              }
          }
      }
      await authRefresh();
    }, []);

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