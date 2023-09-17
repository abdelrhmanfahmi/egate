function checkAuth(to, from, next) {
    let IsAuthenticated = localStorage.getItem('EGate-userInfo') ? true : null
    if (IsAuthenticated == true) next();
    else next("/auth/login");
}

export default checkAuth