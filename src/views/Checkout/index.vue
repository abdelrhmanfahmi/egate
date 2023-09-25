<template>
  <div class="wrapper">
    <v-app>
      <v-container>
        <CheckoutStepper />
      </v-container>
    </v-app>
  </div>
</template>

<script>
import CheckoutStepper from "@/components/Checkout/CheckoutStepper.vue";
import { useMeta } from "vue-meta";
export default {
  components: {
    CheckoutStepper,
  },
  setup() {
    useMeta({
      title: "Checkout",
      htmlAttrs: { lang: "en", amp: true },
    });
  },
  mounted(){
    this.$nextTick(() => {
      document.dispatchEvent(new Event("render-complete"));
    });
  }
};
</script>

<style>
</style>