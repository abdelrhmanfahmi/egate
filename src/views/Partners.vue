<template>
  <div class="partners-page">
    <div class="tabs-holder">
        <b-tabs content-class="mt-3">
          <b-tab :title="$t('singleProduct.specsTitle')" active>
            <Suppliers />
          </b-tab>
          <b-tab :title="$t('home.clients')">
            <!-- <b-tab :title="$t('singleProduct.ratingTitle')"> -->
            <Clients />
          </b-tab>
        </b-tabs>
      </div>
  </div>
</template>

<script>
import Suppliers from "./Suppliers.vue";
import Clients from "./Clients.vue"
export default {
    components:{
        Suppliers,
        Clients
    }
};
</script>

<style lang="scss" scoped>

</style>
