<template>
    <div>
        <div class="supplier" v-if="myProduct.client.company_name">
            <!-- {{ $t("singleProduct.supplier") }} -->
            <!-- <b>:</b> -->
            <div class="row justify-content-center align-items-center">
                <div class="col-6 mb-2">
                    <router-link :to="`/suppliers/${myProduct.client.id}`">
                        <img :src="myProduct.client.image_path" class="supplier-image" alt="" srcset="" />
                        {{ myProduct.client.company_name }}
                    </router-link>
                </div>
                <div class="col-6 mb-2" v-if="buyerUserData">
                    <b-button variant="outline-danger" id="show-btn" class="mx-2"
                        @click="$bvModal.show('bv-modal-example')">{{ $t("supplier.sendSupplierMessage") }}</b-button>
                </div>
                <div class="col-6 mb-2" v-else>
                    <b-button variant="outline-danger" id="show-btn" class="mx-2" @click="loginFirst">{{
                            $t("supplier.sendSupplierMessage")
                    }}</b-button>
                    <!-- <router-link to="/b2b-login">{{ $t("login.login") }}</router-link> -->
                </div>
                <b-modal id="bv-modal-example" centered hide-footer>
                    <template #modal-title>
                        {{ $t("profile.yourMessage") }}
                    </template>
                    <div class="d-block">
                        <div class="data-holder">
                            <form>
                                <div class="form-group required">
                                    <label for="subject">
                                        {{ $t("supplier.subject") }}
                                        <span class="text-danger">*</span>
                                    </label>
                                    <input type="text" class="form-control" v-model="subject" />
                                    <div class="error mt-2">
                                        <p v-for="(error, index) in errors.subject" :key="index">
                                            {{ error }}
                                        </p>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="message">
                                        {{ $t("contactUs.formMessage") }}
                                        <span class="text-danger">*</span>
                                    </label>
                                    <textarea class="form-control" name="" id="" cols="30" rows="10" v-model="message"
                                        required></textarea>
                                </div>
                                <div class="error mt-2">
                                    <p v-for="(error, index) in errors.message" :key="index">
                                        {{ error }}
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <b-button v-if="buyerUserData" class="mt-3" variant="outline-success" block
                        @click="sendSupplierMessage(myProduct.client.id)">{{ $t("profile.send") }}</b-button>
                    <!-- <b-button class="mt-3" variant="outline-success" block @click="$bvModal.hide('bv-modal-example')"
          >{{$t('cart.addToCart')}}</b-button
        > -->
                </b-modal>
            </div>
        </div>
        <div v-if="myProduct.product_details_by_type"
            class="product-actions row justify-content-between align-items-center mt-4">

            <div class="col-3" v-if="cartAvailable  == 'available' && myProduct.product_details_by_type.quantity > 0">
                <div class="product-counter mb-2" v-if="
                    myProduct.product_details_by_type.add_type === 'cart' ||
                    myProduct.product_details_by_type.add_type === 'both'
                ">
                    <div class="value">
                        <span class="product-counter-number">
                            {{ mySelectedOption ? mySelectedOption : 1 }}</span>
                    </div>
                    <div class="actions d-flex flex-column">
                        <button class="product-counter-btn" @click="incrementQuantity">
                            <b-icon-plus />
                        </button>
                        <button class="product-counter-btn" @click="
                            decrementQuantity(
                                myProduct.product_details_by_type.min_order_quantity
                            )
                        " :disabled="mySelectedOption == 1">
                            <b-icon-dash />
                        </button>
                    </div>
                </div>
            </div>

            <div class="col-9" v-if="myProduct.product_details_by_type.quantity > 0">
                <div class="mb-2 mr-1" v-if="
                    (buyerUserData &&
                        buyerUserData.profile_percentage == 100 &&
                        buyerUserData.type === 'buyer') ||
                    buyerUserData.type === 'b2b' ||
                    (buyerUserData.type === 'supplier' &&
                        buyerUserData.is_buyer == true)
                ">
                    <b-button @ok="$refs.cartModal.onSubmit()" @click="addToCart(myProduct)"
                        class="btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn btn-block"
                        v-if="cartAvailable  == 'available' &&  
                            myProduct.product_details_by_type.add_type === 'cart' || cartAvailable  == 'available' && 
                            myProduct.product_details_by_type.add_type === 'both'
                        ">
                        <span>
                            <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                        </span>
                        {{ $t("singleProduct.addCart") }}
                    </b-button>

                    <!-- <transition name="modal">
            <div class="modal-mask" v-if="showModal">
              <modal @close="closeModal" :product="myProduct" />
            </div>
          </transition> -->
                </div>
                <div class="mb-2" v-else-if="
                    (buyerUserData && buyerUserData.profile_percentage !== 100) ||
                    (buyerUserData &&
                        buyerUserData.type === 'buyer' &&
                        buyerUserData.profile_percentage !== 100) ||
                    (buyerUserData &&
                        buyerUserData.type === 'b2b' &&
                        buyerUserData.profile_percentage !== 100) ||
                    (buyerUserData &&
                        buyerUserData.type === 'supplier' &&
                        buyerUserData.is_buyer !== true &&
                        buyerUserData.profile_percentage !== 100)
                ">
                    <router-link to="/profile/account-information-b2b">
                        {{ $t("profile.completeAccount") }}
                    </router-link>
                </div>
                <div class="mb-2" v-else-if="!buyerUserData || buyerUserData.type === 'b2c'">
                    <b-button @ok="$refs.cartModal.onSubmit()" @click="addToCart(myProduct)"
                        class="btn btn-loght border-0 outline-none shadow-none d-block add-cart cart-btn" v-if="
                        cartAvailable  == 'available' &&  
                            myProduct.product_details_by_type.add_type === 'cart' || cartAvailable  == 'available' && 
                            myProduct.product_details_by_type.add_type === 'both' 
                        ">
                        <span>
                            <font-awesome-icon icon="fa-solid fa-cart-shopping" />
                        </span>
                        {{ $t("singleProduct.addCart") }}
                    </b-button>
                </div>
            </div>

        </div>
        <div class="product-actions short-links mb-2 mr-1">
            <button class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 loged-in btn-block"
                v-if="RfqAvailable  == 'available' && 
                    (myProduct.product_details_by_type.add_type === 'rfq' || RfqAvailable  == 'available' &&
                        myProduct.product_details_by_type.add_type === 'both') &&
                    buyerUserData
                ">
                <div>
                    <button id="show-btn" class="btn btn-loght border-0 outline-none shadow-none d-block add-cart w-100"
                        @click="$bvModal.show('bv-bidRequest')">
                        <!-- <span role="button" @click="loggedBidRequest"> -->
                        <span>
                            <rfqIcon class="mx-2" />
                        </span>
                        {{ $t("singleProduct.bidRequest") }}
                    </button>
                </div>
            </button>
            <button @click="loginFirst"
                class="btn btn-loght border-0 outline-none shadow-none d-block add-cart btn-block w-100" v-else-if="RfqAvailable  == 'available' && 
                    (myProduct.product_details_by_type.add_type === 'rfq' ||
                        myProduct.product_details_by_type.add_type === 'both') &&
                    !buyerUserData
                ">
                <span>
                    <rfqIcon class="mx-2" />
                </span>
                {{ $t("singleProduct.bidRequest") }}
            </button>
            <button class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 btn-block w-100"
                v-else-if="RfqAvailable  == 'available' && 
                    myProduct.product_details_by_type.add_type === 'rfq' || RfqAvailable  == 'available' &&
                    myProduct.product_details_by_type.add_type === 'both'
                ">
                <!-- <router-link to="/b2b-login"> -->
                <span>
                    <rfqIcon class="mx-2" />
                </span>

                {{ $t("singleProduct.bidRequest") }}

                <!-- </router-link> -->
            </button>
            <!-- <button
            @click="addToWishlist(myProduct)"
            v-if="myProduct.is_favorite == false"
            class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 d-block mt-3"
          >
            {{ $t("singleProduct.addFavorites") }}
            <span>
              <font-awesome-icon icon="fa-solid fa-heart" />
            </span>
          </button>
          <div v-else class="font-weight-bold mt-3">
            <span class="text-danger">
              <font-awesome-icon icon="fa-solid fa-heart " />
            </span>
          </div> -->
            <!-- <button class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0" >
            {{ $t("singleProduct.addPurchase") }}
            <span>
              <font-awesome-icon icon="fa-solid fa-repeat" />
            </span>
          </button> -->
        </div>
        <div class="row justify-content-center align-items-center">
            <div class="col-5">
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <div v-if="myProduct.product_details_by_type.quantity > 0" class="new-wishlist-method">
                            <div class="products mb-2" v-if="buyerUserData">
                                <!-- <a class="text-danger d-flex justify-content-center align-items-center bg-transparent text-white"
                            :title="`product in favourite`" v-if="myProduct.is_favorite == true">
                            <font-awesome-icon icon="fa-solid fa-star" />
                        </a> -->
                                <!-- <a 
                            class="d-flex justify-content-center align-items-center text-dark" v-else>
                            <font-awesome-icon icon="fa-solid fa-star" />
                        </a> -->
                                <a class="button one active animate mobile button--secondary wishlist-btn"
                                    :title="`product in favourite`" v-if="myProduct.is_favorite == true">

                                    <div class="btn__effect">
                                        <svg class="heart-stroke icon-svg icon-svg--size-4 icon-svg--color-silver"
                                            viewBox="20 18 29 28" aria-hidden="true" focusable="false">
                                            <path
                                                d="M28.3 21.1a4.3 4.3 0 0 1 4.1 2.6 2.5 2.5 0 0 0 2.3 1.7c1 0 1.7-.6 2.2-1.7a3.7 3.7 0 0 1 3.7-2.6c2.7 0 5.2 2.7 5.3 5.8.2 4-5.4 11.2-9.3 15a2.8 2.8 0 0 1-2 1 3.4 3.4 0 0 1-2.2-1c-9.6-10-9.4-13.2-9.3-15 0-1 .6-5.8 5.2-5.8m0-3c-5.3 0-7.9 4.3-8.2 8.5-.2 3.2.4 7.2 10.2 17.4a6.3 6.3 0 0 0 4.3 1.9 5.7 5.7 0 0 0 4.1-1.9c1.1-1 10.6-10.7 10.3-17.3-.2-4.6-4-8.6-8.4-8.6a7.6 7.6 0 0 0-6 2.7 8.1 8.1 0 0 0-6.2-2.7z">
                                            </path>
                                        </svg>
                                        <svg class="heart-full icon-svg icon-svg--size-4 icon-svg--color-blue"
                                            viewBox="0 0 19.2 18.5" aria-hidden="true" focusable="false">
                                            <path
                                                d="M9.66 18.48a4.23 4.23 0 0 1-2.89-1.22C.29 10.44-.12 7.79.02 5.67.21 2.87 1.95.03 5.42.01c1.61-.07 3.16.57 4.25 1.76A5.07 5.07 0 0 1 13.6 0c2.88 0 5.43 2.66 5.59 5.74.2 4.37-6.09 10.79-6.8 11.5-.71.77-1.7 1.21-2.74 1.23z">
                                            </path>
                                        </svg>
                                        <svg class="broken-heart" xmlns="http://www.w3.org/2000/svg" width="48"
                                            height="16" viewBox="5.707 17 48 16">
                                            <g fill="#dc3545">
                                                <path class="broken-heart--left"
                                                    d="M29.865 32.735V18.703a4.562 4.562 0 0 0-3.567-1.476c-2.916.017-4.378 2.403-4.538 4.756-.118 1.781.227 4.006 5.672 9.737a3.544 3.544 0 0 0 2.428 1.025l-.008-.008.013-.002z" />
                                                <path class="broken-heart--right"
                                                    d="M37.868 22.045c-.135-2.588-2.277-4.823-4.697-4.823a4.258 4.258 0 0 0-3.302 1.487l-.004-.003v14.035a3.215 3.215 0 0 0 2.289-1.033c.598-.596 5.882-5.99 5.714-9.663z" />
                                            </g>
                                            <path class="broken-heart--crack" fill="none" stroke="#FFF"
                                                stroke-miterlimit="10" d="M29.865 18.205v14.573" />
                                        </svg>
                                        <div class="effect-group">
                                            <span class="effect"></span>
                                            <span class="effect"></span>
                                            <span class="effect"></span>
                                            <span class="effect"></span>
                                            <span class="effect"></span>
                                        </div>
                                    </div>
                                </a>
                                <a class="button one inactive mobile button--secondary wishlist-btn mx-1"
                                    @click="addToWishlist(myProduct)" v-else>

                                    <div class="btn__effect">
                                        <svg class="heart-stroke icon-svg icon-svg--size-4 icon-svg--color-silver"
                                            viewBox="20 18 29 28" aria-hidden="true" focusable="false">
                                            <path
                                                d="M28.3 21.1a4.3 4.3 0 0 1 4.1 2.6 2.5 2.5 0 0 0 2.3 1.7c1 0 1.7-.6 2.2-1.7a3.7 3.7 0 0 1 3.7-2.6c2.7 0 5.2 2.7 5.3 5.8.2 4-5.4 11.2-9.3 15a2.8 2.8 0 0 1-2 1 3.4 3.4 0 0 1-2.2-1c-9.6-10-9.4-13.2-9.3-15 0-1 .6-5.8 5.2-5.8m0-3c-5.3 0-7.9 4.3-8.2 8.5-.2 3.2.4 7.2 10.2 17.4a6.3 6.3 0 0 0 4.3 1.9 5.7 5.7 0 0 0 4.1-1.9c1.1-1 10.6-10.7 10.3-17.3-.2-4.6-4-8.6-8.4-8.6a7.6 7.6 0 0 0-6 2.7 8.1 8.1 0 0 0-6.2-2.7z">
                                            </path>
                                        </svg>
                                        <svg class="heart-full icon-svg icon-svg--size-4 icon-svg--color-blue"
                                            viewBox="0 0 19.2 18.5" aria-hidden="true" focusable="false">
                                            <path
                                                d="M9.66 18.48a4.23 4.23 0 0 1-2.89-1.22C.29 10.44-.12 7.79.02 5.67.21 2.87 1.95.03 5.42.01c1.61-.07 3.16.57 4.25 1.76A5.07 5.07 0 0 1 13.6 0c2.88 0 5.43 2.66 5.59 5.74.2 4.37-6.09 10.79-6.8 11.5-.71.77-1.7 1.21-2.74 1.23z">
                                            </path>
                                        </svg>
                                        <svg class="broken-heart" xmlns="http://www.w3.org/2000/svg" width="48"
                                            height="16" viewBox="5.707 17 48 16">
                                            <g fill="#dc3545">
                                                <path class="broken-heart--left"
                                                    d="M29.865 32.735V18.703a4.562 4.562 0 0 0-3.567-1.476c-2.916.017-4.378 2.403-4.538 4.756-.118 1.781.227 4.006 5.672 9.737a3.544 3.544 0 0 0 2.428 1.025l-.008-.008.013-.002z" />
                                                <path class="broken-heart--right"
                                                    d="M37.868 22.045c-.135-2.588-2.277-4.823-4.697-4.823a4.258 4.258 0 0 0-3.302 1.487l-.004-.003v14.035a3.215 3.215 0 0 0 2.289-1.033c.598-.596 5.882-5.99 5.714-9.663z" />
                                            </g>
                                            <path class="broken-heart--crack" fill="none" stroke="#FFF"
                                                stroke-miterlimit="10" d="M29.865 18.205v14.573" />
                                        </svg>
                                        <div class="effect-group">
                                            <span class="effect"></span>
                                            <span class="effect"></span>
                                            <span class="effect"></span>
                                            <span class="effect"></span>
                                            <span class="effect"></span>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-sm-12 new-wishlist-method">
                        <div class=" products" v-if="buyerUserData">

                            <button id="show-btn" class="button one inactive mobile button--secondary wishlist-btn mx-1"
                                @click="$bvModal.show('bv-standingOrders')" v-b-tooltip.hover
                                :title="$t('items.standingOrders')">
                                <!-- <span role="button" @click="loggedBidRequest"> -->
                                <!-- {{ $t("singleProduct.bidRequest") }} -->
                                <font-awesome-icon icon="fa-sharp fa-solid fa-bag-shopping" />
                            </button>
                        </div>
                        <div class=" products" v-else>

                            <button id="show-btn" class="button one inactive mobile button--secondary wishlist-btn mx-1"
                                @click="loginFirst()" v-b-tooltip.hover
                                :title="$t('items.standingOrders')">
                                <!-- <span role="button" @click="loggedBidRequest"> -->
                                <!-- {{ $t("singleProduct.bidRequest") }} -->
                                <font-awesome-icon icon="fa-sharp fa-solid fa-bag-shopping" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col-7" >
                <div class="share-social d-flex align-items-center">
                    <span>{{ $t("singleProduct.sharing") }}</span>
                    <!-- <div class="social-sharing-icons">
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-facebook-f" />
          </a>
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-whatsapp" />
          </a>
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-twitter" />
          </a>
        </div> -->
                    <div class="social-sharing-icons">
                        <facebook :url="url" scale="2"></facebook>
                        <twitter :url="url" title="Check me on Github" scale="2"></twitter>
                        <whats-app :url="url" title="Hello" scale="2"></whats-app>
                        <!-- <linkedin :url="url" scale="3"></linkedin> -->
                        <!-- <telegram :url="url" scale="3"></telegram> -->
                        <!-- <pinterest :url="url" scale="3"></pinterest>
          <reddit :url="url" scale="3" title="My Github"></reddit>
          <google :url="url" scale="3"></google>
          <email :url="url" subject="Hello" scale="3"></email> -->
                    </div>
                </div>
            </div>
        </div>

        <b-modal id="bv-bidRequest" hide-footer>
            <template #modal-title>
                {{ $t("singleProduct.bidRequest") }}
            </template>
            <form>
                <div class="form-group">
                    <label for="">{{ $t("singleProduct.nameInput") }}
                        <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" v-model="requestData.name" />
                    <div class="text-danger" v-for="(error, index) in errors.qoute_name" :key="index">
                        {{ error }}
                    </div>
                </div>
                <div class="form-group">
                    <label for="">{{ $t("singleProduct.min_order_quantity") }}
                        <span class="text-danger">*</span></label>
                    <input type="number" min="1" class="form-control" v-model="requestData.request_qty" />
                    <div class="text-danger" v-for="(error, index) in errors.request_qty" :key="index">
                        {{ error }}
                    </div>
                </div>
                <div class="form-group">
                    <label for="">{{ $t("singleProduct.reviewInput") }}
                        <span class="text-danger">*</span></label>
                    <textarea class="form-control" v-model="requestData.comment"></textarea>
                    <div class="text-danger" v-for="(error, index) in errors.comment" :key="index">
                        {{ error }}
                    </div>
                </div>
            </form>
            <b-button class="btn-lg btn-block" block @click="requestQuotation">{{
                    $t("cart.submit")
            }}</b-button>
        </b-modal>
        <b-modal id="bv-standingOrders" size="xl" hide-footer>
            <template #modal-title>
                {{ $t("items.standingOrders") }}
            </template>
            <standing-orders />
        </b-modal>
    </div>
