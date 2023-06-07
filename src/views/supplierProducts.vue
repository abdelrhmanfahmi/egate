<template>
  <!-- supplier products page  -->
  <div class="subCategory">
    <div class="data-holder py-5">
      <div class="container">
        <div
          class="intro text-center d-flex justify-content-center align-content-center"
        >
          <div class="supplier-img" v-if="supplier && supplier.image_path">
            <img :src="supplier.image_path" alt="" class="supplier-image"  />
          </div>
          <h2 v-if="supplier" class="mx-3">
            <span class="d-block">{{ $t("supplier.Shop") }}</span>
            <span>
              {{ supplier.company_name }}
            </span>
          </h2>
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
            <div
              class="col-md-6 col-sm-12 mb-3 d-flex justify-content-end"
            ></div>
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
// supplier products page
import { BIconGrid } from "bootstrap-vue";
import Product from "@/components/pages/supplier/products/Product";
import suppliers from "@/services/suppliers";
import globalAxios from "@/services/global-axios.js";
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
    /**
     * @vuese
     * this function used get supplier data
     */
    getSupplier() {
      this.loading = true;

      suppliers
        .getSupplier(this.client_id)
        .then((resp) => {
          this.supplier = resp.data.items;
        })
        // .catch((err) => {
        //   console.log(err);
        // })
        .finally(() => {
          this.loading = false;
        });
    },
    /**
     * @vuese
     * this function used get supplier products
     */
    getSupplierProducts() {
      return globalAxios
        .get(`products`, {
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

          if (resp.status == 200) {
            document.querySelector("input").value = "";
            document.getElementById("modal-2").click();
          }
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    },
    /**
     * @vuese
     * this function used get search and get Supplier Products
     */
    search() {
      this.getSupplierProducts();
    },
  },
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
// .intro {
//   margin: 10% 0;
// }
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
.supplier-image{
  width: 100px;
  height:100px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
