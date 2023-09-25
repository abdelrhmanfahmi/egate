import  authGuard  from "../authGuard";
export default [
    {
        path: '/auth/register',
        name: 'register',
        component: () => import("@/views/Auth/Register"),
        beforeEnter: authGuard,
    },
    {
        path: '/auth/activate/emailActivation',
        name: 'emailActivate',
        component: () => import("@/views/Auth/Activation/EmailActive.vue"),
        beforeEnter: authGuard,
    },
    {
        path: '/auth/activate/mobileActivation',
        name: 'mobileActivate',
        component: () => import("@/views/Auth/Activation/MobileActivate.vue"),
        beforeEnter: authGuard,
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () => import("@/views/Auth/Login"),
        beforeEnter: authGuard,
    },
]