<template>
  <div class="my-5">
    <div class="container">
      <div class="wrapper" v-if="!loading">
        <div class="my-4" v-if="orderData">
          <div class="d-flex justify-content-between align-items-center">
            <div class="order-back">
              <router-link to="/profile/ordersListsB2b">
                <b-button variant="outline-ordinary">
                  <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
                  {{ $t("profile.orderBack") }}
                </b-button>
              </router-link>
            </div>

            <div class="">
              <div>
                <b-button
                  v-if="
                    orderData.payment_status === 'Unpaid' &&
                    orderData.payment_type === 'visa'
                  "
                  id="show-btn"
                  @click="$bvModal.show('bv-modal-example')"
                  variant="outline-success"
                  class="m-2"
                >
                  {{ $t("profile.pay") }}
                </b-button>

                <router-link
                  v-if="
                    orderData.payment_status === 'Unpaid' &&
                    orderData.payment_type === 'bank'
                  "
                  :to="{
                    path: '/checkout-details',
                    query: {
                      order_serial: orderData.serial,
                      date: orderData.created_at,
                      total_price: orderData.total_price,
                      payment_type: orderData.payment_type,
                      payment: orderData.payment,
                      uuid: orderData.uuid,
                    },
                  }"
                  class="text-dark"
                >
                  <b-button variant="outline-success" class="m-2">
                    {{ $t("profile.bankTransDocs") }}
                  </b-button>
                </router-link>
              </div>
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
          <div class="serial" v-if="orderData">
            <h4 class="m-0">
              <span>{{ $t("profile.orderSerial") }} :</span>
              <span>{{ orderData.id }} #</span>
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
                    <div class="col-6 mail">
                      {{ orderData.client_info.email }}
                    </div>
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
            <div
              class="col-md-6 col-sm-12 mb-2"
              v-if="orderData && shipingExist"
            >
              <h4 class="data-holder">
                {{ $t("profile.addressInfo") }}
                <!-- <sub> ( {{ $t("profile.billingAddress") }} ) </sub> -->
              </h4>
              <div class="pl-2" v-if="orderData.client_info">
                <h6
                  class="d-inline-block"
                  v-if="orderData.client_info.apartment"
                >
                  {{ $t("profile.aptNo") }} :
                  {{ orderData.client_info.apartment }}
                </h6>
                <h6
                  class="d-inline-block"
                  v-if="orderData.client_info.building_number"
                >
                  , {{ $t("profile.buildingNo") }} :
                  {{ orderData.client_info.building_number }}
                </h6>
                <h6 class="d-inline-block" v-if="orderData.client_info.floor">
                  , {{ $t("profile.floor") }} :
                  {{ orderData.client_info.floor }}
                </h6>
                <h6
                  class="d-inline-block"
                  v-if="orderData.client_info.address_line_1"
                >
                  , {{ orderData.client_info.address_line_1 }} ,
                </h6>
                <h6
                  class="d-inline-block"
                  v-if="orderData.client_info.address_line_2"
                >
                  , {{ orderData.client_info.address_line_2 }}
                </h6>
                <h5 v-if="orderData.client_info.city">
                  {{ orderData.client_info.city }}
                </h5>
                <h5 v-if="orderData.client_info.governorate">
                  {{ orderData.client_info.governorate }}
                </h5>
                <h5 v-if="orderData.client_info.country">
                  {{ orderData.client_info.country }}
                </h5>
              </div>
            </div>
          </div>
        </section>

        <section class="supplier-info" v-if="orders && pickupExist">
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
                      {{ $t("payment.paymentStatus") }}
                    </div>
                    <div class="col-6" v-if="orderData.payment_status">
                      {{ orderData.payment_status }}
                    </div>
                  </div>

                  <div class="row info-data">
                    <div class="col-6">
                      {{ $t("profile.paymentType") }}
                    </div>
                    <div class="col-6" v-if="orderData.payment_type">
                      {{ orderData.payment }}
                    </div>
                  </div>
                  <div class="row info-data info-colored">
                    <div class="col-6">
                      {{ $t("profile.paymentCurency") }}
                    </div>
                    <div class="col-6">{{ $t("payment.priceUnit") }}</div>
                  </div>

                  <div
                    class="row info-data"
                    v-if="
                      orderData.payment_type === 'bank' &&
                      orderData.payment_image
                    "
                  >
                    <div class="col-6">
                      {{ $t("payment.bankTransImage") }}
                    </div>
                    <div class="col-6">
                      <div class="downloadArea">
                        <b-button
                          class="btn-block"
                          variant="outline-success"
                          @click="
                            downloadImage(
                              orderData.payment_image,
                              (extension = orderData.payment_image
                                .split('.')
                                .pop()),
                              $t('payment.bankImageDownload')
                            )
                          "
                        >
                          <i class="fa fa-download"></i>
                          {{ $t("payment.bankImageDownload") }}
                        </b-button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="row info-data info-colored"
                    v-if="
                      orderData.payment_type === 'bank' && orderData.comment
                    "
                  >
                    <div class="col-6">
                      {{ $t("payment.bankComment") }}
                    </div>
                    <div class="col-6">{{ orderData.comment }}</div>
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
          <div class="supplier-products-data">
            <div
              class="supplier-info mb-5"
              v-for="(order, index) in orders"
              :key="index"
            >
              <!-- {{order.order_status_no}} -->
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
                    {{ $t("profile.supplierOrder") }} : {{ order.serial }} |
                    {{ $t("payment.orderStatus") }} : {{ order.order_status }}
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <b-button
                  @click="
                    $bvModal.show('cancel_btn_modal');
                    showModal(order);
                  "
                  variant="outline-danger mt-2 cancel-btn"
                  v-if="
                    order.order_status_string === 'Pending' ||
                    order.order_status_string === 'Accepted'
                  "
                  ><font-awesome-icon icon="fa-solid fa-x" />
                  <span class="mx-2">{{
                    $t("payment.cancelOrder")
                  }}</span></b-button
                >
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
                          {{ ord.price | fixedCurrency }} {{ currency }}
                        </td>
                        <td v-if="ord.quantity">{{ ord.quantity }}</td>
                        <td v-if="ord.total_price">
                          {{ ord.total_price | fixedCurrency }} {{ currency }}
                        </td>
                        <td>
                          <!-- <button class="btn btn-outline-danger">
                            {{ $t("profile.return") }}
                          </button> -->
                          <!-- <b-button
                            @click="
                              $bvModal.show('cancel_btn_modal');
                              showModal(order);
                            "
                            variant="outline-danger mt-2 return-btn"
                            ><font-awesome-icon icon="fa-solid fa-x" />
                            <span class="mx-2">{{
                              $t("profile.return")
                            }}</span></b-button
                          > -->
                          <div
                            class=""
                            v-if="
                              order.order_status_string === 'Completed' ||
                              order.order_status_string === 'Delivered'
                            "
                          >
                            <b-button
                              @click="
                                $bvModal.show('return');
                                showModal(ord);
                              "
                              variant="outline-danger mt-2 return-btn"
                              v-if="
                                ord.status === 'Pending' &&
                                ord.return_time !== null &&
                                ord.return_time !== 0
                              "
                              ><font-awesome-icon icon="fa-solid fa-x" />
                              <span class="mx-2">{{
                                $t("profile.return")
                              }}</span></b-button
                            >
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <hr class="w-50 my-5 mx-auto" />
            </div>
            <b-modal id="return" centered hide-footer>
              <template #modal-title>
                <div class="d-flex justify-content-center align-items-center">
                  <span class="text-center"
                    >{{ $t("profile.returnReason") }}
                    <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" />
                  </span>
                </div>
              </template>
              <div class="d-block">
                <div class="">
                  <!-- <form>
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
                  </form> -->

                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="">
                      <router-link
                        :to="{
                          path: '/return-replace',
                          query: { orderId: supplierUUID },
                        }"
                      >
                        <b-button variant="outline-success" class="replace">
                          <span>{{ $t("profile.replace") }}</span>
                          <span class="mx-2">
                            <font-awesome-icon
                              icon="fa-solid fa-arrow-right-arrow-left"
                            />
                          </span>
                        </b-button>
                      </router-link>
                    </div>
                    <div class="">
                      <router-link
                        v-if="orderData"
                        :to="{
                          path: '/return-refund',
                          query: {
                            orderId: supplierUUID,
                            prodId: orderData.id,
                          },
                        }"
                        variant="outlin-danger"
                      >
                        <b-button variant="outline-danger" class="refund">
                          <span>{{ $t("profile.refund") }}</span>
                          <!-- <span class="fa-stack">
                            <i class="fa fa-dollar fa-stack-1x"></i>
                            <i class="fa fa-refresh fa-stack-2x"></i>
                          </span> -->
                          <span class="mx-2">
                            <!-- <img src="@/assets/images/refund.png" alt="" class="refund-image"> -->
                            <font-awesome-icon
                              icon="fa-solid fa-money-bill-wave"
                            />
                          </span>
                        </b-button>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <b-button
                class="mt-3"
                variant="outline-success"
                block
                @click="cancelOrder"
                >{{ $t("profile.send") }}</b-button
              > -->
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

        <b-modal centered id="bv-modal-example" hide-footer>
          <template class="text-center" #modal-title>
            <h3>{{ $t("payment.paymentData") }}</h3>
          </template>
          <div class="d-block text-center">
            <div class="payment-method">
              <!-- <div class="heading mb-4">
                <span class="title">{{ $t("payment.paymentData") }}</span>
              </div> -->
              <div class="methods-data">
                <div class="methods">
                  <div class="method">
                    <div
                      class="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        id="paymentMethod1"
                        name="paymentMethod"
                        class="custom-control-input"
                        v-model="paymentFormData.payment_type"
                        value="bank"
                      />
                      <label class="custom-control-label" for="paymentMethod1">
                        {{ $t("payment.bankTransfer") }}
                      </label>
                      <span>{{ $t("payment.paymentByBank") }}</span>
                    </div>
                  </div>
                  <div class="method">
                    <div
                      class="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        id="paymentMethod2"
                        name="paymentMethod"
                        class="custom-control-input"
                        v-model="paymentFormData.payment_type"
                        value="cach"
                      />
                      <label class="custom-control-label" for="paymentMethod2">
                        {{ $t("payment.paymentWhenReceiving") }}
                      </label>
                      <span>{{ $t("payment.requestReceipt") }}</span>
                    </div>
                  </div>
                  <div
                    class="method d-flex justify-content-between align-content-center"
                  >
                    <div
                      class="custom-control custom-radio custom-control-inline"
                    >
                      <input
                        type="radio"
                        id="paymentMethod3"
                        name="paymentMethod"
                        class="custom-control-input"
                        v-model="paymentFormData.payment_type"
                        value="visa"
                      />
                      <label class="custom-control-label" for="paymentMethod3">
                        {{ $t("payment.onlinePayment") }}
                      </label>
                      <div class="online-media">
                        <img src="@/assets/images/cart.png" alt="" srcset="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="error text-center"
                  v-for="(error, index) in errors.payment_type"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div>
            </div>
          </div>

          <b-button
            :disabled="paymentFormData.payment_type == null"
            id="show-btn"
            class="mt-3"
            variant="outline-success"
            block
            @click="rePay"
          >
            {{ $t("profile.pay") }}
          </b-button>
        </b-modal>
        <b-modal id="cancel_btn_modal" centered hide-footer>
          <template #modal-title>
            <div class="d-flex justify-content-center align-items-center">
              <span class="text-center"
                >{{ $t("profile.yourMessage") }}
                <!-- <font-awesome-icon icon="fa-solid fa-arrow-rotate-left" /> -->
              </span>
            </div>
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
                <b-button
                  :disabled="message == ''"
                  id="show-btn"
                  class="mt-3"
                  variant="outline-success"
                  block
                  @click="cancelOrder"
                >
                  {{ $t("profile.cancel") }}
                </b-button>
              </form>
            </div>
          </div>
        </b-modal>
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
      paymentFormData: {
        payment_type: null,
        order_uuid: null,
      },
      shipingExist: false,
      pickupExist:false
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
          // console.log("getSingleOrders", res);
          this.orders = res.data.items.suppliers;
          this.orderData = res.data.items.order;
          this.paymentFormData.order_uuid = res.data.items.order.uuid;
          let pickupArr = [];
          for (let index = 0; index < this.orders.length; index++) {
            const element = this.orders[index].bicked;
            pickupArr.push(element);
          }

          for (let index = 0; index < pickupArr.length; index++) {
            const element = pickupArr[index];
            // console.log(element == null);
            if (element == null) {
              console.log('shipping');
              this.shipingExist = true;
            }else{
              console.log('pickup');
              this.pickupExist = true;
            }
          }

          // if (pickupArr[0] == null) {
          //   this.shipingExist = true;
          // }
          // if (pickupArr[0] == null) {
          //   this.shipingExist = true;
          // }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cancelOrder() {
      // console.log(order);
      let data = {
        orderUUID: this.supplierUUID,
        payLoad: this.message,
      };
      profile
        .cancelOrder(data)
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
    rePay() {
      profile
        .rePay(this.paymentFormData)
        .then((res) => {
          // console.log(res);
          this.sucessMsg(res.data.message);
          if (res.status == 200) {
            if (this.paymentFormData.payment_type === "cach") {
              this.$router.push("/success-checkout");
            } else if (this.paymentFormData.payment_type === "bank") {
              this.$router.push({
                path: "/checkout-details",
                query: {
                  order_serial: res.data.items.order.order_serial,
                  date: res.data.items.order.created_at,
                  total_price: res.data.items.order.total_price,
                  payment_type: res.data.items.order.payment_type,
                  payment: res.data.items.order.payment,
                  uuid: res.data.items.order.uuid,
                  redirectURL: res.data.items.url,
                },
              });
            } else if (this.paymentFormData.payment_type === "visa") {
              setTimeout(() => {
                window.location.href = res.data.items.payment_url;
              }, 500);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          let error = Object.values(err)[2].data;
          this.errors = error.items;
          this.errMsg(error.message);
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
    showModal(ord) {
      // console.log(ord);
      this.supplierUUID = ord.uuid;
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
.replace {
  padding: 8px 30px;
  background: #303030;
  color: #fff;
  border: none;
  border-image-source: none;
  box-shadow: none;
}
.refund {
  padding: 8px 30px;
  background: $main-color;
  color: #fff;
  border: none;
  border-image-source: none;
  box-shadow: none;
}
.modal-header {
  position: relative !important;
  .close {
    position: absolute !important;
    right: 10px !important;
    top: 10px !important;
  }
}
.refund-image {
  width: 25px;
  height: 25px;
  margin: 0 5px;
}
</style>
