export default [
    {
        path: '/auth/register',
        name: 'register',
        component: () => import("@/views/Auth/Register"),
    },
    {
        path: '/auth/login',
        name: 'login',
        component: () => import("@/views/Auth/Login"),
    },
]