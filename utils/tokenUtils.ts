export const revokeToken = () => {
    localStorage.removeItem('token');
}


export const fetchToken = () => {
    return localStorage.getItem('token');
};