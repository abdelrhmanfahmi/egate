import router from "./index";

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggined) {
      next({ name: "Register" });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (isLoggined) {
      next({ name: "Home" });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
  
});