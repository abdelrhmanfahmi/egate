function checkAuth(to, from, next) {
    let IsAuthenticated = localStorage.getItem('EGate-userInfo') ? true : null;
    if (IsAuthenticated) {
        next({name: 'home'});
    }else{
        next();
    } 
}

export default checkAuth;