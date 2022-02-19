import Vue from "vue";
Vue.mixin({
  computed: {
    getDir() {
      return document.documentElement.dir;
    },
  },
});
