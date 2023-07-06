import  authGuard  from "./authGuard";
export default [
    {
        path: "/profile",
        name: "account",
        component: () => import("../views/Profile/index.vue"),
        children: [
            {
                path: "/profile",
                name: "/profile/account",
                component: () => import("../views/Profile/account.vue"),
                beforeEnter: authGuard,
            },
            {
                path: '/profile/account',
                name: 'account',
                component: () => import("../views/Profile/account.vue"),
                beforeEnter: authGuard,
            },
            {
                path: '/profile/orders',
                name: 'orders',
                component: () => import("../views/Profile/orders.vue"),
                beforeEnter: authGuard,
            },
            {
                path: '/profile/account-information',
                name: 'account-information',
                component: () => import("../views/Profile/account-information.vue"),
                beforeEnter: authGuard,
            },
            {
                path: '/profile/addresses',
                name: 'addresses',
                component: () => import("../views/Profile/addresses.vue"),
                beforeEnter: authGuard,
            },
            {
                path: '/profile/newsLetters',
                name: 'newsLetters',
                component: () => import("../views/Profile/newsLetters.vue"),
                beforeEnter: authGuard,
            },
            {
                path: '/profile/refunds',
                name: 'refunds',
                component: () => import("../views/Profile/refunds.vue"),
                beforeEnter: authGuard,
            },
            {
                path: '/profile/returns',
                name: 'returns',
                component: () => import("../views/Profile/returns.vue"),
                beforeEnter: authGuard,
            },
            {
                path: '/profile/reviews',
                name: 'reviews',
                component: () => import("../views/Profile/reviews.vue"),
                beforeEnter: authGuard,
            },
            {
                path: '/profile/social-accounts',
                name: 'social-accounts',
                component: () => import("../views/Profile/social-accounts.vue"),
                beforeEnter: authGuard,
            },
            {
                path: '/profile/wishlist',
                name: 'wishlist',
                component: () => import("../views/Profile/wishlist.vue"),
                beforeEnter: authGuard,
            },
            {
                path: '/profile/wallet',
                name: 'wallet',
                component: () => import("../views/Profile/wallet.vue"),
                beforeEnter: authGuard,
            },

        ]
    },
]