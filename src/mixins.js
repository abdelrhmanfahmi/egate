import Vue from "vue";
Vue.mixin({

  computed: {
    getDir() {
      return document.documentElement.dir;
    },
    isLoggined() {
      if (localStorage.getItem("token")) {
        return true;
      } else {
        return false;
      }
    },
    mainDoamin() {
      return process.env.VUE_APP_DOMAIN_NAME
    },
    massgeOfVerify() {
      return localStorage.getItem("massege")
    }
      
  },
});
