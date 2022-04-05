<template>
  <div class="subCategory">
    <div class="data-holder py-5">
      <div class="container">
        <div class="intro text-center">
          <h1>
            {{ $t("Our Shop") }}
          </h1>
          <b-breadcrumb :items="items"></b-breadcrumb>
        </div>
        <div class="row justify-content-around align-items-center">
          <div class="col-md-6 col-sm-12 mb-3 d-flex">
            <h6 class="font-weight-bold mr-3">
              <b-icon-grid></b-icon-grid>
              filter
            </h6>
            <p>Showing <b class="ml-3">{{supplierProductsLength}}</b> of <b class="text-danger ml-3 mr-2">{{supplierProductsLength}}</b> results</p>
          </div>
          <div class="col-md-6 col-sm-12 mb-3 d-flex justify-content-end">
            <select name="" id="" labeel="select">
              <option value="AccessoriesA">AccessoriesA</option>
              <option value="Laptop">Laptop</option>
              <option value="Stationary">Stationary</option>
            </select>

            <div class="input-group-btn">
              <button class="btn btn-default" type="submit">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
              </button>
            </div>
          </div>
        </div>
        <div class="data">
          <div class="row">
            <div
              class="col-12 col-sm-6 col-lg-3"
              v-for="item in supplierProducts"
              :key="item.id"
            >
              <Product :data="item"></Product>
            </div>
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
          },
        })
        .then((resp) => {
          this.supplierProducts = resp.data.items.data;
          this.supplierProductsLength =
            resp.data.items.data !== null ? resp.data.items.data.length : 0;
          console.log(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  // created() {
  //   this.getSupplier();
  // },
  mounted() {
    this.getSupplierProducts();
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
</style>