</template>

<script>
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);
import suppliers from "@/services/suppliers";
// import { mapActions } from "vuex";
import { BIconPlus, BIconDash } from "bootstrap-vue";
// import modal from "@/components/cart/cartModal.vue";
import globalAxios from "@/services/global-axios";
// import CartModal from "@/components/cart/cartModal.vue"

import categories from "@/services/categories";
import profile from "@/services/profile";

import rfqIcon from "@/components/global/rfqIcon.vue"

import StandingOrders from "@/components/global/standingOrders.vue"

import {
    Facebook,
    Twitter,
    WhatsApp,
    // Linkedin,
    // Pinterest,
    // Reddit,
    // Telegram,
    // Email,
    // Google,
} from "vue-socialmedia-share";
export default {
    components: {
        BIconPlus,
        BIconDash,
        Facebook,
        Twitter,
        WhatsApp,
        rfqIcon,
        StandingOrders
        // Linkedin,
        // Pinterest,
        // Reddit,
        // Telegram,
        // Email,
        // Google,
        // modal,
    },
    props: ["myProduct"],
    methods: {
        // ...mapActions("cart", ["cart/addProductToCart"]),
        addToCart(myProduct) {
            let data = {
                product_supplier_id:
                    myProduct.product_details_by_type.product_supplier_id,
                quantity:
                    this.mySelectedOption !== null || this.mySelectedOption > 0
                        ? this.mySelectedOption
                        : 1,
            };
            // this.$store
            //   .dispatch("cart/addProductToCart", {
            //     product: item,
            //     quantity: this.cartCounter !== null ? this.cartCounter : 1,
            //   })
            //   .then((res) => {
            //     if (res.status == 200) {
            //       this.$modal.show(
            //         () => import("@/components/cart/cartModal.vue"),
            //         {
            //           product: item,
            //         },
            //         { width: "700", height: "auto", adaptive: true }
            //       );
            //     }
            //   });

            return globalAxios
                .post(`cart/add`, data)
                .then((res) => {
                    if (res.status == 200) {
                        this.sucessMsg(res.data.message);

                        this.$modal.show(
                            () => import("@/components/cart/cartModal.vue"),
                            {
                                product: myProduct,
                            },
                            { width: "700", height: "auto", adaptive: true }
                        );
                    }
                })
                .catch((error) => {
                    const err = Object.values(error)[2].data;
                    this.errors = err.items;
                    this.errMsg(err.message);
                })
                .finally(() => {
                    setTimeout(() => {
                        this.$store.dispatch("cart/getCartProducts");
                    }, 500);
                });
        },
        loginFirst() {
            Vue.swal({
                title: this.$t("singleProduct.loginFirst"),
                text: this.$t("singleProduct.registerNow"),
                icon: "warning",
                // buttons: ["Oh noez!", true],
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    this.$router.push("/user-register");
                }
            });
        },
        requestQuotation() {
            let payload = {
                qoute_name: this.requestData.name,
                product_supplier_id:
                    this.myProduct.product_details_by_type.product_supplier_id,
                request_qty: this.requestData.request_qty,
                comment: this.requestData.comment,
            };
            suppliers
                .requestQuotation(payload)
                .then((resp) => {
                    console.log(resp);
                    this.errors = {};
                    this.sucessMsg(resp.data.message);
                    setTimeout(() => {
                        document.querySelector(".close").click();
                        this.requestData = [];
                        this.$router.push({
                            path: "/profile/quotationDetails",
                            query: {
                                id: resp.data.items.client_quote_id,
                            },
                        });
                    }, 500);
                })
                .catch((error) => {
                    const err = Object.values(error)[2].data;
                    this.errors = err.items;
                    this.errMsg(err.message);
                });
        },
        loggedBidRequest() {
            this.sucessMsg("request sent");
        },
        selectedOption(option) {
            this.mySelectedOption = option;
        },
        incrementQuantity() {
            this.mySelectedOption += 1;
        },
        decrementQuantity(minimum) {
            if (minimum) {
                this.mySelectedOption > minimum ? this.mySelectedOption-- : null;
                console.log("no minimum");
                console.log("this.mySelectedOption", this.mySelectedOption);
            } else {
                this.mySelectedOption >= 1
                    ? this.mySelectedOption--
                    : this.mySelectedOption == 1;
                console.log("no minimum");
                console.log("this.mySelectedOption", this.mySelectedOption);
            }
        },
        closeModal() {
            this.showModal = false;
        },
        openModal() {
            this.showModal = true;
        },
        addToWishlist(item) {
            let data = {
                product_supplier_id: item.product_details_by_type.product_supplier_id,
            };
            // this.addProductToWishlist({
            //   product: this.product,
            // });

            return globalAxios
                .post(`members/profile/favorite`, data)
                .then((res) => {
                    if (res.status == 200) {
                        this.sucessMsg(res.data.message);

                        let wishlistBtn = document.querySelector('.wishlist-btn')
                        if (wishlistBtn.classList.contains("deactivate")) {
                            wishlistBtn.classList.remove("deactivate")
                        }
                        if (wishlistBtn.classList.contains("active")) {
                            wishlistBtn.classList.add("deactivate")
                        }
                        wishlistBtn.classList.toggle("animate");
                        wishlistBtn.classList.toggle("active");
                        wishlistBtn.classList.toggle("inactive");

                        this.productDetails();
                    }
                })
                .catch((error) => {
                    const err = Object.values(error)[2].data;
                    this.errors = err.items;
                    this.errMsg(err.message);
                })
                .finally(() => {
                    setTimeout(() => {
                        this.$store.dispatch("cart/getCartProducts");
                    }, 500);
                });
        },
        productDetails() {
            this.loading = true;
            categories
                .productDetails(this.id)
                .then((res) => {
                    // console.log("productDetails", res);
                    this.myProduct = res.data.items;
                })
                .catch((err) => {
                    if (err.response.data.code == 404) {
                        this.notFound = true;
                        this.loading = false;
                        this.myProduct = "";
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        sendSupplierMessage(supplierId) {
            let data = {
                supplier_id: supplierId,
                message: this.message,
                subject: this.subject,
            };
            profile
                .sendSupplierMessage(data)
                .then((res) => {
                    if (res.status == 200) {
                        this.sucessMsg(res.data.message);
                        document.querySelector(".close").click();
                        this.message = "";
                        this.subject = "";
                    }
                })
                .catch((error) => {
                    let err = Object.values(error)[2].data;
                    this.errors = err.items;
                    console.log(error);
                });
        },
        removeFromWishlist(myProduct) {
            // this.removeProductFromCart({
            //   product: product,
            // });
            this.$store.dispatch("wishlist/removeProductFromWishlist", {
                myItem: myProduct.id,
            });
            setTimeout(() => {

                let wishlistBtn = document.querySelector('.wishlist-btn')
                if (wishlistBtn.classList.contains("deactivate")) {
                    wishlistBtn.classList.remove("deactivate")
                }
                if (wishlistBtn.classList.contains("active")) {
                    wishlistBtn.classList.add("deactivate")
                }
                wishlistBtn.classList.toggle("animate");
                wishlistBtn.classList.toggle("active");
                wishlistBtn.classList.toggle("inactive");

                this.productDetails();
            }, 500);
        },
    },
    data() {
        return {
            requestData: {
                name: null,
                request_qty: null,
                comment: null,
            },
            id: this.$route.query.id,
            errors: {},
            mySelectedOption: this.myProduct.product_details_by_type
                .min_order_quantity
                ? this.myProduct.product_details_by_type.min_order_quantity
                : 1,
            changedValue: null,
            showModal: false,
            suppliers: null,
            message: null,
            subject: null,
            // url: this.mainDoamin
        };
    },
    computed: {
        url() {
            return this.mainDoamin + `details?id=${this.id}`;
        },
    },
};
</script>
<style lang="scss" scoped>
.product-info {
    .content {
        .category {
            color: #403a37;
            font-size: 11pt;
            margin-bottom: 0.3rem;
            display: block;
        }

        .name {
            color: #312620;
            font-weight: bold;
            font-size: 20pt;
            margin-bottom: 1rem;
        }

        .serial {
            font-size: 12pt;
            margin-bottom: 1rem;
            color: #403a37;
        }

        .price {
            font-size: 14pt;
            font-weight: bold;
            color: #312620;
            margin-bottom: 1rem;
        }

        .supplier {
            font-size: 12pt;
            color: #403a37;
            margin-bottom: 1.2rem;

            a {
                text-decoration: underline;
                color: #403a37;
                font-weight: bold;
            }
        }

        .weight {
            .title {
                font-size: 11pt;
                margin-bottom: 1.5rem;
                padding-inline-start: 2rem;
                font-weight: bold;
            }

            .available-weight {
                span {
                    width: 6rem;
                    height: 2rem;
                    border: 3px solid #ebebeb;
                    font-size: 11pt;
                    color: #544842;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 0.2rem;
                    // cursor: pointer;
                    transition: all ease-out 0.3s;
                    // &:hover {
                    //   background: #ff6000;
                    //   border-color: #ff6000;
                    //   color: #fff;
                    // }
                }

                span.active {
                    background: #ff6000;
                    border-color: #ff6000;
                    color: #fff;
                }
            }
        }

        .is-available {
            font-size: 11pt;
            margin-bottom: 1.3rem;
            //padding-inline-start: 35px;
            font-weight: bold;
        }

        .product-actions {
            .short-links {

                // margin-inline-end: 0.5rem;
                // min-width: 10rem;
                a {
                    display: block;
                    color: #676565;
                    font-size: 11pt;

                    &:hover {
                        color: #ed2124;
                    }

                    span {
                        margin-inline-start: 0.25rem;
                    }
                }
            }

            .add-cart {
                border-radius: 0;
                font-size: 16px;
                background: #36363b;
                color: #fff;
                padding: 12px 16px;
                height: fit-content;
                -webkit-margin-end: 0.5rem;
                margin-inline-end: 0;
                display: block;
                text-align: center;
                width: 100%;

                &:hover {
                    background: #ed2124;
                }
            }
        }

        .share-social {
            span {
                color: #403a37;
                margin-inline-end: 1rem;
            }

            .social-sharing-icons {
                a {
                    color: #898481;
                    padding: 0.5rem;
                    display: inline-block;
                    margin-inline-end: 0.25rem;

                    &:hover {
                        color: #ed2124;
                    }
                }
            }
        }
    }

    .sort {
        background: #f6f6f6;
        padding: 16px !important;
        font-size: 19px;
        display: inline-block;
        margin: 10px 10px 20px 0;
    }
}

textarea {
    resize: none;
}

.submitBtn {
    background: #f57b22;
    color: #fff;
    font-size: 20px;
    border: none;
    box-shadow: none;
    outline: none;
}

.cancelBtn {
    background: transparent;
    font-size: 20px;
    border: none;
    box-shadow: none;
    outline: none;
    margin: 0 20px;
    color: #312620;
}

.product-counter {
    display: flex;
    align-items: center;
    justify-content: left;

    .actions {
        color: #606266;

        .product-counter-btn {
            width: 2rem;
            height: 1.55rem;
            border-radius: 0;
            border: 1px solid transparent;
            color: #606266;
            background: #eef1f2;
            display: flex;
            justify-content: center;
            align-items: center;

            &:first-child {
                border-bottom: 1px solid #dcdcdc;
            }
        }
    }

    .value {
        border-radius: 0;
        border: 1px solid #f0f0f0;
        color: #544842;
        font-weight: 500;
        width: 6rem;
        height: 3.1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
    }
}

.cart-btn {
    background: #ff6000 !important;
}

.supplier-image {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    margin: 0 7px;
}

.social-sharing-icons {
    span {
        cursor: pointer;
    }
}

.products {
    // box-shadow: 0px 0px 9px 0px #cccccccf;
    // padding: 17px 17px;

    .header {
        color: #312620;
    }

    .add-to {
        color: #000;

        a {
            background: #fff;
            color: #312620;
            box-shadow: 0px 1px 5px 0px rgb(0 0 0 / 10%);
            padding: 1rem 1rem;
            border-radius: 0.2rem;
            margin: 0 0.3rem;

            &:hover {
                color: #ed2124;
            }

            span {
                margin-inline-end: 0.5rem;
            }
        }
    }
}

// @media screen and (max-width:1900px){
//   .product-counter .value{

//     font-weight: 500;
//     width: 4rem;

//   }
//   .add-cart{
//     padding: 12px 10px !important;
//   }
// }
.svg-icon {
    width: 30px;

    svg {
        fill: #fff;
        width: inherit;
    }
}

.new-wishlist-method {


    // VARIABLES
    // colours
    $red: #dc3545;
    $silver: #cccccc;
    // fireworks
    $fireworks--width: 3px;
    $fireworks--height: 3px;
    $fireworks--border: $fireworks--width/2;


    // button styles
    .button--secondary,
    .button--secondary:visited {
        border-radius: 3px;
        cursor: pointer;
        display: inline-block;
        min-width: 64px;
        font-family: inherit;
        font-size: inherit;
        line-height: 15px;
        outline: none;
        text-align: center;
        text-decoration: none;
        text-shadow: none;
        transition: background 0.1s linear;
        font-weight: 400;
        color: $red;
        background: #fff;
        border: 1px solid #ddd;
        box-shadow: none;
        padding: 15px 15px;
        transition-property: border;
        transition-timing-function: ease-in-out;
        transition-duration: 0.15s;
    }

    .button--full-width {
        min-width: 385px;
    }

    .icon-with-text {
        display: inline-flex;
        align-items: flex-start;
    }

    .icon-with-text__icon {
        flex-shrink: 0;
        margin-right: 8px;
        margin-top: -2px;
    }

    .icon-svg--color-silver {
        fill: $silver;
        color: $silver;
    }

    .icon-svg--color-blue {
        fill: $red;
        color: $red;
    }

    .icon-svg {
        display: inline-block;
        vertical-align: middle;
        height: 16px;
        width: 16px;
    }

    // position the active state heart
    .heart-full {
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }

    // firework effect styles
    .btn__effect {
        display: inline-block;
        position: relative;
    }

    .effect-group {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: rotate(25deg);

        .effect {
            display: block;
            position: absolute;
            top: 38%;
            left: 50%;
            width: 20px;
            transform-origin: 0px 2px;

            &:nth-child(2) {
                transform: rotate(72deg);
            }

            &:nth-child(3) {
                transform: rotate(72*2deg);
            }

            &:nth-child(4) {
                transform: rotate(72*3deg);
            }

            &:nth-child(5) {
                transform: rotate(72*4deg);
            }

            &:before {
                content: "";
                display: block;
                position: absolute;
                right: 0;
                border-radius: $fireworks--border;
                height: $fireworks--height;
                background: #dc3545;
            }

            &:after {
                content: "";
                display: block;
                position: absolute;
                top: 10px;
                right: 10%;
                border-radius: 50%;
                width: $fireworks--width;
                height: $fireworks--height;
                background: #ff6600;
                transform: scale(0, 0);
            }
        }
    }

    // TRIGGER ANIMATIONS
    // Generic
    .active {
        .heart-stroke {
            opacity: 0;
        }

        .heart-full {
            opacity: 1;
        }

        .icon-svg {
            animation: bounceIn 0.5s linear;
        }

        .effect:before {
            animation: fireworkLine 0.5s linear 0.1s;
        }

        .effect:after {
            animation: fireworkPoint 0.5s linear 0.1s;
        }
    }

    //cracking heart
    .broken-heart {
        position: absolute;
        left: -16px;
        top: 0;
        opacity: 0;

        &--left {
            transform: rotate(0deg);
            transform-origin: 60% 200%;
        }

        &--right {
            transform: rotate(0deg);
            transform-origin: 63% 200%;
        }

        &--crack {
            stroke-dasharray: 15;
            stroke-dashoffset: 15;
        }
    }

    .deactivate {
        .broken-heart {
            opacity: 1;
        }

        .broken-heart--left {
            animation:
                crackLeft 0.35s cubic-bezier(0.680, -0.550, 0.265, 2.850) 0.15s forwards,
                hide 0.25s ease-in 0.55s forwards;
        }

        .broken-heart--right {
            animation:
                crackRight 0.35s cubic-bezier(0.680, -0.550, 0.265, 2.850) 0.15s forwards,
                hide 0.25s ease-in 0.55s forwards;
        }

        .broken-heart--crack {
            animation:
                crack 0.2s ease-in forwards;
        }
    }

    // Variation One
    .button.one.desktop:not(.active):hover {
        .heart-stroke {
            animation: pulse 1s ease-out infinite;
        }
    }

    .button.one.inactive .heart-full {
        //animation: wiltT .5s ease-in forwards;
    }

    // Variation Two
    .button.two.desktop:not(.active):hover {
        .heart-stroke {
            animation: pulseBlue 1s ease-out infinite;
        }
    }

    // ANIMATIONS

    // subtle heart pulse on hover (grey)
    @keyframes pulse {
        0% {
            opacity: 1;
            transform-origin: center center;
            transform: scale(1);
        }

        50% {
            opacity: 0.6;
            transform: scale(1.15);
        }

        100% {
            opacity: 1;
            transform: scale(1);
        }
    }

    // subtle heart pulse on hover (grey to blue)
    @keyframes pulseBlue {
        0% {
            transform-origin: center center;
            transform: scale(1);
            fill: $silver;
        }

        50% {
            transform: scale(1.15);
            fill: $red;
        }

        100% {
            transform: scale(1);
            fill: $silver;
        }
    }

    // fireworks animations
    @keyframes fireworkLine {
        0% {
            right: 20%;
            transform: scale(0, 0);
        }

        25% {
            right: 20%;
            width: 6px;
            transform: scale(1, 1);
        }

        35% {
            right: 0;
            width: 35%;
        }

        70% {
            right: 0;
            width: 4px;
            transform: scale(1, 1);
        }

        100% {
            right: 0;
            transform: scale(0, 0);
        }
    }

    @keyframes fireworkPoint {
        30% {
            transform: scale(0, 0);
        }

        60% {
            transform: scale(1, 1);
        }

        100% {
            transform: scale(0, 0);
        }
    }

    @keyframes bounceIn {
        0% {
            transform: scale(0);
        }

        30% {
            transform: scale(1.25);
        }

        50% {
            transform: scale(0.9);
        }

        70% {
            transform: scale(1.1);
        }

        80% {
            transform: scale(1);
        }
    }

    // WIP deactivate state
    @keyframes crackLeft {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(-45deg);
        }
    }

    @keyframes crackRight {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(45deg);
        }
    }

    @keyframes crack {
        0% {
            stroke-dasharray: 15;
            stroke-dashoffset: 15;
        }

        80% {
            stroke-dasharray: 15;
            stroke-dashoffset: 0;
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    @keyframes hide {
        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
}
</style>
    