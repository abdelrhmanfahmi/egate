import Vue from "vue";
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
      return process.env.VUE_APP_DOMAIN_NAME
    },
    massgeOfVerify() {
      return localStorage.getItem("massege")
    },
    userInfo() {
      return this.$store.getters.userInfo
    }

  },
  methods: {
    logout() {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("provider");
      localStorage.removeItem("massege");
      this.$router.push("/");
      location.reload();
    },
  }
});
