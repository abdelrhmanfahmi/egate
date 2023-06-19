<template>
  <div class="wrapper">
    <v-app >
        <v-container>
            <CheckoutStepper />
        </v-container>
    </v-app>
  </div>
</template>

<script>
import CheckoutStepper from "@/components/Checkout/CheckoutStepper.vue"
export default {
    components:{
        CheckoutStepper
    }
}
</script>

<style>

</style>