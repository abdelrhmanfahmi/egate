function checklogged(to, from, next) {
    let IsAuthenticated = localStorage.getItem('EGate-userInfo') ? true : null;
    if (IsAuthenticated) {
        next();
    }else{
        next({name: "login"});
    } 
}

export default checklogged;