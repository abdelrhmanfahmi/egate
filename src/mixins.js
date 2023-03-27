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

    storedSiteLogo() {
      return localStorage.getItem("siteLogo");
    },
    storedAdminLogo() {
      return localStorage.getItem("adminLogo");
    },
    logoEnv() {
      return this.storedSiteLogo
        ? process.env.VUE_APP_FOR_IMAGES +
            "storage/site_settings_image/" +
            this.storedSiteLogo
        : null;
    },
    adminLogo() {
      return this.storedAdminLogo
        ? process.env.VUE_APP_FOR_IMAGES +
            "storage/site_settings_image/" +
            this.storedAdminLogo
        : null;
    },
    arabicAvailable() {
      return localStorage.getItem("arabic");
    },

    // site  api controls

    cartAvailable() {
      return localStorage.getItem("cartAvailable");
    },
    RfqAvailable() {
      return localStorage.getItem("RfqAvailable");
    },
    supplier_messages() {
      return localStorage.getItem("supplier_messages");
    },
    b2b_buyer_registration() {
      return localStorage.getItem("b2b_buyer_registration");
    },
    social_login_facebook() {
      return localStorage.getItem("social_login_facebook");
    },
    standing_order() {
      return localStorage.getItem("standing_order");
    },
    product_table_ads() {
      return localStorage.getItem("product_table_ads");
    },
    favourite() {
      return localStorage.getItem("favourite");
    },
    bank_transfer_payment() {
      return localStorage.getItem("bank_transfer_payment");
    },
    wallet_payment() {
      return localStorage.getItem("wallet_payment");
    },
    banner_ads() {
      return localStorage.getItem("banner_ads");
    },
    social_login_apple() {
      return localStorage.getItem("social_login_apple");
    },
    online_payment() {
      return localStorage.getItem("online_payment");
    },
    guest_checkout() {
      return localStorage.getItem("guest_checkout");
    },
    cash_on_delivery_payment() {
      return localStorage.getItem("cash_on_delivery_payment");
    },
    supplier_registration() {
      return localStorage.getItem("supplier_registration");
    },
    social_login_microsoft() {
      return localStorage.getItem("social_login_microsoft");
    },
    wallet_withdrawl() {
      return localStorage.getItem("wallet_withdrawl");
    },
    social_login_google() {
      return localStorage.getItem("social_login_google");
    },
  },
  methods: {
    logout() {
      auth.logout();
      localStorage.removeItem("userInfo");
      localStorage.removeItem("buyerUserData");
      localStorage.removeItem("provider");
      localStorage.removeItem("massege");
      localStorage.removeItem("cartAvailable");
      localStorage.removeItem("RfqAvailable");
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
