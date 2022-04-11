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
        <!-- <div class="overflow-auto">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            first-text="First"
            prev-text="Prev"
            next-text="Next"
            last-text="Last"
            pills 
          ></b-pagination>

          <p class="mt-3">Current Page: {{ currentPage }}</p>

          <b-table
            id="my-table"
            :items="suppliers"
            :per-page="perPage"
            :current-page="currentPage"
          ></b-table>
          
        </div> -->
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
      perPage:3,
      currentPage: 1,
      my_items: [
        { id: 1, first_name: "Fred", last_name: "Flintstone" },
        { id: 2, first_name: "Wilma", last_name: "Flintstone" },
        { id: 3, first_name: "Barney", last_name: "Rubble" },
        { id: 4, first_name: "Betty", last_name: "Rubble" },
        { id: 5, first_name: "Pebbles", last_name: "Flintstone" },
        { id: 6, first_name: "Bamm Bamm", last_name: "Rubble" },
        { id: 7, first_name: "The Great", last_name: "Gazzoo" },
        { id: 8, first_name: "Rockhead", last_name: "Slate" },
        { id: 9, first_name: "Pearl", last_name: "Slaghoople" },
      ],
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
  computed: {
    rows() {
      return this.my_items.length;
    },
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
