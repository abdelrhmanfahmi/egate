<template>
  <div>
    <div class="wrapper">
      <v-app >
        <v-container>
          <div class="" v-if="cartItemCount">

            <CartTable />
            <hr />
            <div class="totalPrice my-3 text-center">
              <v-row justify="space-between" align="center">
                <v-col cols="6">
                  <p>SUBTOTAL</p>
                </v-col>
                <v-col cols="6">
                  <p class="product-price">{{ cart_sub_total }} {{ currency }}</p>
                </v-col>
              </v-row>
            </div>
            <div class="actions text-center">
              <v-row justify="space-between" align="center">
                <v-col cols="12" md="6" sm="12">
                  <v-btn to="/" class="outline-main">CONTINUE SHOPPING</v-btn>
                </v-col>
                <v-col cols="12" md="6" sm="12" class="text-black">
                  <v-btn to="/checkout" class="bg-main">Proceed To Shipping Address <v-icon class="text-black"
                      icon="mdi-chevron-right"></v-icon></v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
          <section class="products d-flex aligned-row justify-center flex-column " v-else>
            <EmptyCart />
          </section>
        </v-container>
      </v-app>
    </div>
  </div>
</template>

<script>
import CartTable from "@/components/Cart/CartTable.vue";
import { mapGetters } from "vuex";
import mixins from "@/mixins";
import EmptyCart from "@/components/shared/Checkout/EmptyCart.vue"
export default {
  mixins: [mixins],
  components: {
    CartTable,
    EmptyCart
  },
  computed: {
    ...mapGetters({ cartItems: "cart/cartItems" }),
    ...mapGetters({ cart_sub_total: "cart/cart_sub_total" }),
    ...mapGetters({ cartItemCount: "cart/cartItemCount" }),
  },
};
</script>

<style scoped lang="scss"> .outline-main {
   min-width: 50% !important;
 }

 .v-img__img,
 .v-img__picture,
 .v-img__gradient,
 .v-img__placeholder,
 .v-img__error {
   position: relative !important;
   min-height: 150px !important;
 }

 .text-black,
 .text-dark {
   color: #000 !important;
 }

 .products {
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 50vh;
 }
</style>
