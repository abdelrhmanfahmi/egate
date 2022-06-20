<template>
  <div class="my-5">
    <div class="container">
      <div class="wrapper" v-if="!loading">
        <div class="my-4">
          <div class="d-flex justify-content-between align-items-center">
            <div class="order-back">
              <router-link to="/profile/ReturnRequests">
                <b-button variant="outline-ordinary">
                  <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
                  {{ $t("profile.orderBack") }}
                </b-button>
              </router-link>
            </div>
          </div>
          <div class="branding d-flex justify-content-center">
            <img
              src="@/assets/images/logo.png"
              class="img-fluid w-25"
              alt="logo"
              @click="goToHome()"
            />
          </div>
        </div>
        <div
          class="data-holder serial-holder d-flex justify-content-between align-items-center"
        >
          <div class="serial" v-if="return_item">
            <h4 class="m-0">
              <span>{{ $t("profile.orderSerial") }} :</span>
              <span>{{ return_item.serial }}</span>
            </h4>
          </div>
          <div class="print" v-if="return_item">
            <span class="mx-2">
              {{ return_item.return_status }}
            </span>
          </div>
        </div>

        <!-- <section class="account-address-info">
          <div class="row">
            <div class="col-md-6 col-sm-12 mb-2">
              <div class="" v-if="order">
                <div class="info">
                  <div class="row info-data info-colored">
                    <div class="col-6">
                      {{ $t("profile.returnStatus") }}
                    </div>
                    <div class="col-6">status</div>
                  </div>
                  <div class="row info-data" v-if="order.client_info.email">
                    <div class="col-6">
                      {{ $t("profile.returnOption") }}
                    </div>
                    <div class="col-6 mail">return type</div>
                  </div>
                  <div class="row info-data info-colored">
                    <div class="col-6">
                      {{ $t("profile.createedAt") }}
                    </div>
                    <div class="col-6">created at</div>
                  </div>
                  <div class="row info-data">
                    <div class="col-6">
                      {{ $t("profile.updatedAt") }}
                    </div>
                    <div class="col-6 mail">rupdated at</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 mb-2">
              <div
                class="row info-data"
                
              >
                <div class="col-6  info-colored">
                  <h5 class="pt-2">{{ $t("profile.returnImage") }} </h5>
                </div>
                <div class="col-6 py-1 info-colored">
                  <div class="downloadArea w-50 " :class="{'ml-auto' : $i18n.locale == 'en' , 'mr-auto' : $i18n.locale == 'ar'}">
                    <b-button
                      class="btn-block"
                      variant="outline-success"
                      @click="
                        downloadImage(
                          order.payment_image,
                          (extension = order.payment_image
                            .split('.')
                            .pop()),
                          $t('profile.downloadImage')
                        )
                      "
                    >
                      <i class="fa fa-download"></i>
                      {{ $t("profile.downloadImage") }}
                    </b-button>
                  </div>
                </div>
              </div>
              <div
                class="row info-data "
                
              >
                <div class="col-6">
                  {{ $t("profile.returnReason") }}
                </div>
                <div class="col-6">returnReason</div>
              </div>
            </div>
          </div>
        </section> -->

        <!-- <section class="supplier-info" v-if="orders && orders[0].bicked">
          <div
            class="data-holder serial-holder d-flex justify-content-between align-items-center"
          >
            <div class="serial">
              <h4 class="m-0">{{ $t("profile.pickedAddresses") }}</h4>
            </div>
          </div>
          <div class="">
            <div class="info">
              <div class="info-data pl-2">
                <div
                  class="row mb-2"
                  v-for="(order, index) in orders"
                  :key="index"
                >
                  <div class="row w-100" v-if="order.supplier && order.bicked">
                    <div class="col-md-1 col-sm-6">
                      <span class="mb-2">{{ order.company }} : </span>
                    </div>

                    <div
                      class="col-md-10 col-sm-6"
                      v-if="order.bicked !== null"
                    >
                      <span class="mb-2" v-if="order.bicked.apartment"
                        >{{ order.bicked.apartment }} ,</span
                      >
                      <span class="mb-2" v-if="order.bicked.floor"
                        >{{ order.bicked.floor }} ,</span
                      >
                      <span class="mb-2" v-if="order.bicked.address_line_1"
                        >{{ order.bicked.address_line_1 }} ,</span
                      >
                      <span class="mb-2" v-if="order.bicked.address_line_2"
                        >{{ order.bicked.address_line_2 }} ,</span
                      >

                      <span class="mb-2" v-if="order.bicked.city"
                        >{{ order.bicked.city.title }} ,</span
                      >
                      <span class="mb-2" v-if="order.bicked.region"
                        >{{ order.bicked.region.title }} ,</span
                      >

                      <span class="mb-2" v-if="order.bicked.country">{{
                        order.bicked.country.title
                      }}</span>
                    </div>
                  </div>
                  <div class="" v-else-if="!order.bicked && index == 0">-</div>
                </div>
              </div>
            </div>
          </div>
        </section> -->

        <!-- <section class="payment">
          <div class="row">
            <div class="col-md-6 col-sm-12 mb-2">
              <h4 class="data-holder">
                {{ $t("profile.paymentInfo") }}
              </h4>
              <div class="">
                <div class="info" v-if="order">
                  <div class="row info-data info-colored">
                    <div class="col-6">
                      {{ $t("payment.paymentStatus") }}
                    </div>
                    <div class="col-6" v-if="order.payment_status">
                      {{ order.payment_status }}
                    </div>
                  </div>

                  <div class="row info-data">
                    <div class="col-6">
                      {{ $t("profile.paymentType") }}
                    </div>
                    <div class="col-6" v-if="order.payment_type">
                      {{ order.payment }}
                    </div>
                  </div>
                  <div class="row info-data info-colored">
                    <div class="col-6">
                      {{ $t("profile.paymentCurency") }}
                    </div>
                    <div class="col-6">{{ $t("payment.priceUnit") }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 mb-2">
              <h4 class="data-holder">
                {{ $t("profile.shoppingInfo") }}
              </h4>
              <div class="">
                <div class="info">
                  <div class="row info-data info-colored">
                    <div class="col-6">{{ $t("profile.deleiveryFees") }}</div>
                    <div class="col-6" v-if="order">
                      {{ order.total_shipping_fee | fixedCurrency }}
                      {{ $t("payment.priceUnit") }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> -->
        
        <section class="item-order">
          <div class="my-5">
            <h5 class="h4">
              {{ $t("profile.itemsOrder") }}
            </h5>
            <hr />
          </div>
          <div class="supplier-products-data" v-if="return_item">
            <div
              class="supplier-info mb-5"
              
              
            >
              <div
                class="supplier-data info-data info-colored data-holder"
                v-if="return_item"
              >
                <div class="holder">
                  <div v-if="return_item.client">
                    {{ $t("profile.supplier") }} :
                    {{ return_item.client }}
                  </div>
                  <div class="" v-if="return_item">
                    {{ $t("profile.supplierOrder") }} : {{ return_item.order_supplier_serial }}
                  </div>
                </div>
              </div>

              <div class="supplier-products mt-3" v-if="fields">
                <div class="holder">
                  <table class="table table-striped table-hover selectable">
                    <thead class="font-weight-bold">
                      <tr>
                        <th
                          scope="col"
                          class="text-center"
                          v-for="(tab, index) in fields"
                          :key="index"
                        >
                          {{ tab.label }}
                        </th>
                      </tr>
                    </thead>
                    <tbody >
                      <tr>
                        <td v-if="return_item.item_names">
                          {{ return_item.item_names }}
                        </td>
                        <td v-else>-</td>
                        <td v-if="return_item.price">
                          {{ return_item.price | fixedCurrency }} {{ currency }}
                        </td>
                        <td v-if="return_item.quantity">{{ return_item.quantity }}</td>
                        <td v-else>-</td>
                        <td v-if="return_item.total_price">
                          {{ return_item.total_price | fixedCurrency }} {{ currency }}
                        </td>
                        <td v-else>
                          -
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <hr class="w-50 my-5 mx-auto" />
            </div>
          </div>
        </section>
      </div>
      <div class="" v-else>
        <div class="text-center">
          <b-spinner variant="primary" label="Spinning"></b-spinner>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import profile from "@/services/profile";
import axios from "axios";
export default {
  data() {
    return {
      fields: [
        {
          key: "product",
          label: this.$t("profile.productName"),
        },
        {
          key: "price",
          label: this.$t("profile.price"),
        },
        {
          key: "qty",
          label: this.$t("profile.qty"),
        },
        {
          key: "rowTotal",
          label: this.$t("profile.rowTotal"),
        },
      ],
      UUID: this.$route.query.UUID,

      return_item: null,
      message: "",
      errors: [],
      supplierUUID: null,
      loading: false,

      shipingExist: false,
    };
  },
  methods: {

    returnedSingleOrders() {
      this.loading = true;
      profile
        .returnedSingleOrders(this.UUID)
        .then((res) => {
          console.log("returnedSingleOrders", res);
          this.return_item = res.data.items.return_item;

          // this.paymentFormData.order_uuid = res.data.items.order.uuid;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    downloadImage(url, extension, label) {
      axios({
        url: url, // File URL Goes Here
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", `${label}.${extension}`);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },

  },
  mounted() {
    this.returnedSingleOrders();
  },
};
</script>

<style lang="scss" scoped>
.data-holder {
  padding: 20px;
  background: #f7f7f7;
}
.serial-holder {
  font-size: 20px;
}
h4 {
  background: #f7f7f7;
  margin-bottom: 2%;
}
section {
  margin: 2% 0;
}

.info {
  font-size: 20px;
  padding: 10px 0;
  margin: 0 15px;
}
.info-data {
  padding: 10px 0;
}
.info-colored {
  background: #f7f7f7;
}
.supplier-info {
  font-size: 20px;
}
table,
table tr,
table td {
  text-align: center !important;
}
.print {
  cursor: pointer;
}
.holder {
  display: flex;
  justify-content: space-between;
  // padding: 20px;
  font-size: 20px;
}
.supplier-data {
  padding: 20px;
}
.modal-content {
  display: none !important;
}
.payment-method {
  .methods-data {
    background: #ecf0f1;
    padding: 2rem;
    border-radius: 0.5rem;
    text-align: left;
    .info {
      border-bottom: 1px dashed #c5c6c6;
      padding: 1rem 0.3rem;
      color: #312620;
      font-weight: bold;
    }
    .total {
      padding: 1rem 0;
      color: #312620;
      font-weight: bold;
      .title {
        font-size: 14pt;
      }
    }
    .methods {
      background-color: #fff;
      border-radius: 0.5rem;
      border: 1px dashed #cfd0d0;
      .method {
        padding: 1rem;
        border-bottom: 1px dashed #cfd0d0;
        font-size: 11pt;
        color: #544842;
        .custom-radio {
          flex-wrap: wrap;
        }
        label {
          cursor: pointer;
        }
        span {
          width: 100%;
          font-size: 10pt;
          margin-top: -0.2rem;
          opacity: 0.7;
        }
        .online-media {
          img {
            object-fit: contain;
          }
        }
      }
    }
  }
}
.modal-header {
  align-content: center !important;
  justify-content: center !important;
}

.branding {
  display: none !important;
}

@media print {
  .cancel-btn,
  .return-btn,
  .print,
  .order-back {
    display: none;
  }
  .mail {
    word-break: break-all;
  }
  .branding {
    display: flex !important;
    justify-content: flex-end;
  }
}
</style>
