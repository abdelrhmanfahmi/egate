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
      <p class="description">
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
        <p class="supplier" v-if="myProduct.client.company_name">
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
      <!--  -->
      <div class="variants" v-if="myProduct.product.variants[0].variant.title">
        <p
          class="sort"
          v-for="type in myProduct.product.variants"
          :key="type.id"
        >
          <b v-if="type.variant.title">
            {{ type.variant.title }}
          </b>
        </p>
      </div>
      <hr />
      <div
        class="product-actions d-flex flex-wrap justify-content-between align-items-center"
      >
        <div class="short-links">
          <button
            class="btn btn-loght bg-transparent border-0 outline-none shadow-none m-0 p-0"
            v-if="
              (myProduct.product_details_by_type.add_type == 'rfq' ||
                myProduct.product_details_by_type.add_type == 'both') &&
              userData
            "
          >
            <div>
              <span role="button" @click="$bvModal.show('modal-scoped')">
                {{ $t("singleProduct.bidRequest") }}
                <font-awesome-icon icon="fa-solid fa-list" />
              </span>

              <b-modal id="modal-scoped" centered>
                <template #modal-header="{ close }">
                  <h5>{{ $t("singleProduct.bidRequest") }}</h5>

                  <!-- Emulate built in modal header close button action -->
                  <b-button
                    size="sm"
                    variant="outline-danger"
                    @click="close()"
                    class="close cancelBtn"
                  >
                    x
                  </b-button>
                </template>

                <form>
                  <div class="form-group">
                    <label for="">
                      <h5>
                        {{ $t("cart.quantity") }}
                        <span class="text-danger">*</span>
                      </h5>
                    </label>
                    <input
                      class="form-control"
                      v-model.number="requestData.quantity"
                      type="number"
                      min="1"
                    />
                    <div
                      class="error"
                      v-for="(error, index) in errors.request_qty"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="">
                      <h5>
                        {{ $t("cart.quoteName") }}
                        <span class="text-danger">*</span>
                      </h5>
                    </label>
                    <input
                      class="form-control"
                      v-model="requestData.name"
                      type="text"
                      min="1"
                    />
                    <div
                      class="error"
                      v-for="(error, index) in errors.qoute_name"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="">
                      <h5>
                        {{ $t("cart.message") }}
                        <span class="text-danger">*</span>
                      </h5>
                    </label>
                    <textarea
                      class="form-control"
                      name="message"
                      id=""
                      cols="30"
                      rows="10"
                      v-model="requestData.comment"
                    ></textarea>
                    <div
                      class="error"
                      v-for="(error, index) in errors.comment"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </div>
                </form>

                <template #modal-footer="{ cancel }">
                  <!-- Emulate built in modal footer ok and cancel button actions -->
                  <b-button
                    size="sm"
                    variant="danger"
                    @click="cancel()"
                    class="cancelBtn"
                  >
                    {{ $t("cart.cancel") }}
                  </b-button>
                  <!-- Button with custom close trigger value -->
                  <b-button
                    size="sm"
                    variant="outline-secondary"
                    @click="requestQuotation"
                    class="submitBtn"
                  >
                    {{ $t("cart.submit") }}
                  </b-button>
                </template>
              </b-modal>
            </div>
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
            (myProduct.product_details_by_type.add_type == 'cart' ||
              myProduct.product_details_by_type.add_type == 'both') &&
            userData
          "
        >
          {{ $t("singleProduct.addCart") }}
        </button>
        <Counter
          :quantity="1"
          class="my-3"
          v-if="
            (myProduct.product_details_by_type.add_type == 'cart' ||
              myProduct.product_details_by_type.add_type == 'both') &&
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
import suppliers from "@/services/suppliers";
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
    requestQuotation() {
      let payload = {
        qoute_name: this.requestData.name,
        product_supplier_id: this.requestData.id,
        request_qty: this.requestData.quantity,
        comment: this.requestData.comment,
      };
      suppliers
        .requestQuotation(payload)
        .then((resp) => {
          console.log(resp);
          this.errors = {};
          this.sucessMsg(resp.data.message);
          setTimeout(() => {
            document.querySelector(".close").click();
          }, 500);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
  },
  data() {
    return {
      requestData: {
        name: null,
        quantity: null,
        comment: null,
        id: this.$route.query.id,
      },
      errors: {},
    };
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
textarea {
  resize: none;
}
.submitBtn {
  background: #f57b22;
  color: #fff;
  font-size: 20px;
  border: none;
  box-shadow: none;
  outline: none;
}
.cancelBtn {
  background: transparent;
  font-size: 20px;
  border: none;
  box-shadow: none;
  outline: none;
  margin: 0 20px;
  color: #312620;
}
</style>
