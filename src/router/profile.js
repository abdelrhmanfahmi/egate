import loggedGuard from "./loggedGuard";
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
                beforeEnter: loggedGuard,
            },
            {
                path: '/profile/account',
                name: 'account',
                component: () => import("../views/Profile/account.vue"),
                beforeEnter: loggedGuard,
            },
            {
                path: '/profile/orders',
                name: 'orders',
                component: () => import("../views/Profile/orders.vue"),
                beforeEnter: loggedGuard,
            },
            {
                path: '/profile/account-information',
                name: 'account-information',
                component: () => import("../views/Profile/account-information.vue"),
                beforeEnter: loggedGuard,
            },
            {
                path: '/profile/addresses',
                name: 'addresses',
                component: () => import("../views/Profile/addresses.vue"),
                beforeEnter: loggedGuard,
            },
            {
                path: '/profile/edit/address/:id',
                name: 'editAddress',
                component: () => import("../views/Profile/EditAddress.vue"),
                beforeEnter: loggedGuard,
            },
            {
                path: '/profile/newsLetters',
                name: 'newsLetters',
                component: () => import("../views/Profile/newsLetters.vue"),
                beforeEnter: loggedGuard,
            },
            {
                path: '/profile/refunds',
                name: 'refunds',
                component: () => import("../views/Profile/refunds.vue"),
                beforeEnter: loggedGuard,
            },
            {
                path: '/profile/returns',
                name: 'returns',
                component: () => import("../views/Profile/returns.vue"),
                beforeEnter: loggedGuard,
            },
            {
                path: '/profile/reviews',
                name: 'reviews',
                component: () => import("../views/Profile/reviews.vue"),
                beforeEnter: loggedGuard,
            },
            {
                path: '/profile/social-accounts',
                name: 'social-accounts',
                component: () => import("../views/Profile/social-accounts.vue"),
                beforeEnter: loggedGuard,
            },
            {
                path: '/profile/wishlist',
                name: 'wishlist',
                component: () => import("../views/Profile/wishlist.vue"),
                beforeEnter: loggedGuard,
            },
            {
                path: '/profile/wallet',
                name: 'wallet',
                component: () => import("../views/Profile/wallet.vue"),
                beforeEnter: loggedGuard,
            },

        ]
    },
]