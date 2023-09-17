export default [
    {
        path: '/auth/register',
        name: 'register',
        component: () => import("@/views/Auth/Register"),
    },
    {
        path: '/auth/activate/emailActivation',
        name: 'emailActivate',
        component: () => import("@/views/Auth/Activation/EmailActive.vue"),
    },
    {
        path: '/auth/activate/mobileActivation',
        name: 'mobileActivate',
        component: () => import("@/views/Auth/Activation/MobileActivate.vue"),
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () => import("@/views/Auth/Login"),
    },
]