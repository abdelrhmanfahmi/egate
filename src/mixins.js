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
    massgeOfVerify() {
      return localStorage.getItem("massege");
    },
    userInfo() {
      return this.$store.getters.userInfo;
    },
    buyerUserData() {
      return this.$store.getters.buyerUserData;
    },
    currency(){
      return localStorage.getItem('currency')
    }
  },
  methods: {
    logout() {
      auth.logout();
      localStorage.removeItem("userInfo");
      localStorage.removeItem("buyerUserData");
      localStorage.removeItem("provider");
      localStorage.removeItem("massege");
      this.$router.push("/");
      location.reload();
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
