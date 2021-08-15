import { refreshToken } from "../actions/refreshToken";

var refreshTimer;

export const setRefreshTimeOut = async (loginDispatch, loginData) => {
    let data;
    if (loginData) {
        data = loginData;
    } else {
        data = await refreshToken(loginDispatch);
    }
    if (data.expiresAt) {
        refreshTimer = setTimeout(() => setRefreshTimeOut(loginDispatch), new Date(data.expiresAt) - new Date());
        return true;
    }
    return false;
}

export const clearRefreshTimeout = () => {
    clearTimeout(refreshTimer);
}