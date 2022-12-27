<template>
  <!-- partners page  -->
  <div class="partners-page">
    <div class="tabs-holder">
        <b-tabs content-class="mt-3">
          <b-tab :title="$t('supplier.suppliers')" active>
            <!-- suppliers page included like component  -->
            <Suppliers />
          </b-tab>
          <b-tab :title="$t('home.clients')">
            <!-- clients page  included like component -->
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
