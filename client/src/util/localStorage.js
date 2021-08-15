
const encryptRefreshToken = (token) => {

}

const decryptRefreshToken = (token) => {

}

export const getRefreshToken = () => {
    const localStorage = window.localStorage;
    const refreshTokenEncrypted = localStorage.getItem('refreshTokenEncrpyted');
    return decryptRefreshToken(refreshTokenEncrypted);
}

export const storeRefreshToken = (token) => {
    const localStorage = window.localStorage;
    const encryptedToken = encryptRefreshToken(token);
    localStorage.setItem('refreshTokenEncrypted', token);
}

export const deleteRefreshToken = () => {
    const localStorage = window.localStorage;
    localStorage.clear();
}