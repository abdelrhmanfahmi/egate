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
        <b-button variant="outline-success" v-if="quotations.price" id="show-btn"
          @click="$bvModal.show('bv-modal-example')">{{ $t("profile.offer") }}</b-button>
      </div>


      <div class="new-design" v-if="quotations && quotations.client_quote_comment">
        <div class="chat-holder">
          <ul class="chat row">
            <li
              :class="{
                'col-sm-12': quotate.comment_by == 'supplier',
                'col-sm-6 offset-sm-6 ': quotate.comment_by == 'client',
              }"
              v-for="quotate in quotations.client_quote_comment" :key="quotate.id"
            >
              <p
                :class="{
                  'left w-50': quotate.comment_by == 'supplier',
                  'right w-100': quotate.comment_by == 'client',
                }"
              >
                <span v-if="quotate.comment_by == 'supplier'" class="main-color">
                  <span v-if="quotations.supplier.company_name">{{
                    quotations.supplier.company_name
                  }}</span>
                  <span v-else>{{ quotations.supplier.company_name_en }}</span>
                </span>
                <span v-if="quotations.client" class="main-color">
                  <span v-if="quotations.client">{{ quotations.client.first_name }}
                    {{ quotations.client.last_name }}</span>
                  <span v-if="quotate.comment_by === 'supplier'">{{ quotations.supplier.company_name }}</span>
                </span>
                <span class="message comment" v-if="quotate.comment" v-html="quotate.comment"></span>
                <span class="messageDate">{{ quotate.created_at | formatDate }}</span>
              </p>
            </li>
          </ul>
          <div class="my-5 sendMessageHolder" v-if="quotations">
            <div class="row justify-content-center align-content-center">
              <div class="col-md-9 col-sm-9 mb-2">
                <div class="input-holder">
                  <input
                    v-model="message"
                    type="text"
                    class="form-control"
                    :placeholder="$t('profile.sendMessage')"
                  />
                </div>
              </div>
              <div class="col-md-2 col-sm-12 mb-2">
                <b-button
                  id="show-btn"
                  class="p-2 border-main"
                  @click="sendMessage"
                  :disabled="loading"
                >
                  <span>{{ $t("profile.send") }}</span>
                  <span v-if="loading">
                    ...
                    <span>
                      <b-spinner label="Spinning" small></b-spinner>
                    </span>
                  </span>
                </b-button>
              </div>
            </div>
            <div class="error mt-2">
              <p v-for="(error, index) in errors.message" :key="index">
                {{ error }}
              </p>
            </div>
          </div>
        </div>
      </div>

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
        <div class="d-flex justify-content-around align-items-center">

          <b-button class="mt-3 mx-2" variant="outline-success" block @click="addToCart(quotations)"
            v-if="add_to_cart">{{ $t("cart.addToCart") }}</b-button>
          <b-button class="mt-3 mx-2" variant="outline-danger" block @click="$bvModal.show('bv-standingOrders')"
            v-b-tooltip.hover :title="$t('items.standingOrders')">{{ $t("items.addStandingOrders") }}</b-button>
        </div>
      </b-modal>
      <b-modal id="bv-modal-example1" centered hide-footer>
        <template #modal-title> {{ $t("profile.yourMessage") }} </template>
        <div class="d-block">
          <div class="data-holder">
            <form>
              <textarea class="form-control" name="" id="" cols="30" rows="10" v-model="message" required></textarea>
              <div class="error mt-2">
                <p v-for="(error, index) in errors.comment" :key="index">
                  {{ error }}
                </p>
              </div>
            </form>
          </div>
        </div>
        <b-button class="mt-3" variant="outline-success" block @click="sendMessage">{{ $t("profile.send") }}</b-button>
      </b-modal>
      <b-modal id="bv-standingOrders" size="xl" hide-footer>
        <template #modal-title>
          {{ $t("items.standingOrders") }}
        </template>
        <standing-orders @customEmit="getClientStandingId($event)" :quotationQuantity="quotations.request_qty" />
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
import StandingOrders from "@/components/global/standingOrders.vue";
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
      message: '',
      errors: [],
      client_standing_id: null,
      quotationQuantity:null,
      loading:false
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
        // .catch((err) => {
        //   console.log(err);
        // });
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
      this.loading = true
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
            this.message = '';
            this.getQuotationDetail();
          }
        })
        .catch((error) => {
          let err = Object.values(error)[2].data;
          this.errors = err.items;
          // console.log(error);
        }).finally(()=>{
          this.loading = false
        })
    },
    getClientStandingId(standId) {
      this.client_standing_id = standId
    },
    
  },
  mounted() {
    this.getQuotationDetail();
  },
  components: {
    StandingOrders,
  },
  computed: {
    checkPage() {
      return this.$route.path.includes('quotationDetails')
    }
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

.custom-margin {
  margin-bottom: 80px;
}


.new-design {
  ul.chat {
    list-style: none;
    margin: 0 auto;
    padding: 0;
    width: 70%;
    max-height: 500px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      -webkit-box-shadow: inset 0 0 6px $main-color;
    }

    @media (max-width: 992px) {
      width: 100%;
    }

    p {
      margin-bottom: 10px;
      display: inline-block;
      border-radius: 8px;
      padding: 10px;
      width: 50%;

      min-height: 90px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    .left {
      background: #e3e3e3;
      //float: left;
      width: 100%;
      border-top-left-radius: 0;
      border-radius: 30px 30px 30px 0;
    }

    .right {
      background: transparent;
      border: 2px solid #e3e3e3;
      border-top-right-radius: 0;
      //float: right;
      width: 100%;
      border-radius: 30px 30px 0px 30px;
    }

    &.stamp {
      color: #666;
      font-size: 80%;
      text-align: center;
      width: 100%;
      span {
        color: #999;
      }
    }
  }
}
.en .chat,
.ar .chat {
  direction: ltr !important;
}
.ar .chat {
  text-align: right !important;
  //p {
  // display: flex !important;
  //justify-content: flex-end !important;
  //align-items: center !important;
  //}
}
li {
  p {
    display: flex !important;
    flex-direction: column !important;
    justify-content: flex-start !important;
    align-items: flex-start !important;
  }
}
.sendMessageHolder {
  //display: flex;
  //justify-content: center;
  width: 70%;
  margin: auto;
  button {
    height: 53px;
    width: 100%;
  }
  //align-items: center;
  @media (max-width: 767px) {
    width: 100%;
    .row {
      text-align: center;
      button {
        width: 50%;
        margin: auto;
      }
    }
  }
}
.left,
.right {
  position: relative;
  .message {
    margin-bottom: 20px;
  }
  .messageDate {
    position: absolute;
    right: 15px;
    bottom: 5px;
    opacity: 0.5;
  }
}

.company-logo {
  .data-holder {
    width: 40%;
  }
  button {
    height: 20px;
    width: 20px;
    line-height: 20px;
    border: none;
  }
  .file-wrapper {
    text-align: center;
    height: 20px;
    vertical-align: middle;
    position: absolute;
    right: 35px;
    top: -5px;
    font-size: 20px;
  }

  .file-wrapper input {
    position: absolute;
    top: 5px;
    right: -12px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
    height: 50px;
    //width: 36px;
    cursor: pointer;
  }

  .file-input {
    color: $top-header-color;
  }
  .text-holder {
    color: #bebebe;
    margin: 20px 0;
    cursor: pointer;
  }
}
.myIcon {
  cursor: pointer;
}
.message-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;
  img {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}

.withdrow-image {
  max-height: 50vh;
  width: 100%;
  object-fit: contain;
}

</style>
