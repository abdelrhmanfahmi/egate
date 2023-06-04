<template>
    <!-- suppliers page  -->
    <div class="suppliers-body">
  
      <div class="suppliers py-4">
        <div class="container">
          <b-row v-if="loading">
            <b-col class="mb-2" lg="2" sm="6" v-for="x in 10" :key="x">
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
          <div class="row suppliers-data justify-content-center" v-else>
            <div
              class="col-12 col-sm-6 col-md-4 col-lg-2 mx-2 supplier-content"
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
  // suppliers page
  import SingleSupplier from "@/components/pages/suppliers/SingleSupplier.vue";
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
        ],
        suppliers: null,
        loading: false,
        perPage: 5,
        total: 0,
        currentPage: 1,
  
        page: 1,
        totalPages: 0,
        totalRecords: 0,
        recordsPerPage: 10,
        enterpageno: "",
      };
    },
    methods: {
      /**
       * @vuese
       * this function used get Suppliers
       */
      getSuppliers() {
        this.loading = true;
        suppliers
          .getSuppliers(this.page)
          .then((resp) => {
            console.log(resp);
            this.suppliers = resp.data.items.data.slice(0 , 20);
            this.total = resp.data.items.total;
            this.totalPages = Math.ceil(
              resp.data.items.total / resp.data.items.per_page
            ); // Calculate total records
  
            this.totalRecords = resp.data.items.total;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.loading = false;
          });
      },
      /**
       * @vuese
       * this function used for pagination
       */
      onPageChange(page) {
        this.page = page;
        this.getSuppliers();
      },
  
      /**
       * @vuese
       * this function used for pagination
       */
      onChangeRecordsPerPage() {
        this.getSuppliers();
      },
  
      /**
       * @vuese
       * this function used for pagination
       */
      gotoPage() {
        if (!isNaN(parseInt(this.enterpageno))) {
          this.page = parseInt(this.enterpageno);
          this.getSuppliers();
        }
      },
    },
    mounted() {
      this.getSuppliers();
    },
    computed: {
      rows() {
        return this.suppliers.length;
      },
    },
  };
  </script>
  <style lang="scss" scoped>
  .suppliers {
    .suppliers-data {
      color: #000;
      .supplier-content {
        padding: 0.6rem;
      }
    }
  }
  </style>
  