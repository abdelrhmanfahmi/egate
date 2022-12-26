<template>
  <!-- wishlist page (favorite ) -->
  <div class="cart-page">
    <div class="container">
      <!-- import wishlist (favorite ) component  -->
      <Wishlist></Wishlist>
    </div>
  </div>
</template>
<script>
import Wishlist from "@/components/pages/wishlist/Wishlist.vue";
export default {
  components: {
    Wishlist,
  },
};
</script>
<style lang="scss" scoped>
.cart-page {
  padding: 2rem;
}
</style>
