<template>
  <!-- quotation details page  -->
  <div :class="$i18n.locale">
    <div class="container">
      <div class="my-5 py-5 text-center">
        <h1>
          {{ $t("profile.quoteData") }}
        </h1>
      </div>
      <div class="my-5" v-if="quotations">
        <b-button
          variant="outline-success"
          v-if="quotations.price"
          id="show-btn"
          @click="$bvModal.show('bv-modal-example')"
          >{{ $t("profile.offer") }}</b-button
        >
        <b-button
          variant="outline-danger"
          
          id="show-btn"
          class="mx-2"
          @click="$bvModal.show('bv-modal-example1')"
          >{{ $t("profile.sendMessage") }}</b-button
        >
      </div>
      <table class="table custom-margin">
        <thead
          :class="{
            'text-left': $i18n.locale == 'en',
            'text-right': $i18n.locale == 'ar',
          }"
        >
          <tr>
            <th scope="col" colspan="1">
              {{ $t("profile.sentBy") }}
            </th>
            <th scope="col" colspan="8">{{ $t("profile.quoteMessage") }}</th>
            <th scope="col" colspan="1">{{ $t("profile.sentdate") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="quotate in quotations.client_quote_comment"
            :key="quotate.id"
          >
            <th>
              <div class="" v-if="quotate.comment_by === 'client'">
                <span v-if="quotations.client"
                  >{{ quotations.client.first_name }}
                  {{ quotations.client.last_name }}</span
                >
              </div>
              <div class="" v-if="quotate.comment_by === 'supplier'">
                <span v-if="quotations.supplier">{{ quotations.supplier.company_name }}</span>
              </div>
            </th>
            <td>
              <div>
                <span class="comment" v-if="quotate.comment">{{ quotate.comment }}</span>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <div>
                <span>{{ quotate.created_at | formatDate }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <b-modal id="bv-modal-example" centered hide-footer>
        <template #modal-title> {{ $t("profile.quoteData") }} </template>
        <div class="d-block">
          <div class="data-holder">
            <div class="" v-if="quotations.product_supplier">
              <div class="" v-if="quotations.product_supplier.product">
                <div v-if="$i18n.locale == 'en'">
                  <h5 v-if="quotations.product_supplier.product">
                    {{ $t("profile.title") }} :
                    {{ quotations.product_supplier.product.title_en }}
                  </h5>
                </div>
                <div v-else>
                  <h5 v-if="quotations.product_supplier.product">
                    {{ $t("profile.title") }} :
                    {{ quotations.product_supplier.product.title_ar }}
                  </h5>
                </div>
              </div>
              <div class="" v-if="quotations.price">
                <h5>
                  {{ $t("cart.price") }} : {{ quotations.price }} {{ currency }}
                </h5>
              </div>
              <div class="" v-if="quotations.request_qty">
                <h5>
                  {{ $t("cart.quantity") }} : {{ quotations.request_qty }}
                </h5>
              </div>
              <div class="" v-if="quotations.expiry_at">
                <h5>
                  {{ $t("profile.expiry_at") }} : {{ quotations.expiry_at }}
                </h5>
              </div>
            </div>
          </div>
        </div>
        <b-button
          class="mt-3"
          variant="outline-success"
          block
          @click="addToCart(quotations)"
          v-if="cartAvailable  == 'available'"
          >{{ $t("cart.addToCart") }}</b-button
        >
      </b-modal>
      <b-modal id="bv-modal-example1" centered hide-footer>
        <template #modal-title> {{ $t("profile.yourMessage") }} </template>
        <div class="d-block">
          <div class="data-holder">
            <form>
              <textarea
                class="form-control"
                name=""
                id=""
                cols="30"
                rows="10"
                v-model="message"
                required
              ></textarea>
              <div class="error mt-2">
                <p v-for="(error, index) in errors.comment" :key="index">
                  {{ error }}
                </p>
              </div>
            </form>
          </div>
        </div>
        <b-button
          class="mt-3"
          variant="outline-success"
          block
          @click="sendMessage"
          >{{ $t("profile.send") }}</b-button
        >
      </b-modal>
    </div>
  </div>
</template>

<script>
/**
 * quotation details page
 * @displayName quotation details page
 */
import profile from "@/services/profile";
import globalAxios from "@/services/global-axios";
export default {
  data() {
    return {
      quotations: [],
      id: this.$route.query.id,
      fields: [
        {
          key: "comments",
          label: this.$t("profile.sentBy"),
        },
        {
          key: "supplier_product_name",
          label: this.$t("profile.quoteMessage"),
        },
        {
          key: "created_by",
          label: this.$t("profile.sentdate"),
        },
      ],
      message: null,
      errors: [],
    };
  },
  methods: {
    /**
     * get Quotation Details function
     * @vuese
     */
    getQuotationDetail() {
      profile
        .getQuotationDetail(this.id)
        .then((res) => {
          // console.log("res" , res);
          this.quotations = res.data.items.client_quote;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * add To Cart function
     * @vuese
     */
    addToCart() {
      let data = {
        client_quote_id: this.id,
        approve: 1,
      };
      return globalAxios
        .post(`members/product/rfq/approve`, data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            document.querySelector(".close").click();

            // this.$modal.show(
            //   () => import("@/components/cart/cartModal.vue"),
            //   {
            //     product: myProduct,
            //   },
            //   { width: "700", height: "auto", adaptive: true }
            // );
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        })
        .finally(() => {
          setTimeout(() => {
            this.$store.dispatch("cart/getCartProducts");
          }, 500);
        });
    },
    /**
     * send Message to supplier function
     * @vuese
     */
    sendMessage() {
      let data = {
        client_quote_id: this.id,
        comment: this.message,
      };
      profile
        .sendMessage(data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            document.querySelector(".close").click();
            this.message = "";
            this.getQuotationDetail();
          }
        })
        .catch((error) => {
          let err = Object.values(error)[2].data;
          this.errors = err.items;
          console.log(error);
        });
    },
  },
  mounted() {
    this.getQuotationDetail();
  },
};
</script>

<style lang="scss" scoped>
.ar {
  thead th {
    text-align: right !important;
  }
}
.en {
  thead th {
    text-align: left !important;
  }
}
.comment {
  word-break: break-all;
}
.custom-margin{
  margin-bottom: 80px;
}
</style>
