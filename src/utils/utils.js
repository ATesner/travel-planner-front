export function userConnected() {
    let token = sessionStorage.getItem('token');
    return token && token != null && token != "";
}