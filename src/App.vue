<template>
  <v-app :class="$i18n.locale" class="app-holder">
    <v-main>
      <MainLayout />
    </v-main>
    <LoadingDataFetch v-if="loadingPageData == true" />
  </v-app>
</template>

<script>
import LoadingDataFetch from "@/components/shared/LoadingDataFetch.vue";
import MainLayout from "@/layouts/MainLayout";
// import myMixin from "@/mixins.js";
import { useMeta } from "vue-meta";
export default {
  // mixins: [myMixin],
  components: {
    MainLayout,
    LoadingDataFetch,
  },
  name: "App",

  data: () => ({
    page: 1,
  }),
  methods: {
    async getCategories() {
      await this.$store.dispatch("Categories/getCategories");
    },
    async getCartItems() {
      await this.$store.dispatch("cart/getCartProducts");
    },
    async getWishlistItems() {
      await this.$store.dispatch("wishlist/getWishlistItems");
    },
  },
  mounted() {

    // get categories at first load of any page
    this.getCategories();
    // if(this.isLoggedIn == true){
    //   this.getCartItems();
    //   this.getWishlistItems();
    // }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters['Auth/isAuthenticated'];
    },
    loadingPageData() {
      return this.$store.getters['Auth/LoginNow'];
    },
  },
  setup() {
    useMeta({
      title: "Main E-Gate Page",
      htmlAttrs: { lang: "en", amp: true },
    });
  },
};
</script>
<style lang="scss">
/* width */
::-webkit-scrollbar {
  width: 5px;
}

body{
  background: #F0F2F5 0% 0% no-repeat padding-box !important;
}

::-moz-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: transparent;
  border-radius: 10px;
}

::-moz-scrollbar-track {
  box-shadow: transparent;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #262626;
  border-radius: 10px;
}

::-moz-scrollbar-thumb {
  background: #262626;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: $main-color;
}

::-moz-scrollbar-thumb:hover {
  background: $main-color;
}
</style>
