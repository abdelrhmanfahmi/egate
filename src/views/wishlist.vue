<template>
  <div class="cart-page">
    <div class="container">
      <Wishlist></Wishlist>
    </div>
  </div>
</template>
<script>
import Wishlist from "../components/pages/wishlist/Wishlist.vue";
export default {
  components: {
    Wishlist,
  },
  data() {
    return { count: 0 };
  },
};
</script>
<style lang="scss" scoped>
.cart-page {
  padding: 2rem;
}
</style>
