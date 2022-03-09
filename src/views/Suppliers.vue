<template>
  <div class="suppliers-body">
    <div
      class="navigation d-none d-lg-flex justify-content-center align-items-center w-75 mx-auto my-4"
    >
      <b-breadcrumb :items="items"></b-breadcrumb>
    </div>

    <div class="suppliers py-4">
      <div class="container">
        <div class="row suppliers-data">
          <div
            class="col-12 col-sm-6 col-md-4 col-lg-3 supplier-content"
            v-for="(item, key) in 10"
            :key="key"
          >
            <SingleSupplier></SingleSupplier>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SingleSupplier from "../components/pages/suppliers/SingleSupplier.vue";
export default {
  components: {
    SingleSupplier,
  },
  data() {
    return {
      items: [
        {
          text: this.$t("supplier.home"),
          href: "#",
        },
        {
          text: this.$t("supplier.suppliers"),
          href: "#",
        },
        {
          text: this.$t("supplier.company"),
          active: true,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.suppliers {
  background-color: #f9f8f5;
  .suppliers-data {
    color: #000;
    .supplier-content {
      padding: 0.6rem;
    }
  }
}
</style>
