<template>
  <div>
    <div class="page-wapper">
      <div class="page-title">
        <h2 class="profile-title">My Wish List</h2>
      </div>
      <div class="products" v-if="wishlistItemCount > 0">
        <v-row>
          <v-col
            cols="12"
            lg="4"
            md="4"
            sm="12"
            v-for="(product, index) in wishlistData"
            :key="index"
          >
            <WishlistProductCard :product="product" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="4" md="4" sm="12">
            <button class="buy-btn">Add All To Cart</button>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <button class="view-btn" @click.prevent="updateWishlist">
              UPDATE WISH LIST
            </button>
          </v-col>
          <v-col cols="12" lg="4" md="4" sm="12">
            <button class="view-btn">SHARE WISH LIST</button>
          </v-col>
        </v-row>
      </div>
      <section
        class="products d-flex aligned-row justify-center flex-column"
        v-else
      >
        <EmptyWishlist />
      </section>
    </div>
  </div>
</template>

<script>
import WishlistProductCard from "@/components/shared/Products/WishlistProductCard.vue";
import { mapGetters } from "vuex";
import EmptyWishlist from "@/components/shared/Checkout/EmptyWishlist.vue";
import { useMeta } from "vue-meta";
export default {
  components: {
    WishlistProductCard,
  },
  computed: {
    ...mapGetters({ wishlistData: "wishlist/wishlistData" }),
    ...mapGetters({ wishlistItemCount: "wishlist/wishlistItemCount" }),
  },
  methods: {
    updateWishlist() {
      this.$store.dispatch("changeLoadingScreen", true);
      this.$store.dispatch("wishlist/getWishlistItems").then(() => {
        setTimeout(() => {
          this.$store.dispatch("changeLoadingScreen", false);
        }, 1200);
      });
    },
  },
  components: {
    EmptyWishlist,
  },
  setup() {
    useMeta({
      title: "Profile Wishlists",
      htmlAttrs: { lang: "en", amp: true },
    });
  },
};
</script>

<style></style>
