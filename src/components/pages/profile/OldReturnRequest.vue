<template>
  <div class="return-data-holder">
    <div class="my-4">
      <div class="d-flex justify-content-between align-items-center">
        <div class="order-back">
          <router-link to="/profile/ReturnRequests">
            <b-button variant="outline-ordinary">
              <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
              {{ $t("profile.returnBack") }}
            </b-button>
          </router-link>
        </div>
      </div>
    </div>
    <div
      class="data-holder serial-holder d-flex justify-content-between align-items-center"
    >
      <div class="serial" v-if="return_item">
        <h4 class="m-0">
          <span>{{ $t("profile.returnSerial") }} :</span>
          <span v-if="return_item.serial">{{ return_item.serial }} </span>
        </h4>
      </div>
      <div class="print" v-if="return_item">
        <span class="mx-2" v-if="return_item.return_status">
          {{ return_item.return_status }}
        </span>
      </div>
    </div>

    <div
      class="cancelReason supplier-data info-data info-colored data-holder mt-1 mb-0 px-1"
      v-if="return_item && return_item.return_status === 'Declined'"
    >
      <h5 class="text-danger px-3 mb-0">
        <span> {{ $t("profile.rejectionReason") }} : </span>
        <span class="mx-2">
          {{ return_item.declined_reason }}
        </span>
      </h5>
    </div>

    <section class="account-address-info">
      <div class="row">
        <div class="col-md-6 col-sm-12 mb-2" v-if="return_item">
          <div class="">
            <div class="info">
              <div class="row info-data info-colored">
                <div class="col-6">
                  {{ $t("profile.returnStatus") }}
                </div>
                <div class="col-6" v-if="return_item.status">
                  {{ return_item.status }}
                </div>
              </div>
              <div class="row info-data">
                <div class="col-6">
                  {{ $t("profile.returnOption") }}
                </div>
                <div class="col-6 mail" v-if="return_item.retrun_option">
                  {{ return_item.retrun_option }}
                </div>
              </div>
              <div class="row info-data info-colored">
                <div class="col-6">
                  {{ $t("profile.createdAt") }}
                </div>
                <div class="col-6">
                  {{ return_item.return_request_date | formatDate }}
                </div>
              </div>
              <div class="row info-data">
                <div class="col-6">
                  {{ $t("profile.updatedAt") }}
                </div>
                <div class="col-6 mail">
                  {{ return_item.updated_at | formatDate }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 mb-2">
          <div class="row info-data">
            <div class="col-4 info-colored">
              <h5 class="pt-2">{{ $t("profile.returnImage") }}</h5>
            </div>
            <div class="col-8 py-1 info-colored">
              <div
                class="downloadArea w-50"
                :class="{
                  'ml-auto': $i18n.locale == 'en',
                  'mr-auto': $i18n.locale == 'ar',
                }"
              >
                <b-button
                  class="btn-block"
                  variant="outline-success"
                  @click="
                    downloadImage(
                      return_item.image,
                      (extension = return_item.image.split('.').pop()),
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
          <div class="info-data" v-if="return_item">
            <div class="col-12 p-0">
              <h5 class="pt-2">{{ $t("profile.returnReason") }}</h5>
            </div>
            <div class="col-12 return-reason" v-if="return_item.return_reason">
              {{ return_item.return_reason }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="payment" v-if="return_item">
      <div class="row">
        <div class="col-md-6 col-sm-12 mb-2">
          <h4 class="data-holder">
            {{ $t("profile.paymentInfo") }}
          </h4>
          <div class="">
            <div class="info">
              <div
                class="row info-data info-colored"
                v-if="return_item.payment_type"
              >
                <div class="col-6">
                  {{ $t("profile.paymentType") }}
                </div>
                <div class="col-6">
                  {{ return_item.payment_type }}
                </div>
              </div>
              <div class="row info-data">
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
              <div class="row info-data info-colored cancelReason">
                <div class="col-6">{{ $t("profile.reshippingFees") }}</div>
                <div class="col-6" v-if="return_item.reshipping_fee">
                  {{ return_item.reshipping_fee | fixedCurrency }}
                  {{ $t("payment.priceUnit") }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="item-order">
      <div class="my-5">
        <h5 class="h4">
          {{ $t("profile.itemsOrder") }}
        </h5>
        <hr />
      </div>
      <div class="supplier-products-data" v-if="return_item">
        <div class="supplier-info mb-5">
          <div
            class="supplier-data info-data info-colored data-holder"
            v-if="return_item"
          >
            <div class="holder">
              <div v-if="return_item.supplier">
                {{ $t("profile.supplier") }} :
                {{ return_item.supplier }}
              </div>
              <div class="" v-if="return_item">
                {{ $t("profile.supplierOrder") }} :
                {{ return_item.order_supplier_serial }}
              </div>
            </div>
          </div>

          <div class="supplier-products mt-3" v-if="fields">
            <div class="holder">
              <table
                class="table table-striped table-hover selectable"
                v-if="
                  supplier_oreder_item.basket_promotion_id ||
                  supplier_oreder_item.baskets
                "
              >
                <thead class="font-weight-bold">
                  <tr>
                    <th
                      scope="col"
                      class="text-center"
                      v-for="(tab, index) in basketFields"
                      :key="index"
                    >
                      {{ tab.label }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td v-if="return_item.item_names">
                      {{ return_item.item_names }} ({{
                        supplier_oreder_item.status_lang
                      }})
                    </td>
                    <td v-else>-</td>
                    <td v-if="supplier_oreder_item.price">
                      {{ supplier_oreder_item.price | fixedCurrency }}
                      {{ currency }}
                    </td>
                    <td v-if="return_item.quantity">
                      {{ return_item.quantity }}
                    </td>
                    <td v-else>-</td>
                    <!-- <td v-if="supplier_oreder_item.sup_total"> -->
                    <td v-if="supplier_oreder_item.total_price">
                      <!-- {{ supplier_oreder_item.sup_total | fixedCurrency }} -->
                      {{ supplier_oreder_item.total_price | fixedCurrency }}
                      {{ currency }}
                    </td>
                    <td v-else>-</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <table class="table table-striped table-hover selectable" v-else>
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
                <tbody>
                  <tr>
                    <td v-if="return_item.item_names">
                      {{ return_item.item_names }} ({{
                        supplier_oreder_item.status_lang
                      }})
                    </td>
                    <td v-else>-</td>
                    <td v-if="supplier_oreder_item.price">
                      {{ supplier_oreder_item.price | fixedCurrency }}
                      {{ currency }}
                    </td>
                    <td v-if="return_item.quantity">
                      {{ return_item.quantity }}
                    </td>
                    <td v-else>-</td>
                    <!-- <td v-if="supplier_oreder_item.sup_total"> -->
                    <td v-if="supplier_oreder_item.total_price">
                      <!-- {{ supplier_oreder_item.sup_total | fixedCurrency }} -->
                      {{ supplier_oreder_item.total_price | fixedCurrency }}
                      {{ currency }}
                    </td>
                    <td v-else>-</td>
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
</template>

<script>
export default {
  props: ["return_item", "supplier_oreder_item", "clinet_info"],
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
      basketFields: [
        {
          key: "product",
          label: this.$t("profile.basketName"),
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
    };
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
  
  .return-reason {
    word-break: break-all;
  }
  
  .cancelReason {
    background: #ff000042 !important;
  }
</style>
