import Vue from "vue";
import auth from "@/services/auth";
Vue.mixin({
  computed: {
    getDir() {
      return document.documentElement.dir;
    },
    isLoggined() {
      if (localStorage.getItem("userInfo")) {
        return true;
      } else {
        return false;
      }
    },
    mainDoamin() {
      return process.env.VUE_APP_DOMAIN_NAME;
    },
    mainAppApiLink() {
      return process.env.VUE_APP_AXSIOS_LINK;
    },
    supplierDomain() {
      return process.env.VUE_APP_SUPPLIER;
    },
    massgeOfVerify() {
      return localStorage.getItem("massege");
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
    buyerUserData() {
      return this.$store.getters.buyerUserData;
    },
    currency() {
      return localStorage.getItem("currency");
    },
    socialLogin() {
      return localStorage.getItem("provider");
    },
    userCountries() {
      return localStorage.getItem("countries");
    },
    selectedCountry() {
      return localStorage.getItem("country");
    },
    countryByIP() {
      return localStorage.getItem("countryByIP");
    },
    currentLang() {
      return localStorage.getItem("lang");
    },
    cartAvailable() {
      return localStorage.getItem("cartAvailable");
    },
    RfqAvailable() {
      return localStorage.getItem("RfqAvailable");
    },
    storedSiteLogo(){
      return localStorage.getItem('siteLogo')
    },
    storedAdminLogo(){
      return localStorage.getItem('adminLogo')
    },
    logoEnv(){
      return this.storedSiteLogo.length !== 0 ? process.env.VUE_APP_FOR_IMAGES + 'storage/site_settings_image/' + this.storedSiteLogo : null
    },
    adminLogo(){
      return this.storedAdminLogo ? process.env.VUE_APP_FOR_IMAGES + 'storage/site_settings_image/' + this.storedAdminLogo : null
    },
    chatImageBaseUrl(){
      return this.storedAdminLogo ? process.env.VUE_APP_FOR_IMAGES + 'storage/client_supplier_chat/'  : null
    },
    ReturnImageBaseUrl(){
      return process.env.VUE_APP_FOR_IMAGES ? process.env.VUE_APP_FOR_IMAGES + 'storage/return-reason/'  : null
    },
    arabicAvailable(){
      return localStorage.getItem('arabic')
    },

    // site  api controls

    add_to_cart() {
      return localStorage.getItem("add_to_cart") === 'available' ? true : null;
    },
    RFQ() {
      return localStorage.getItem("RFQ") === 'available' ? true : null;
    },
    supplier_messages() {
      return localStorage.getItem("supplier_messages") === 'available' ? true : null;
    },
    b2b_buyer_registration() {
      return localStorage.getItem("b2b_buyer_registration") === 'available' ? true : null;
    },
    social_login_facebook() {
      return localStorage.getItem("social_login_facebook") === 'available' ? true : null;
    },
    standing_order() {
      return localStorage.getItem("standing_order") === 'available' ? true : null;
    },
    product_table_ads() {
      return localStorage.getItem("product_table_ads") === 'available' ? true : null;
    },
    favourite() {
      return localStorage.getItem("favourite") === 'available' ? true : null;
    },
    bank_transfer_payment() {
      return localStorage.getItem("bank_transfer_payment") === 'available' ? true : null;
    },
    wallet_payment() {
      return localStorage.getItem("wallet_payment") === 'available' ? true : null;
    },
    banner_ads() {
      return localStorage.getItem("banner_ads") === 'available' ? true : null;
    },
    main_banner() {
      return localStorage.getItem("main_banner") === 'available' ? true : null;
    },
    social_login_apple() {
      return localStorage.getItem("social_login_apple") === 'available' ? true : null;
    },
    online_payment() {
      return localStorage.getItem("online_payment") === 'available' ? true : null;
    },
    guest_checkout() {
      return localStorage.getItem("guest_checkout") === 'available' ? true : null;
    },
    cash_on_delivery_payment() {
      return localStorage.getItem("cash_on_delivery_payment") === 'available' ? true : null;
    },
    supplier_registration() {
      return localStorage.getItem("supplier_registration") === 'available' ? true : null;
    },
    social_login_microsoft() {
      return localStorage.getItem("social_login_microsoft") === 'available' ? true : null;
    },
    wallet_withdrawl() {
      return localStorage.getItem("wallet_withdrawl") === 'available' ? true : null;
    },
    social_login_google() {
      return localStorage.getItem("social_login_google") === 'available' ? true : null;
    },

  },
  methods: {
    logout() {
      auth.logout();
      localStorage.removeItem("userInfo");
      localStorage.removeItem("buyerUserData");
      localStorage.removeItem("provider");
      localStorage.removeItem("massege");
      localStorage.removeItem("add_to_cart");
      localStorage.removeItem("RFQ");
      this.$router.replace("/");
      setTimeout(() => {
        location.reload();
      }, 150);
    },
    sucessMsg(text, icon = "success") {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        icon: icon,
        title: text,
      });
    },
    errMsg(text, icon = "error") {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        icon: icon,
        title: text,
      });
    },
  },
});
