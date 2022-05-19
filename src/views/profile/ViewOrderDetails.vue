<template>
  <div class="my-5">
    <div class="container">
      <div class="wrapper" v-if="!loading">
        <div
          class="data-holder serial-holder d-flex justify-content-between align-items-center"
        >
          <div class="serial" v-if="orderData">
            <h4 class="m-0">
              {{ $t("profile.orderSerial") }} : {{ orderData.serial }}
            </h4>
          </div>
          <div class="print" @click="printScreen">
            <font-awesome-icon icon="fa-solid fa-print" />
            <span class="mx-2">
              {{ $t("profile.printIno") }}
            </span>
          </div>
        </div>
        <section class="account-address-info">
          <div class="row">
            <div class="col-md-6 col-sm-12 mb-2">
              <h4 class="data-holder">
                {{ $t("profile.buyerInformation") }}
              </h4>
              <div class="" v-if="orderData">
                <div class="info">
                  <div
                    class="row info-data info-colored"
                    v-if="orderData.client_info"
                  >
                    <div class="col-6">
                      {{ $t("profile.customerName") }}
                    </div>
                    <div class="col-6" v-if="orderData.client_info">
                      {{ orderData.client_info.first_name }}
                      {{ orderData.client_info.last_name }}
                    </div>
                  </div>
                  <div class="row info-data" v-if="orderData.client_info.email">
                    <div class="col-6">
                      {{ $t("profile.customerEmail") }}
                    </div>
                    <div class="col-6">{{ orderData.client_info.email }}</div>
                  </div>
                  <div
                    class="row info-data info-colored"
                    v-if="orderData.client_info.phone"
                  >
                    <div class="col-6">
                      {{ $t("profile.tele") }}
                    </div>
                    <div class="col-6" v-if="orderData.client_info.phone">
                      {{ orderData.client_info.phone }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 mb-2" v-if="orderData">
              <h4 class="data-holder">
                {{ $t("profile.addressInfo") }}
                <!-- <sub> ( {{ $t("profile.billingAddress") }} ) </sub> -->
              </h4>
              <div class="pl-2" v-if="orderData.client_info">
                {{ orderData.client_info.address }}
              </div>
            </div>
          </div>
        </section>
        <section class="supplier-info">
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
                  <div class="col-md-2 col-sm-6">
                    <span class="mb-2" v-if="order.supplier"
                      >{{ order.supplier }} :</span
                    >
                  </div>

                  <div
                    class="col-md-10 col-sm-6"
                    v-if="order.bicked !== null || order.bicked"
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
              </div>
            </div>
          </div>
        </section>
        <section class="payment">
          <!-- <div
          class="data-holder serial-holder d-flex justify-content-between align-items-center mb-4"
        >
          <div class="">
            <h4 class="m-0">{{ $t("profile.payment") }}</h4>
          </div>
        </div> -->
          <div class="row">
            <div class="col-md-6 col-sm-12 mb-2">
              <h4 class="data-holder">
                {{ $t("profile.paymentInfo") }}
              </h4>
              <div class="">
                <div class="info" v-if="orderData">
                  <div class="row info-data info-colored">
                    <div class="col-6">
                      {{ $t("profile.paymentType") }}
                    </div>
                    <div class="col-6" v-if="orderData.payment_type">
                      {{ orderData.payment_type }}
                    </div>
                  </div>
                  <div class="row info-data">
                    <div class="col-6">
                      {{ $t("profile.paymentCurency") }}
                    </div>
                    <div class="col-6">KWD</div>
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
                    <div class="col-6" v-if="orderData">
                      {{ orderData.total_shipping_fee | fixedCurrency }}
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
          <div class="supplier-products-data">
            <div
              class="supplier-info mb-5"
              v-for="(order, index) in orders"
              :key="index"
            >
              <div
                class="supplier-data info-data info-colored data-holder"
                v-if="order.supplier"
              >
                <div class="holder">
                  <div v-if="order.company">
                    {{ $t("profile.supplier") }} :
                    {{ order.company }}
                  </div>
                  <div class="" v-if="order">
                    {{ $t("profile.supplierOrder") }} : {{order.serial}} |
                    {{ $t("profile.status") }} : {{ order.order_status }}
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <b-button
                  @click="
                    $bvModal.show('bv-modal-example1');
                    showModal(order);
                  "
                  variant="outline-danger mt-2"
                  v-if="
                    ($i18n.locale == 'en' &&
                      order.order_status === 'Pending') ||
                    ($i18n.locale == 'en' &&
                      order.order_status === 'Accepted') ||
                    ($i18n.locale == 'en' &&
                      order.order_status === 'Out_Of_Delivered')
                  "
                  ><font-awesome-icon icon="fa-solid fa-x" />
                  <span class="mx-2">cancel</span></b-button
                >
                <b-button
                  @click="$bvModal.show('bv-modal-example1')"
                  variant="outline-danger"
                  v-else-if="
                    ($i18n.locale == 'ar' &&
                      order.order_status === 'Pending') ||
                    ($i18n.locale == 'ar' &&
                      order.order_status === 'Accepted') ||
                    ($i18n.locale == 'ar' &&
                      order.order_status === 'Out_Of_Delivered')
                  "
                  ><span class="mx-2">الغاء</span
                  ><font-awesome-icon icon="fa-solid fa-x"
                /></b-button>
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
                    <tbody v-for="(ord, index) in order.items" :key="index">
                      <tr>
                        <td v-if="ord.items">
                          {{ ord.items.product.title }}
                        </td>
                        <td v-else>-</td>
                        <td v-if="ord.price">
                          {{ ord.price | fixedCurrency }}
                        </td>
                        <td v-if="ord.quantity">{{ ord.quantity }}</td>
                        <td v-if="ord.total_price">
                          {{ ord.total_price | fixedCurrency }}
                        </td>
                        <td>
                          <button class="btn btn-outline-danger">
                            {{ $t("profile.return") }}
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <hr class="w-50 my-5 mx-auto" />
            </div>
            <b-modal id="bv-modal-example1" centered hide-footer>
              <template #modal-title>
                {{ $t("profile.yourMessage") }}
              </template>
              <div class="d-block">
                <div class="">
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
                      <p
                        v-for="(error, index) in errors.client_cancel_reason"
                        :key="index"
                      >
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
                @click="deleteOrder"
                >{{ $t("profile.send") }}</b-button
              >
              <!-- <b-button class="mt-3" variant="outline-success" block @click="$bvModal.hide('bv-modal-example')"
          >{{$t('cart.addToCart')}}</b-button
        > -->
            </b-modal>
          </div>
        </section>

        <section class="item-order">
          <div class="mt-5">
            <h5 class="h4">
              {{ $t("profile.orderTotal") }}
            </h5>
            <hr />
          </div>
          <div class="row">
            <div class="col-12">
              <div class="">
                <div class="info">
                  <div class="row info-data info-colored">
                    <div class="col-6">
                      {{ $t("profile.subTotal") }}
                    </div>
                    <div class="col-6" v-if="orderData">
                      KWD {{ orderData.sup_total_price | fixedCurrency }}
                    </div>
                  </div>
                  <div class="row info-data">
                    <div class="col-6">
                      {{ $t("profile.total_shipping_fee") }}
                    </div>
                    <div class="col-6" v-if="orderData">
                      KWD {{ orderData.total_shipping_fee | fixedCurrency }}
                    </div>
                  </div>

                  <!-- <div class="row info-data">
                  <div class="col-6">{{ $t("profile.total_commission") }}</div>
                  <div class="col-6" v-if="orderData">
                    KWD {{ orderData.total_commission }}
                  </div>
                </div> -->
                  <div class="row info-data info-colored">
                    <div class="col-6">{{ $t("profile.totalDiscount") }}</div>
                    <div class="col-6" v-if="orderData">
                      KWD {{ orderData.total_discount | fixedCurrency }}
                    </div>
                  </div>
                  <div class="row info-data">
                    <div class="col-6">{{ $t("profile.total_price") }}</div>
                    <div class="col-6" v-if="orderData">
                      KWD {{ orderData.total_price | fixedCurrency }}
                    </div>
                  </div>
                </div>
              </div>
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
        {
          key: "",
          label: this.$t("profile.actions"),
        },
      ],
      id: this.$route.query.id,
      orders: null,
      orderData: null,
      message: "",
      errors: [],
      supplierUUID: null,
      loading: false,
    };
  },
  methods: {
    printScreen() {
      window.print();
    },
    getSingleOrders() {
      this.loading = true;
      profile
        .getSingleOrders(this.id)
        .then((res) => {
          console.log("getSingleOrders", res);
          this.orders = res.data.items.suppliers;
          this.orderData = res.data.items.order;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    deleteOrder(order) {
      console.log(order);
      let data = {
        orderUUID: this.supplierUUID,
        payLoad: this.message,
      };
      profile
        .deleteOrder(data)
        .then((res) => {
          if (res.status == 200) {
            this.sucessMsg(res.data.message);
            document.querySelector(".modal").click();
            this.getSingleOrders();
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    showModal(order) {
      this.supplierUUID = order.uuid;
    },
  },
  mounted() {
    this.getSingleOrders();
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
</style>
