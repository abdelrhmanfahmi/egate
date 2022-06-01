<template>
  <div class="subCategory">
    <div class="data-holder py-5">
      <div class="container">
        <div class="intro text-center">
          <h1 v-if="supplier">
            <!-- {{ supplier.company_name }} {{ $t("supplier.OurShop") }} -->
            {{ supplier.company_name }} {{ $t("supplier.Shop") }}
          </h1>
          <!-- <b-breadcrumb :items="items"></b-breadcrumb> -->
          <!-- <b-breadcrumb v-if="supplier">
            <b-breadcrumb-item href="#home">
              <router-link to="/">
                {{ $t("supplier.home") }}
              </router-link>
            </b-breadcrumb-item>
            <b-breadcrumb-item>
              {{ $t("supplier.suppliers") }}
            </b-breadcrumb-item>
            <b-breadcrumb-item active>
              {{ supplier.company_name }}
            </b-breadcrumb-item>
          </b-breadcrumb> -->
        </div>
        <div class="" v-if="supplierProductsLength">
          <div class="row justify-content-around align-items-center">
            <div class="col-md-6 col-sm-12 mb-3 d-flex">
              <h6 class="font-weight-bold mx-3">
                <b-icon-grid></b-icon-grid>
              </h6>
              <p>
                {{ $t("supplier.Showing") }}
                <b class="ml-3">{{ supplierProductsLength }}</b>
                {{ $t("supplier.of") }}
                <b class="text-danger ml-3 mr-2">{{
                  supplierProductsLength
                }}</b>
              </p>
            </div>
            <div class="col-md-6 col-sm-12 mb-3 d-flex justify-content-end">
              <!-- <select name="" id="" labeel="select">
                <option value="AccessoriesA">AccessoriesA</option>
                <option value="Laptop">Laptop</option>
                <option value="Stationary">Stationary</option>
              </select> -->

              <!-- <div class="search-icon">
                <b-button v-b-modal.modal-2 class="icon-search" size="md">
                  <font-awesome-icon
                    v-b-toggle.sidebar-1
                    icon="fa-solid fa-search"
                  />
                </b-button>
                <b-modal id="modal-2" class="search">
                  Using slots
                  <b-input-group class="mt-3">
                    <template #append>
                      <b-input-group-text>
                        <strong>
                          <font-awesome-icon
                            v-b-toggle.sidebar-1
                            icon="fa-solid fa-search" /></strong
                      ></b-input-group-text>
                    </template>
                    <b-form @submit.prevent="search">
                      <b-form-input
                        placeholder="Search"
                        v-model="searchWord"
                      ></b-form-input>
                    </b-form>
                  </b-input-group>
                </b-modal>
              </div> -->
            </div>
          </div>
          <div class="data">
            <div class="row">
              <div
                class="col-12 col-sm-6 col-lg-3 text-center"
                v-for="item in supplierProducts"
                :key="item.id"
              >
                <Product :data="item"></Product>
              </div>
            </div>
          </div>
        </div>
        <div class="" v-else>
          <div class="d-flex justify-content-center align-items-center p-5">
            <h3>
              {{ $t("cart.noDataMatch") }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconGrid } from "bootstrap-vue";
import Product from "@/components/pages/supplier/products/Product";
import suppliers from "@/services/suppliers";
import { baseURL } from "@/apis/Api";
import axios from "axios";
export default {
  data() {
    return {
      client_id: this.$route.query.supId,
      categoryId: this.$route.query.catId,
      queryWord: this.$route.query.queryWord,
      country_id: this.$route.query.country_id,
      unit_id: this.$route.query.unit_id,
      supplier: null,
      supplierProducts: null,
      supplierProductsLength: null,
      items: [
        {
          text: this.$t("supplier.home"),
          href: "/humhum-user",
        },
        {
          text: this.$t("supplier.company"),
          active: true,
        },
      ],
      loading: true,
      subCategories: null,
      searchWord: null,
    };
  },
  computed: {
    filterProductsByCategory: function () {
      return this.products.filter(
        (product) => !product.category.iOf(this.category)
      );
    },
  },
  methods: {
    getSupplier() {
      this.loading = true;

      suppliers
        .getSupplier(this.client_id)
        .then((resp) => {
          console.log("getSupplier", resp);
          this.supplier = resp.data.items;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getSupplierProducts() {
      // suppliers
      //   .getSupplierProducts(this.categoryId)
      //   .then((resp) => {
      //     console.log("getSupplierProducts", resp);
      //     this.supplierProducts = resp.data.items.data;
      //     resp.data.items.data.length > 0
      //       ? (this.supplierProductsLength = resp.data.items.data.length)
      //       : (this.supplierProductsLength = 0);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      axios
        .get(`${baseURL}products`, {
          params: {
            category_id: this.categoryId ? this.categoryId : "",
            client_id: this.client_id ? this.client_id : "",
            keyword: this.queryWord ? this.queryWord : this.searchWord,
            country_id: this.country_id ? this.country_id : "",
            unit_id: this.unit_id ? this.unit_id : "",
          },
        })
        .then((resp) => {
          this.supplierProducts = resp.data.items.data;
          this.supplierProductsLength =
            resp.data.items.data !== null ? resp.data.items.data.length : 0;
          console.log(resp);
          if (resp.status == 200) {
            document.querySelector("input").value = "";
            document.getElementById("modal-2").click();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    search() {
      this.getSupplierProducts();
    },
  },
  // created() {
  //   this.getSupplier();
  // },
  mounted() {
    this.getSupplierProducts();
    this.getSupplier();
  },
  components: {
    BIconGrid,
    Product,
  },
};
</script>

<style lang="scss" scoped>
.cover-data {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
select {
  border: none;
  outline: none;
  box-shadow: none;
}
form {
  .xt-blog-form {
    margin-top: 50px;
  }
  .input-group-btn {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #ccc;
    }
  }
}
input {
  &:hover,
  &:focus {
    box-shadow: none;
  }
}
.intro {
  margin: 10% 0;
}
.search-icon {
  .modal-header {
    display: none;
  }
  .icon-search {
    color: #212529;
    background-color: transparent;
    border-color: transparent;
    &:focus {
      box-shadow: 0 0 0 0;
    }
  }
}
</style>
