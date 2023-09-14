<template>
  <v-app  :class="$i18n.locale">
    <v-main>
      <MainLayout />
    </v-main>
  </v-app>
</template>

<script>
import MainLayout from "@/layouts/MainLayout";
import myMixin from "@/mixins.js";
export default {
  mixins: [myMixin],
  components: {
    MainLayout,
  },
  name: "App",

  data: () => ({
    page: 1,
  }),
  methods: {
    async getCategories() {
      await this.$store.dispatch("getCategories");
    },
    async getCartItems() {
      await this.$store.dispatch("cart/getCartProducts");
    },
    async getWishlistItems() {
      await this.$store.dispatch("wishlist/getWishlistItems");
    },
  },
  mounted() {
    this.getCategories();
    console.log('isLoggedIn' , this.isLoggedIn);
    if(this.isLoggedIn == true){

      this.getCartItems();
      this.getWishlistItems();
    }
  },
  computed: {
    isLoggedIn: function () { return this.$store.getters.isAuthenticated }
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
