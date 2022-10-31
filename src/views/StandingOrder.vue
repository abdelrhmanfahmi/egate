<template>
    <div>
        <div class="container">
            <div class="order">
                <b-container>
                    <b-row>
                        <b-col lg="3" md="5">
                            <div v-if="userInfo.item.type === 'b2c'">
                                <div class="profile-menu">
                                    <h2>{{ $t("profile.myProfile") }}</h2>
                                    <h5 class="my-3">{{ buyerUserData.first_name }} {{ buyerUserData.last_name }}</h5>
                                    <ul v-if="!B2CbuyerLinks">
                                        <li v-for="(link, index) in B2CbuyerLinks" :key="index"
                                            :class="{ 'd-none': link.name === 'Subscribe to the newsletter' && buyerUserData.register_mailing_list }" >
                                            <router-link :to="link.to" :class="{ 'router-link-exact-active':link.name == 'Standing Order'  || link.name == 'قائمة الانتظار'}">
                                                <font-awesome-icon :icon="`fa-solid fa-${link.iconName}`" />
                                                <span>{{ link.name }}</span>
                                            </router-link>
                                        </li>
                                    </ul>
                                    <ul v-else>
                                        <li v-for="(link, index) in B2CsocialLinks" :key="index"
                                            :class="{ 'd-none': link.name === 'Subscribe to the newsletter' && buyerUserData.register_mailing_list }">
                                            <router-link :to="link.to" :class="{ 'router-link-exact-active':link.name == 'Standing Order'  || link.name == 'قائمة الانتظار'}">
                                                <font-awesome-icon :icon="`fa-solid fa-${link.iconName}`" />
                                                <span>{{ link.name }}</span>
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div v-else>
                                <div class="profile-menu">
                                    <h5 class="my-3">
                                        {{ buyerUserData.company_name }}
                                    </h5>

                                    <ul v-if="!socialLogin">
                                        <li v-for="(link, index) in B2BbuyerLinks" :key="index"
                                            :class="{ 'd-none': link.name === 'Subscribe to the newsletter' && buyerUserData.register_mailing_list , 'router-link-exact-active':link.name == 'Standing Order' }">
                                            <router-link :to="link.to" :class="{ 'router-link-exact-active':link.name == 'Standing Order' || link.name == 'قائمة الانتظار' }">
                                                <font-awesome-icon :icon="`fa-solid fa-${link.iconName}`" />
                                                <span>{{ link.name }}</span>
                                            </router-link>
                                        </li>
                                    </ul>
                                    <ul v-else>
                                        <li v-for="(link, index) in SocialLinks" :key="index"
                                            :class="{ 'd-none': link.name === 'Subscribe to the newsletter' && buyerUserData.register_mailing_list }">
                                            <router-link :to="link.to" :class="{ 'router-link-exact-active':link.name == 'Standing Order' || link.name == 'قائمة الانتظار' }">
                                                <font-awesome-icon :icon="`fa-solid fa-${link.iconName}`" />
                                                <span>{{ link.name }}</span>
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </b-col>
                        <b-col lg="9" md="7">
                            order id : {{id}}
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.query.id,
            B2BbuyerLinks: [
                {
                    to: "/profile/categories",
                    name: this.$t("profile.shop"),
                    iconName: "shop",
                },
                {
                    to: "/profile/shopping-cart",
                    name: this.$t("profile.shoppingCart"),
                    iconName: "cart-shopping",
                },
                {
                    to: "/profile/ordersListsB2b",
                    name: this.$t("profile.ordersLists"),
                    iconName: "clipboard-list",
                },
                {
                    to: "/profile/ReturnRequests",
                    name: this.$t("profile.returnRequests"),
                    iconName: "arrow-rotate-left",
                },
                {
                    to: "/profile/Wallet",
                    name: this.$t("profile.wallet"),
                    iconName: "wallet",
                },
                {
                    to: "/profile/account-information-b2b",
                    name: this.$t("profile.accountInformation"),
                    iconName: "circle-info",
                },
                {
                    to: "/profile/change-password",
                    name: this.$t("profile.changePassword"),
                    iconName: "key",
                },
                {
                    to: "/profile/adress-book",
                    name: this.$t("profile.addressBook"),
                    iconName: "location-dot",
                },

                {
                    to: "/profile/documents",
                    name: this.$t("profile.documents"),
                    iconName: "file",
                },
                {
                    to: "/profile/subscribe-newsletter",
                    name: this.$t("profile.subscribeNewsletter"),
                    iconName: "newspaper",
                },

                {
                    to: "/profile/favorite",
                    // name: this.$t("profile.b2bFav"),
                    name: this.$t("profile.favorite"),
                    iconName: "heart",
                },
                {
                    to: "/profile/StandingOrders",
                    name: this.$t("profile.b2bFav"),
                    iconName: "bag-shopping",
                },
                // {
                //   to: "/profile/giftCardB2b",
                //   name: this.$t("profile.giftCard"),
                //   iconName: "gift",
                // },
                {
                    to: "/profile/QuotationsB2b",
                    name: this.$t("profile.quotations"),
                    iconName: "list-ol",
                },
                {
                    to: "/profile/product-reviews-b2b",
                    name: this.$t("profile.productReviews"),
                    iconName: "cubes",
                },

                // {
                //   to: "/profile/ResidentsB2b",
                //   name: this.$t("profile.residents"),
                //   iconName: "receipt",
                // },
                // {
                //   to: "/profile/BankNotificationsB2b",
                //   name: this.$t("profile.bankNotifications"),
                //   iconName: "money-bill-wave",
                // },

                // {
                //   to: "/profile/supplierRatingB2b",
                //   name: this.$t("profile.supplierRatings"),
                //   iconName: "star",
                // },

                {
                    to: "/profile/SupplierCorrespondenceB2b",
                    name: this.$t("profile.supplierCorrespondence"),
                    iconName: "comments",
                },
                {
                    to: "/profile/Notifications",
                    name: this.$t("profile.Notifications"),
                    iconName: "bell",
                },

            ],
            B2BSocialLinks: [
                {
                    to: "/profile/categories",
                    name: this.$t("profile.shop"),
                    iconName: "shop",
                },
                {
                    to: "/profile/shopping-cart",
                    name: this.$t("profile.shoppingCart"),
                    iconName: "cart-shopping",
                },
                {
                    to: "/profile/ordersListsB2b",
                    name: this.$t("profile.ordersLists"),
                    iconName: "clipboard-list",
                },
                {
                    to: "/profile/ReturnRequests",
                    name: this.$t("profile.returnRequests"),
                    iconName: "arrow-rotate-left",
                },
                {
                    to: "/profile/Wallet",
                    name: this.$t("profile.wallet"),
                    iconName: "wallet",
                },
                {
                    to: "/profile/account-information-b2b",
                    name: this.$t("profile.accountInformation"),
                    iconName: "circle-info",
                },
                // {
                //   to: "/profile/change-password",
                //   name: this.$t("profile.changePassword"),
                //   iconName: "key",
                // },
                {
                    to: "/profile/adress-book",
                    name: this.$t("profile.addressBook"),
                    iconName: "location-dot",
                },

                {
                    to: "/profile/documents",
                    name: this.$t("profile.documents"),
                    iconName: "file",
                },
                {
                    to: "/profile/subscribe-newsletter",
                    name: this.$t("profile.subscribeNewsletter"),
                    iconName: "newspaper",
                },

                {
                    to: "/profile/favorite",
                    name: this.$t("profile.favorite"),
                    iconName: "heart",
                },
                {
                    to: "/profile/StandingOrders",
                    name: this.$t("profile.b2bFav"),
                    iconName: "bag-shopping",
                },
                // {
                //   to: "/profile/giftCardB2b",
                //   name: this.$t("profile.giftCard"),
                //   iconName: "gift",
                // },
                {
                    to: "/profile/QuotationsB2b",
                    name: this.$t("profile.quotations"),
                    iconName: "list-ol",
                },
                {
                    to: "/profile/product-reviews-b2b",
                    name: this.$t("profile.productReviews"),
                    iconName: "cubes",
                },

                // {
                //   to: "/profile/ResidentsB2b",
                //   name: this.$t("profile.residents"),
                //   iconName: "receipt",
                // },
                // {
                //   to: "/profile/BankNotificationsB2b",
                //   name: this.$t("profile.bankNotifications"),
                //   iconName: "money-bill-wave",
                // },

                // {
                //   to: "/profile/supplierRatingB2b",
                //   name: this.$t("profile.supplierRatings"),
                //   iconName: "star",
                // },

                {
                    to: "/profile/SupplierCorrespondenceB2b",
                    name: this.$t("profile.supplierCorrespondence"),
                    iconName: "comments",
                },
                {
                    to: "/profile/Notifications",
                    name: this.$t("profile.Notifications"),
                    iconName: "bell",
                },

            ],

            B2CbuyerLinks: [
                {
                    to: "/profile/categories",
                    name: this.$t("profile.shop"),
                    iconName: "shop",
                },
                {
                    to: "/profile/shopping-cart",
                    name: this.$t("profile.shoppingCart"),
                    iconName: "cart-shopping",
                },
                {
                    to: "/profile/ordersListsB2b",
                    name: this.$t("profile.ordersLists"),
                    iconName: "clipboard-list",
                },
                {
                    to: "/profile/ReturnRequests",
                    name: this.$t("profile.returnRequests"),
                    iconName: "arrow-rotate-left",
                },
                {
                    to: "/profile/Wallet",
                    name: this.$t("profile.wallet"),
                    iconName: "wallet",
                },
                {
                    to: "/profile/account-information-b2b",
                    name: this.$t("profile.accountInformation"),
                    iconName: "circle-info",
                },
                {
                    to: "/profile/change-password",
                    name: this.$t("profile.changePassword"),
                    iconName: "key",
                },
                {
                    to: "/profile/adress-book",
                    name: this.$t("profile.addressBook"),
                    iconName: "location-dot",
                },
                {
                    to: "/profile/subscribe-newsletter",
                    name: this.$t("profile.subscribeNewsletter"),
                    iconName: "newspaper",
                },

                {
                    to: "/profile/favorite",
                    name: this.$t("profile.favorite"),
                    iconName: "heart",
                },
                {
                    to: "/profile/StandingOrders",
                    name: this.$t("profile.b2bFav"),
                    iconName: "bag-shopping",
                },
                // {
                //   to: "/profile/giftCardB2b",
                //   name: this.$t("profile.giftCard"),
                //   iconName: "gift",
                // },
                {
                    to: "/profile/QuotationsB2b",
                    name: this.$t("profile.quotations"),
                    iconName: "list-ol",
                },
                {
                    to: "/profile/product-reviews-b2b",
                    name: this.$t("profile.productReviews"),
                    iconName: "cubes",
                },
                {
                    to: "/profile/SupplierCorrespondenceB2b",
                    name: this.$t("profile.supplierCorrespondence"),
                    iconName: "comments",
                },
            ],
            B2CsocialLinks: [
                {
                    to: "/profile/categories",
                    name: this.$t("profile.shop"),
                    iconName: "shop",
                },
                {
                    to: "/profile/shopping-cart",
                    name: this.$t("profile.shoppingCart"),
                    iconName: "cart-shopping",
                },
                {
                    to: "/profile/ordersListsB2b",
                    name: this.$t("profile.ordersLists"),
                    iconName: "clipboard-list",
                },
                {
                    to: "/profile/ReturnRequests",
                    name: this.$t("profile.returnRequests"),
                    iconName: "arrow-rotate-left",
                },
                {
                    to: "/profile/Wallet",
                    name: this.$t("profile.wallet"),
                    iconName: "wallet",
                },
                {
                    to: "/profile/account-information-b2b",
                    name: this.$t("profile.accountInformation"),
                    iconName: "circle-info",
                },
                {
                    to: "/profile/change-password",
                    name: this.$t("profile.changePassword"),
                    iconName: "key",
                },
                {
                    to: "/profile/adress-book",
                    name: this.$t("profile.addressBook"),
                    iconName: "location-dot",
                },
                {
                    to: "/profile/subscribe-newsletter",
                    name: this.$t("profile.subscribeNewsletter"),
                    iconName: "newspaper",
                },

                {
                    to: "/profile/favorite",
                    name: this.$t("profile.favorite"),
                    iconName: "heart",
                },
                {
                    to: "/profile/StandingOrders",
                    name: this.$t("profile.b2bFav"),
                    iconName: "bag-shopping",
                },
                // {
                //   to: "/profile/giftCardB2b",
                //   name: this.$t("profile.giftCard"),
                //   iconName: "gift",
                // },
                {
                    to: "/profile/QuotationsB2b",
                    name: this.$t("profile.quotations"),
                    iconName: "list-ol",
                },
                {
                    to: "/profile/product-reviews-b2b",
                    name: this.$t("profile.productReviews"),
                    iconName: "cubes",
                },
                {
                    to: "/profile/SupplierCorrespondenceB2b",
                    name: this.$t("profile.supplierCorrespondence"),
                    iconName: "comments",
                },
                {
                    to: "/profile/Notifications",
                    name: this.$t("profile.Notifications"),
                    iconName: "bell",
                },
            ],
        }
    }
}
</script>

<style>

</style>