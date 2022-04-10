<template>
  <div class="suppliers-body">
    <div
      class="navigation d-none d-lg-flex justify-content-center align-items-center w-75 mx-auto my-4"
    >
      <b-breadcrumb :items="items"></b-breadcrumb>
    </div>

    <div class="suppliers py-4">
      <div class="container">
        <b-row v-if="loading">
          <b-col class="mb-2" lg="3" sm="6" v-for="x in 10" :key="x">
            <b-skeleton-img></b-skeleton-img>
            <b-card>
              <b-skeleton
                animation="fade"
                width="60%"
                class="border-none"
              ></b-skeleton>
              <b-skeleton
                animation="fade"
                width="85%"
                class="border-none"
              ></b-skeleton>
            </b-card>
          </b-col>
        </b-row>
        <div class="row suppliers-data" v-else>
          <div
            class="col-12 col-sm-6 col-md-4 col-lg-3 supplier-content"
            v-for="supplier in suppliers"
            :key="supplier.id"
          >
            <SingleSupplier :supplier="supplier"></SingleSupplier>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SingleSupplier from "../components/pages/suppliers/SingleSupplier.vue";
import suppliers from "@/services/suppliers";
export default {
  components: {
    SingleSupplier,
  },
  data() {
    return {
      items: [
        {
          text: this.$t("supplier.home"),
          href: "/humhum-user",
        },
        {
          text: this.$t("supplier.suppliers"),
          href: "#",
          active: true,
        },
        // {
        //   text: this.$t("supplier.company"),
        // },
      ],
      suppliers: null,
      loading: false,
    };
  },
  methods: {
    getSuppliers() {
      this.loading = true;
      suppliers
        .getSuppliers()
        .then((resp) => {
          console.log(resp);
          this.suppliers = resp.data.items.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.getSuppliers();
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
