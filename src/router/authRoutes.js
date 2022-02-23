import Register from "../views/auth/register.vue";
import OtaVerification from "../views/auth/OtpVerification.vue";
import b2bRegister from "../views/auth/b2bRegister.vue";
import b2bLogin from "../views/auth/b2bLogin.vue";

export default [
  {
    path: "/user-register",
    name: "Register",
    component: Register,
  },
  {
    path: "/ota-verification",
    name: "OtaVerification",
    component: OtaVerification,
  },
  {
    path: "/b2b-register",
    name: "B2bRegister",
    component: b2bRegister,
  },
  {
    path: "/b2b-login",
    name: "b2bLogin",
    component: b2bLogin,
  },
];
