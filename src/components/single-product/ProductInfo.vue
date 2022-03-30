<template>
  <div class="product-info">
    <div class="content" v-if="myProduct">
      <b
        class="sort"
        v-for="type in myProduct.product.categories"
        :key="type.id"
      >
        {{ type.title }}
      </b>
      <h4 class="name" v-if="myProduct.product.title">
        {{ myProduct.product.title }}
      </h4>
      <p>
        {{ myProduct.short_description }}
      </p>
      <b-form-rating></b-form-rating>
      <div
        class=""
        v-for="(pro, index) in myProduct.product_details"
        :key="index"
      >
        <p class="serial" v-if="pro.sku">SKU : {{ pro.sku }}</p>
        <p class="price">
          {{ $t("singleProduct.price") }} :
          {{ pro.price }}
        </p>

        <hr />
        <p class="supplier">
          {{ $t("singleProduct.supplier") }}
          <b>:</b>
          <router-link :to="`/suppliers/${myProduct.client.id}`">
            {{ myProduct.client.company_name }}
          </router-link>
        </p>
        <div class="weight">
          <p class="title" v-if="pro.weight">
            {{ $t("singleProduct.weight") }} : {{ pro.weight }}
          </p>
          <!-- <div class="available-weight d-flex justify-content-end">
            <span>500</span>
            <span>1500</span>
          </div> -->
        </div>
      </div>
      <span class="is-available" v-if="myProduct.in_stock_quantity"
        >{{ $t("singleProduct.available") }} :
        <b>{{ myProduct.in_stock_quantity }}</b></span
      >
      <hr />
      <div
        class="product-actions d-flex flex-wrap justify-content-between align-items-center"
      >
        <div class="short-links">
          <button
            class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0"
            v-if="
              (myProduct.product_details[0].add_type == 'rfq' ||
                myProduct.product_details[0].add_type == 'both') &&
              userData
            "
          >
            {{ $t("singleProduct.bidRequest") }}
            <span>
              <font-awesome-icon icon="fa-solid fa-list" />
            </span>
          </button>
          <button
            @click="loginFirst"
            class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0"
            v-else-if="!userData"
          >
            {{ $t("singleProduct.bidRequest") }}
            <span>
              <font-awesome-icon icon="fa-solid fa-list" />
            </span>
          </button>
          <button
            class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0"
            v-else
          >
            <!-- <router-link to="/b2b-login"> -->
            {{ $t("singleProduct.bidRequest") }}
            <span>
              <font-awesome-icon icon="fa-solid fa-list" />
            </span>
            <!-- </router-link> -->
          </button>
          <button
            class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0 d-block"
          >
            {{ $t("singleProduct.addFavorites") }}
            <span>
              <font-awesome-icon icon="fa-solid fa-heart" />
            </span>
          </button>
          <!-- <button class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0" >
            {{ $t("singleProduct.addPurchase") }}
            <span>
              <font-awesome-icon icon="fa-solid fa-repeat" />
            </span>
          </button> -->
        </div>
        <button
          class="btn btn-loght border-0 outline-none shadow-none d-block add-cart"
          v-if="
            (myProduct.product_details[0].add_type == 'cart' ||
              myProduct.product_details[0].add_type == 'both') &&
            userData
          "
        >
          {{ $t("singleProduct.addCart") }}
        </button>
        <Counter
          :quantity="1"
          class="my-3"
          v-if="
            (myProduct.product_details[0].add_type == 'cart' ||
              myProduct.product_details[0].add_type == 'both') &&
            userData
          "
        ></Counter>
      </div>
      <hr />
      <div class="share-social d-flex align-items-center">
        <span>{{ $t("singleProduct.sharing") }}</span>
        <div class="social-sharing-icons">
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-facebook-f" />
          </a>
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-whatsapp" />
          </a>
          <a href="#">
            <font-awesome-icon icon="fa-brands fa-twitter" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Counter from "../global/Counter.vue";
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";
Vue.use(VueSweetalert2);
export default {
  components: {
    Counter,
  },
  props: ["myProduct"],
  methods: {
    loginFirst() {
      Vue.swal({
        title: this.$t("singleProduct.loginFirst"),
        text: this.$t("singleProduct.registerNow"),
        icon: "warning",
        buttons: ["Oh noez!", true],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          Vue.swal(location.replace("/user-register"));
        } 
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.product-info {
  .content {
    .category {
      color: #403a37;
      font-size: 11pt;
      margin-bottom: 0.3rem;
      display: block;
    }
    .name {
      color: #312620;
      font-weight: bold;
      font-size: 20pt;
      margin-bottom: 1rem;
    }
    .serial {
      font-size: 12pt;
      margin-bottom: 1rem;
      color: #403a37;
    }
    .price {
      font-size: 14pt;
      font-weight: bold;
      color: #312620;
      margin-bottom: 1rem;
    }
    .supplier {
      font-size: 12pt;
      color: #403a37;
      margin-bottom: 1.2rem;
      a {
        text-decoration: underline;
        color: #403a37;
        font-weight: bold;
      }
    }
    .weight {
      .title {
        font-size: 11pt;
        margin-bottom: 1.5rem;
        padding-inline-start: 2rem;
        font-weight: bold;
      }
      .available-weight {
        span {
          width: 6rem;
          height: 2rem;
          border: 3px solid #ebebeb;
          font-size: 11pt;
          color: #544842;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 0.2rem;
          cursor: pointer;
          transition: all ease-out 0.3s;
          &:hover {
            background: #ff6000;
            border-color: #ff6000;
            color: #fff;
          }
        }
      }
    }
    .is-available {
      font-size: 11pt;
      margin-bottom: 1.3rem;
      padding-inline-start: 35px;
      font-weight: bold;
    }
    .product-actions {
      .short-links {
        margin-inline-end: 0.5rem;
        min-width: 10rem;
        a {
          display: block;
          color: #676565;
          font-size: 11pt;
          &:hover {
            color: #ed2124;
          }
          span {
            margin-inline-start: 0.25rem;
          }
        }
      }
      .add-cart {
        border-radius: 0;
        font-size: 11pt;
        background: #36363b;
        color: #fff;
        padding: 1rem 2rem;
        height: fit-content;
        margin-inline-end: 0.5rem;
        display: block;
        min-width: 10rem;
        text-align: center;
        &:hover {
          background: #ed2124;
        }
      }
    }
    .share-social {
      span {
        color: #403a37;
        margin-inline-end: 1rem;
      }
      .social-sharing-icons {
        a {
          color: #898481;
          padding: 0.5rem;
          display: inline-block;
          margin-inline-end: 0.25rem;
          &:hover {
            color: #ed2124;
          }
        }
      }
    }
  }
  .sort {
    background: #f6f6f6;
    padding: 16px !important;
    font-size: 19px;
    display: inline-block;
    margin: 10px 10px 20px 0;
  }
}
</style>
