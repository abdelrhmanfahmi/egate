<template>
  <!-- single order details page  -->
  <div class="my-5 order-details">
    <div class="wrapper" v-if="id">
      <!-- normal view   -->
      <div class="container normaly">
        <div class="wrapper" v-if="!loading">
          <div class="my-4" v-if="orderData">
            <div class="d-flex justify-content-between align-items-center">
              <!-- <div class="order-back">
                  back to orders page 
                  <router-link to="/profile/ordersListsB2b">
                    <b-button variant="outline-ordinary">
                      <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
                      {{ $t("profile.orderBack") }}
                    </b-button>
                  </router-link>
                </div> -->

              <div class="">
                <div>
                  <!-- pay button will appear when Unpaid && visa  -->
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
                  <!-- got to checkout page if Unpaid && bank  -->
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
                      <font-awesome-icon icon="fa-solid fa-upload" />
                      {{ $t("profile.bankTransDocs") }}
                    </b-button>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="branding d-flex justify-content-center">
              <img
                :src="logoEnv"
                v-if="logoEnv"
                class="img-fluid w-25"
                alt="logo"
              />
              <img
                src="@/assets/images/logo.png"
                v-else
                class="img-fluid w-25"
                alt="logo"
              />
            </div>
          </div>
          <div
            class="data-holder serial-holder d-flex justify-content-between align-items-center"
          >
            <div class="serial" v-if="orderData">
              <h4 class="m-0">
                <!-- <span>{{ $t("profile.orderSerial") }} :</span> -->
                <!-- <span>{{ orderData.id }} #</span> -->
                <div class="order-back">
                  <!-- back to orders page  -->
                  <router-link to="/profile/ordersListsB2b">
                    <b-button variant="outline-ordinary">
                      <h4>
                        <font-awesome-icon icon="fa-solid fa-chevron-left" />
                        {{ $t("profile.orderSerial") }} : # {{ orderData.id }}
                      </h4>
                    </b-button>
                  </router-link>
                </div>
              </h4>
            </div>
            <div class="print" @click="printScreen">
              <font-awesome-icon icon="fa-solid fa-print" class="text-danger" />
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
                        <span v-if="buyerUserData === 'buyer'">
                          {{ orderData.client_info.company_name }}
                        </span>
                        <span v-else>
                          {{ orderData.client_info.first_name }}
                          {{ orderData.client_info.last_name }}
                        </span>
                      </div>
                    </div>
                    <div
                      class="row info-data"
                      v-if="orderData.client_info.email"
                    >
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
                </h4>
                <!-- client info details  -->
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
                    <div
                      class="row w-100"
                      v-if="order.supplier && order.bicked"
                    >
                      <div class="col-md-1 col-sm-6">
                        <span class="mb-2">{{ order.company }} : </span>
                      </div>

                      <!-- bicked data  -->

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
                    <div class="" v-else-if="!order.bicked && index == 0">
                      -
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="payment">
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
                        {{ orderData.payment_status_lang }}
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
                      <div class="col-6" v-if="orderData.payment_image">
                        <div class="row">
                          <div class="col-md-6 col-sm-12">
                            <a :href="orderData.payment_image" target="_blank">
                              <canvas
                                id="the-canvas"
                                class="custom-canvas"
                              ></canvas>
                            </a>
                          </div>
                        </div>
                        <div class="col-md-6 col-sm-12">
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
                      {{ $t("profile.supplierOrder") }} : {{ order.serial }} ,
                      {{ $t("payment.orderStatus") }} :
                      {{ order.order_status }} ,
                      {{ $t("payment.paymentStatus") }} :
                      {{ order.payment_status }}
                    </div>
                  </div>
                </div>
                <div
                  class="cancelReason supplier-data info-data info-colored data-holder mt-1 mb-0"
                  v-if="order.order_status_string === 'Cancelled'"
                >
                  <p class="text-danger px-3 mb-0">
                    <span> {{ $t("profile.cancelReason") }} : </span>
                    <span class="mx-2">
                      {{ order.supplier_cancel_reason }}
                    </span>
                  </p>
                </div>
                <div class="d-flex justify-content-end">
                  <b-button
                    @click="
                      $bvModal.show('cancel_btn_modal');
                      chooseSupplierUUID(order);
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
                  <div class="holder d-block">
                    <div
                      class=""
                      v-if="order.items.length || !order.baskets.length"
                    >
                      <!-- check all  -->
                      <div
                        class="d-flex align-items-center my-3 actions-holder"
                      >
                        <div class="" v-if="checkedOrder.length">
                          <span>
                            <input
                              type="checkbox"
                              class="myproject--checkbox"
                              v-model="checkAll"
                            />
                          </span>
                          <span class="h5 mx-2">{{
                            $t("profile.bulkAction")
                          }}</span>
                        </div>
                        <div
                          class="d-flex buttons-holder"
                          v-if="checkedOrder.length"
                        >
                          <button
                            class="border-main mx-2 p-2"
                            @click="$bvModal.show('bv-standingOrders')"
                          >
                            {{ $t("items.addStandingOrders") }} ({{
                              checkedOrder.length
                            }}) {{ $t("profile.items") }}
                          </button>

                          <button
                            class="border-main mx-2 p-2"
                            @click="goReturnPage('replace')"
                          >
                            {{ $t("profile.replace") }} ({{
                              checkedOrder.length
                            }})
                            {{ $t("profile.items") }}
                          </button>
                          <button
                            class="border-main mx-2 p-2"
                            @click="goReturnPage('refund')"
                          >
                            {{ $t("profile.refund") }} ({{
                              checkedOrder.length
                            }})
                            {{ $t("profile.items") }}
                          </button>
                        </div>
                      </div>

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
                            <td>
                              <div
                                class="d-flex justify-content-around align-items-center"
                                v-if="
                                  order.order_status_string === 'Completed' ||
                                  order.order_status_string === 'Delivered'
                                "
                              >
                                <div
                                  class=""
                                  v-if="
                                    ord.status === 'Pending' &&
                                    ord.return_time !== null &&
                                    ord.return_time !== 'null' &&
                                    ord.return_time !== 0
                                  "
                                >
                                  <input
                                    type="checkbox"
                                    class="myproject--checkbox"
                                    :value="ord.uuid"
                                    v-model="checkedOrder"
                                  />
                                </div>
                                <div class="noReturnPolicy" v-else>
                                  {{ $t("profile.noReturnPolicy") }}
                                </div>
                              </div>
                              <div class="noReturnPolicy" v-else>
                                {{ $t("profile.noReturnPolicy") }}
                              </div>
                            </td>
                            <td v-if="ord.items">
                              <span>{{ ord.items.product.title }}</span>
                              <span v-if="ord.gift_promotion_id"
                                ><sup
                                  ><img
                                    src="@/assets/images/giftbox.png"
                                    class="gift-product"
                                    alt="gift-product" /></sup
                              ></span>
                              <span v-if="ord.buy_get_promotion_id"
                                ><sup
                                  >({{ $t("profile.buyXgetYOffer") }})</sup
                                ></span
                              >
                            </td>
                            <td v-else>-</td>
                            <td v-if="ord.price">
                              {{ ord.price | fixedCurrency }} {{ currency }}
                            </td>
                            <td v-else>-</td>
                            <td v-if="ord.quantity">{{ ord.quantity }}</td>
                            <td v-else>-</td>
                            <td v-if="ord.discount">
                              {{ ord.discount | fixedCurrency }} {{ currency }}
                            </td>
                            <td v-else>-</td>
                            <td v-if="ord.total_price">
                              {{ ord.total_price | fixedCurrency }}
                              {{ currency }}
                            </td>
                            <td v-else>-</td>
                            <!-- <td>
                                return button will appera if order Completed || Delivered 
                                <div
                                  class=""
                                  v-if="
                                    order.order_status_string === 'Completed' ||
                                    order.order_status_string === 'Delivered'
                                  "
                                >
                                  button will appear if ord status pending && return_time !== null && !== 0 
                                  <b-button
                                    id="return-tolltip"
                                    @click="
                                      $bvModal.show('return');
                                      chooseSupplierUUID(ord);
                                    "
                                    variant="outline-danger mt-2 return-btn"
                                    v-if="
                                      ord.status === 'Pending' &&
                                      ord.return_time !== null &&
                                      ord.return_time !== 'null' &&
                                      ord.return_time !== 0
                                    "
                                    ><font-awesome-icon icon="fa-solid fa-x" />
                                    <span class="mx-2">{{
                                      $t("profile.return")
                                    }}</span></b-button
                                  >
                                  <b-tooltip
                                    target="return-tolltip"
                                    triggers="hover"
                                    v-if="ord.has_gift == 1"
                                  >
                                    {{ $t("singleProduct.returnGiftOrder") }}
                                  </b-tooltip>
                                </div>
                                <div class="" v-else>-</div>
                              </td> -->
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      v-if="order.baskets.length || !order.items.length"
                      class="my-3"
                    >
                      <!-- check all  -->
                      <div
                        class="d-flex align-items-center mb-3 mt-5 actions-holder"
                      >
                        <div class="" v-if="checkedBasketOrder.length">
                          <span>
                            <input
                              type="checkbox"
                              class="myproject--checkbox"
                              v-model="checkAllBaskets"
                            />
                          </span>
                          <span class="h5 mx-2">{{
                            $t("profile.bulkAction")
                          }}</span>
                        </div>
                        <div
                          class="d-flex buttons-holder"
                          v-if="checkedBasketOrder.length"
                        >
                          <button
                            class="border-main mx-2 p-2"
                            @click="$bvModal.show('bv-standingOrders')"
                          >
                            {{ $t("items.addStandingOrders") }} ({{
                              checkedBasketOrder.length
                            }}) {{ $t("profile.items") }}
                          </button>

                          <button
                            class="border-main mx-2 p-2"
                            @click="goReturnPageBaskets('replace')"
                          >
                            {{ $t("profile.replace") }} ({{
                              checkedBasketOrder.length
                            }})
                            {{ $t("profile.items") }}
                          </button>
                          <button
                            class="border-main mx-2 p-2"
                            @click="goReturnPageBaskets('refund')"
                          >
                            {{ $t("profile.refund") }} ({{
                              checkedBasketOrder.length
                            }})
                            {{ $t("profile.items") }}
                          </button>
                        </div>
                      </div>
                      <table class="table table-striped table-hover selectable">
                        <thead class="font-weight-bold">
                          <tr>
                            <th
                              scope="col"
                              class="text-center"
                              v-for="(tab, index) in basketfields"
                              :key="index"
                            >
                              <span>{{ tab.label }}</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody
                          v-for="(ord, index) in order.baskets"
                          :key="index"
                        >
                          <tr>
                            <td>
                              <div
                                class="d-flex justify-content-around align-items-center"
                                v-if="
                                  order.order_status_string === 'Completed' ||
                                  order.order_status_string === 'Delivered'
                                "
                              >
                                <div
                                  class=""
                                  v-if="
                                    ord.status === 'Pending' &&
                                    ord.return_time !== null &&
                                    ord.return_time !== 'null' &&
                                    ord.return_time !== 0
                                  "
                                >
                                  <input
                                    type="checkbox"
                                    class="myproject--checkbox"
                                    :value="ord.uuid"
                                    v-model="checkedBasketOrder"
                                  />
                                </div>
                                <div class="noReturnPolicy" v-else>
                                  {{ $t("profile.noReturnPolicy") }}
                                </div>
                              </div>
                              <div class="noReturnPolicy" v-else>
                                {{ $t("profile.noReturnPolicy") }}
                              </div>
                            </td>
                            <td v-if="ord.basket_promotion.title">
                              {{ ord.basket_promotion.title }}
                            </td>
                            <td v-else>-</td>
                            <td v-if="ord.price">
                              {{ ord.price | fixedCurrency }} {{ currency }}
                            </td>
                            <td v-else>-</td>
                            <td v-if="ord.quantity">{{ ord.quantity }}</td>
                            <td v-else>-</td>
                            <td v-if="ord.discount" class="discount">
                              {{ ord.discount | fixedCurrency }} {{ currency }}
                            </td>
                            <td v-else class="discount">-</td>
                            <td v-if="ord.total_price">
                              {{ ord.total_price | fixedCurrency }}
                              {{ currency }}
                            </td>
                            <td v-else>-</td>
                            <!-- <td>
                                return button will appera if order Completed || Delivered 
                                <div
                                  class=""
                                  v-if="
                                    order.order_status === 'Completed' ||
                                    order.order_status === 'Delivered'
                                  "
                                >
                                  button will appear if ord status pending && return_time !== null && !== 0 
                                  <b-button
                                    @click="
                                      $bvModal.show('return');
                                      chooseSupplierUUID(ord);
                                    "
                                    variant="outline-danger mt-2 return-btn"
                                    v-if="
                                      ord.status === 'Pending' &&
                                      ord.return_time !== null &&
                                      ord.return_time !== 'null' &&
                                      ord.return_time !== 0
                                    "
                                    ><font-awesome-icon icon="fa-solid fa-x" />
                                    <span class="mx-2">{{
                                      $t("profile.return")
                                    }}</span></b-button
                                  >
                                </div>
                                <div class="" v-else>-</div>
                              </td> -->
                          </tr>
                        </tbody>
                      </table>
                    </div>
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
                    <h5 class="text-center py-3" v-if="giftProduct == true">
                      {{ $t("singleProduct.returnGiftOrder") }}
                    </h5>
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
                            <span class="mx-2">
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

          <!-- repay modal  -->
          <b-modal centered id="bv-modal-example" hide-footer>
            <template class="text-center" #modal-title>
              <h3>{{ $t("payment.paymentData") }}</h3>
            </template>
            <div class="d-block text-center">
              <div class="payment-method">
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
                        <label
                          class="custom-control-label"
                          for="paymentMethod1"
                        >
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
                        <label
                          class="custom-control-label"
                          for="paymentMethod2"
                        >
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
                        <label
                          class="custom-control-label"
                          for="paymentMethod3"
                        >
                          {{ $t("payment.onlinePayment") }}
                        </label>
                        <div class="online-media">
                          <img
                            src="@/assets/images/cart.png"
                            alt=""
                            srcset=""
                          />
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
              v-if="!repayClicked"
              id="show-btn"
              class="mt-3"
              variant="outline-success"
              block
              @click="rePay"
            >
              {{ $t("profile.pay") }}
            </b-button>
            <b-button
              v-if="repayClicked"
              disabled
              id="show-btn"
              class="mt-3"
              variant="outline-success"
              block
            >
              <span>{{ $t("profile.pay") }}</span>
              <span>
                <b-spinner label="Spinning" small></b-spinner>
              </span>
            </b-button>
          </b-modal>
          <!-- cancel modal  -->
          <b-modal id="cancel_btn_modal" centered hide-footer>
            <template #modal-title>
              <div class="d-flex justify-content-center align-items-center">
                <span class="text-center"
                  >{{ $t("profile.cancelReason") }}
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
          <b-modal
            ref="standingOrdersModal"
            id="bv-standingOrders"
            size="xl"
            hide-footer
          >
            <template #modal-title>
              {{ $t("items.standingOrders") }}
            </template>
            <standing-orders :checkedItems="checkedOrder" />
          </b-modal>
        </div>
        <div class="" v-else>
          <div class="text-center">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
          </div>
        </div>
      </div>

      <!-- this div show only when printing  -->
      <!-- chang print data  -->
      <div class="container printing">
        <h4 class="title text-center my-5">{{ $t("profile.orderSug") }}</h4>
        <div class="wrapper">
          <div class="data bb">
            <div class="row">
              <div
                class="col-md-6 col-sm-12 p-20"
                :class="{ br: $i18n.locale == 'en', bl: $i18n.locale == 'ar' }"
              >
                <div class="branding d-flex justify-content-center">
                  <img
                    :src="logoEnv"
                    v-if="logoEnv"
                    class="img-fluid w-25"
                    alt="logo"
                  />
                  <img
                    src="@/assets/images/logo.png"
                    v-else
                    class="img-fluid w-25"
                    alt="logo"
                  />
                </div>
              </div>
              <div class="col-md-6 col-sm-12 p-20">
                <h5 class="mb-3"><b>Humhumm</b></h5>
                <div class="row" v-if="contactEmail">
                  <div class="col-md-3 col-sm-6">
                    <p>{{ $t("contactUs.formEmail") }} :</p>
                  </div>
                  <div class="col-md-9 col-sm-6">
                    <p v-html="contactEmail.description"></p>
                  </div>
                </div>
                <div class="row" v-if="contactPhone">
                  <div class="col-md-3 col-sm-6">
                    <p>{{ $t("contactUs.phone") }} :</p>
                  </div>
                  <div class="col-md-9 col-sm-6">
                    <p v-html="contactPhone.description"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="data bb">
            <div class="row">
              <div
                class="col-6"
                :class="{ br: $i18n.locale == 'en', bl: $i18n.locale == 'ar' }"
              >
                <div class="holder bor">
                  <!-- <p>Invoice # 1-000001319-1027</p> -->
                  <p v-if="orderData">
                    {{ $t("profile.OrderDate") }} :
                    {{ orderData.created_at | formatDate }}
                  </p>
                </div>
              </div>
              <div class="col-6">
                <div class="holder">
                  <p class="mb-0" v-if="orderData">
                    {{ $t("profile.orderSerial") }} : {{ orderData.id }} #
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="supplier-data">
            <div class="colored">
              <div
                class="data-for-loop bt"
                v-for="(order, index) in orders"
                :key="index"
              >
                <div class="bb">
                  <div class="row">
                    <div
                      class="col-6"
                      :class="{
                        br: $i18n.locale == 'en',
                        bl: $i18n.locale == 'ar',
                      }"
                    >
                      <div class="holder bor py-1">
                        <!-- <p>Invoice # 1-000001319-1027</p> -->
                        <h2>{{ $t("profile.supplier") }} :</h2>
                        <h5 class="my-2 data-heading">
                          <span> {{ order.company }}</span>
                          <!-- <span class="mx-5">{{ $t("profile.supplierOrder") }} :
                              {{ order.serial }}</span> -->
                        </h5>
                        <p v-if="order.address">{{ order.address }}</p>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="holder py-1">
                        <!-- <h5 class="" v-if="orderData">
                            {{ $t("profile.orderSerial") }} : {{ orderData.id }} #
                          </h5> -->
                        <h5>
                          {{ $t("profile.shippingMethod") }} :
                          {{ order.shipping_type }}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row data-headings bor">
                  <div class="col-md-6 col-sm-12 mb-2">
                    <h5 class="data-heading">
                      {{ $t("profile.productName") }}
                    </h5>
                  </div>
                  <div class="col-md-3 col-sm-12 mb-2">
                    <h5 class="data-heading">{{ $t("profile.qty") }}</h5>
                  </div>
                  <div class="col-md-3 col-sm-12 mb-2">
                    <h5 class="data-heading">{{ $t("profile.price") }}</h5>
                  </div>
                </div>

                <div
                  class="row holder-row bor mb-1"
                  v-for="(ord, index) in order.items"
                  :key="index"
                >
                  <div class="col-md-6 col-sm-12 py-1">
                    <div class="data-holder">
                      <h5 class="title">{{ ord.items.product.title }}</h5>
                      <h6
                        v-if="
                          (buyerUserData.type == 'b2b' &&
                            ord.items.product_details[0]) ||
                          (buyerUserData.type == 'buyer' &&
                            ord.items.product_details[0])
                        "
                      >
                        SKU : {{ ord.items.product_details[0].sku }}
                      </h6>
                      <h6
                        v-if="
                          (buyerUserData.type == 'b2c' &&
                            ord.items.product_details[1]) ||
                          (!buyerUserData && ord.items.product_details[1])
                        "
                      >
                        SKU : {{ ord.items.product_details[1].sku }}
                      </h6>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-12 py-1">
                    <div class="data-holder">
                      <h4 class="title">{{ ord.quantity }}</h4>
                    </div>
                  </div>
                  <div class="col-md-3 col-sm-12 py-1">
                    <div class="data-holder">
                      <h4 class="title">
                        {{ ord.price | fixedCurrency }} {{ currency }}
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="supplier-shipping-data pt-4 bor mb-1">
                  <div class="row">
                    <!-- <div class="col-md-6 col-sm-12 borderred-bottom"></div> -->
                    <div class="col-md-6 col-sm-12 offset-6">
                      <div
                        class="row borderred-bottom p-15"
                        v-if="
                          orderData.total_shipping_fee !== 0 ||
                          orderData.total_discount !== 0
                        "
                      >
                        <div class="col-md-6 col-sm-12">
                          <h5>{{ $t("profile.subTotal") }}</h5>
                        </div>
                        <div class="col-md-6 col-sm-12">
                          <h5>
                            KWD {{ orderData.sup_total_price | fixedCurrency }}
                          </h5>
                        </div>
                      </div>
                      <div
                        class="row borderred-bottom p-15"
                        v-if="orderData.total_shipping_fee > 0"
                      >
                        <div class="col-md-6 col-sm-12">
                          <h5>{{ $t("profile.total_shipping_fee") }}</h5>
                        </div>
                        <div class="col-md-6 col-sm-12">
                          <h5>
                            KWD
                            {{ orderData.total_shipping_fee | fixedCurrency }}
                          </h5>
                        </div>
                      </div>
                      <!-- <div class="row borderred-bottom p-15">
                        <div class="col-md-6 col-sm-12">
                          <h5>Tax</h5>
                        </div>
                        <div class="col-md-6 col-sm-12">
                          <h5>KWD0.250</h5>
                        </div>
                      </div> -->
                      <div
                        class="row borderred-bottom p-15"
                        v-if="orderData.total_discount > 0"
                      >
                        <div class="col-md-6 col-sm-12">
                          <h5>{{ $t("profile.totalDiscount") }}</h5>
                        </div>
                        <div class="col-md-6 col-sm-12">
                          <h5>
                            KWD {{ orderData.total_discount | fixedCurrency }}
                          </h5>
                        </div>
                      </div>
                      <div class="row p-15">
                        <div class="col-md-6 col-sm-12">
                          <h5>{{ $t("profile.total_price") }}</h5>
                        </div>
                        <div class="col-md-6 col-sm-12">
                          <h5>
                            KWD {{ orderData.total_price | fixedCurrency }}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <section class="item-order normaly printing-normal">
                <div class="row info">
                  <div class="col-12 p-0">
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
                            KWD
                            {{ orderData.total_shipping_fee | fixedCurrency }}
                          </div>
                        </div>

                        <!-- <div class="row info-data">
                    <div class="col-6">{{ $t("profile.total_commission") }}</div>
                    <div class="col-6" v-if="orderData">
                      KWD {{ orderData.total_commission }}
                    </div>
                  </div> -->
                        <div class="row info-data info-colored">
                          <div class="col-6">
                            {{ $t("profile.totalDiscount") }}
                          </div>
                          <div class="col-6" v-if="orderData">
                            KWD {{ orderData.total_discount | fixedCurrency }}
                          </div>
                        </div>
                        <div class="row info-data">
                          <div class="col-6">
                            {{ $t("profile.total_price") }}
                          </div>
                          <div class="col-6" v-if="orderData">
                            KWD {{ orderData.total_price | fixedCurrency }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div class="payment-data mt-2 p-2 pl-4">
                <div class="row">
                  <div class="col-md-6 col-sm-12">
                    <h4>
                      <b>{{ $t("profile.paymentType") }}</b>
                    </h4>
                    <h6 v-if="orderData">{{ orderData.payment }}</h6>
                  </div>
                  <!-- <div class="col-md-6 col-sm-12">
                      <h4>
                        <b>{{ $t("profile.shippingMethod") }}</b>
                      </h4>
                      <ul>
                        <div v-for="(supplier, index) in orders" :key="index" class="px-2">
                          <p>
                            <span>{{ supplier.company }}</span> -
                            <span>{{ supplier.shipping_type }}</span>
                          </p>
                        </div>
                      </ul>
                    </div> -->
                </div>
                <div class="bill mt-3">
                  <h4>
                    <b>{{ $t("profile.shippingInfo") }}</b>
                  </h4>
                  <!-- <h5>
                      <b>{{ $t("profile.billingInfo") }}</b>
                    </h5> -->
                  <div
                    class="col-md-6 col-sm-12 mb-2 px-1"
                    v-if="orderData && shipingExist"
                  >
                    <div class="d-flex" v-if="orderData.client_info">
                      <h6
                        class="d-inline-block mx-1"
                        v-if="orderData.client_info.apartment"
                      >
                        {{ $t("profile.aptNo") }} :
                        {{ orderData.client_info.apartment }} ,
                      </h6>
                      <h6
                        class="d-inline-block mx-1"
                        v-if="orderData.client_info.building_number"
                      >
                        {{ $t("profile.buildingNo") }} :
                        {{ orderData.client_info.building_number }} ,
                      </h6>
                      <h6
                        class="d-inline-block mx-1"
                        v-if="orderData.client_info.floor"
                      >
                        {{ $t("profile.floor") }} :
                        {{ orderData.client_info.floor }} ,
                      </h6>
                      <h6
                        class="d-inline-block mx-1"
                        v-if="orderData.client_info.address_line_1"
                      >
                        {{ orderData.client_info.address_line_1 }} ,
                      </h6>
                      <h6
                        class="d-inline-block mx-1"
                        v-if="orderData.client_info.address_line_2"
                      >
                        {{ orderData.client_info.address_line_2 }},
                      </h6>
                      <h5
                        class="d-inline-block mx-1"
                        v-if="orderData.client_info.city"
                      >
                        {{ orderData.client_info.city }},
                      </h5>
                      <h5
                        class="d-inline-block mx-1"
                        v-if="orderData.client_info.governorate"
                      >
                        {{ orderData.client_info.governorate }},
                      </h5>
                      <h5
                        class="d-inline-block mx-1"
                        v-if="orderData.client_info.country"
                      >
                        {{ orderData.client_info.country }}
                      </h5>
                    </div>
                    <div v-if="orderData.client_info">
                      <h6>
                        Mobile No. :{{ orderData.client_info.country_code
                        }}{{ orderData.client_info.phone }}
                      </h6>
                    </div>
                  </div>
                </div>
                <div
                  class="d-fex text-center justify-content-center align-items-center mt-5"
                >
                  <h4>Thank you for your order</h4>
                  <h3>
                    <b
                      >HumHum, Block 7 Building 19 street 67, Fahaheel Kuwait</b
                    >
                  </h3>
                </div>
              </div>
              <!-- <div class="social">
                  <div class="ml-auto footer-social">
                    <ul>
                      <li v-if="twitter">
                        <a :href="twitter.value" target="_blank">
                          <img src="@/assets/images/twitter.png" :alt="twitter.key" />
                        </a>
                      </li>
                      <li v-if="youtube">
                        <a :href="youtube.value" target="_blank">
                          <img src="@/assets/images/youtube.png" :alt="youtube.key" />
                        </a>
                      </li>
                      <li v-if="instagram">
                        <a :href="instagram.value" target="_blank">
                          <img src="@/assets/images/instagram.png" :alt="instagram.key" />
                        </a>
                      </li>
                      <li v-if="pinterest">
                        <a :href="pinterest.value" target="_blank">
                          <img src="@/assets/images/pinterest.png" :alt="pinterest.key" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrapper" v-else>
      <div class="text-center">
        <h2>{{ $t("home.noData") }}</h2>
      </div>
    </div>
  </div>
</template>
  
  <script>
/**
 * single order details page
 * @displayName single order details page
 */
import profile from "@/services/profile";
import axios from "axios";
import { renderFirstPage } from "@/plugins/pdfJs";
import StandingOrders from "@/components/global/standingOrders.vue";

export default {
  data() {
    return {
      fields: [
        {
          key: "#",
          label: "#",
        },
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
          key: "discount",
          label: this.$t("cart.discount"),
        },
        {
          key: "rowTotal",
          label: this.$t("profile.rowTotal"),
        },
        // {
        //   key: "",
        //   label: this.$t("profile.actions"),
        // },
      ],
      basketfields: [
        {
          key: "#",
          label: "#",
        },
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
          key: "discount",
          label: this.$t("cart.discount"),
        },
        {
          key: "rowTotal",
          label: this.$t("profile.rowTotal"),
        },
        // {
        //   key: "",
        //   label: this.$t("profile.actions"),
        // },
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
      pickupExist: false,
      twitter: null,
      youtube: null,
      instagram: null,
      pinterest: null,
      contactPhone: null,
      contactEmail: null,
      repayClicked: false,
      CanvasUrl: null,
      giftProduct: false,
      checkedOrder: [],
      checkedItemsToShow: [],
      checkedBasketOrder: [],
      checkedBasketItemsToShow: [],
    };
  },
  methods: {
    addChekedItem(order) {
      console.log("order", order);
    },
    goReturnPage(option) {
      let payload = {
        items: this.checkedOrder,
      };
      profile
        .storeCheckedOrders(payload)
        .then((res) => {
          if (option == "replace") {
            console.log(res);
            this.$router.push({
              path: "/return-replace",
              query: {
                orderId: this.checkedOrder,
              },
            });
          } else {
            this.$router.push({
              path: "/return-refund",
              query: {
                orderId: this.checkedOrder,
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goReturnPageBaskets(option) {
      let payload = {
        items: this.checkedBasketOrder,
      };
      profile
        .storeCheckedOrders(payload)
        .then((res) => {
          if (option == "replace") {
            console.log(res);
            this.$router.push({
              path: "/return-replace",
              query: {
                orderId: this.checkedBasketOrder,
              },
            });
          } else {
            this.$router.push({
              path: "/return-refund",
              query: {
                orderId: this.checkedBasketOrder,
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * print Screen function
     * @vuese
     */
    printScreen() {
      window.print();
    },
    /**
     * get Single Order function
     * @vuese
     */
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
              // console.log("shipping");
              this.shipingExist = true;
            } else {
              // console.log("pickup");
              this.pickupExist = true;
            }
          }
          this.CanvasUrl = res.data.items.order.payment_image;
          console.log("this.CanvasUrl", this.CanvasUrl);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
          setTimeout(() => {
            let canvas = document.getElementById("the-canvas");
            if (canvas && this.CanvasUrl) {
              renderFirstPage(canvas, this.CanvasUrl);
            }
          }, 2000);
        });
    },
    /**
     * cancel Order function
     * @vuese
     */
    cancelOrder() {
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
    /**
     * repay function
     * @vuese
     */
    rePay() {
      this.repayClicked = true;
      profile
        .rePay(this.paymentFormData)
        .then((res) => {
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
        })
        .finally(() => {
          this.repayClicked = false;
        });
    },
    /**
     * download Image function
     * @vuese
     */
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
    /**
     * chooseSupplierUUID function
     * @vuese
     */
    chooseSupplierUUID(ord) {
      if (ord.has_gift == 1) {
        this.giftProduct = true;
      } else {
        this.giftProduct = false;
      }
      this.supplierUUID = ord.uuid;
    },

    /**
     * footerTwitterLink function
     * @vuese
     */
    footerTwitterLink() {
      profile
        .footerTwitterLink()
        .then((res) => {
          // console.log(res);
          this.twitter = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * footerYoutubeLink function
     * @vuese
     */
    footerYoutubeLink() {
      profile
        .footerYoutubeLink()
        .then((res) => {
          // console.log(res);
          this.youtube = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * footerLinkedinLink function
     * @vuese
     */
    footerLinkedinLink() {
      profile
        .footerLinkedinLink()
        .then((res) => {
          // console.log(res);
          this.linkedin = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * footerInstagramLink function
     * @vuese
     */
    footerInstagramLink() {
      profile
        .footerInstagramLink()
        .then((res) => {
          // console.log(res);
          this.instagram = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * footerPinterestLink function
     * @vuese
     */
    footerPinterestLink() {
      profile
        .footerPinterestLink()
        .then((res) => {
          // console.log(res);
          this.pinterest = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * contact Us Phone function
     * @vuese
     */
    contactUsPhone() {
      profile
        .contactUsPhone()
        .then((res) => {
          // console.log(res);
          this.contactPhone = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * contact Us Email function
     * @vuese
     */
    contactUsEmail() {
      profile
        .contactUsEmail()
        .then((res) => {
          // console.log(res);
          this.contactEmail = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getSingleOrders();
    this.contactUsPhone();
    this.contactUsEmail();
    this.footerTwitterLink();
    this.footerYoutubeLink();
    this.footerInstagramLink();
    this.footerPinterestLink();
    if (!this.id) {
      this.$router.push("/404");
    }
  },
  computed: {
    checkAll: {
      get: function () {
        return this.orders
          ? this.checkedOrder.length == this.orders.length
          : false;
      },
      set: function (value) {
        var checkedOrder = [];
        var checkedItemsToShow = [];
        if (value) {
          this.orders.forEach(function (order) {
            let smallOrder = order.items;
            smallOrder.forEach(function (ord) {
              if (
                ord.status === "Pending" &&
                ord.return_time !== null &&
                ord.return_time !== "null" &&
                ord.return_time !== 0
              ) {
                checkedOrder.push(ord.uuid);
                checkedItemsToShow.push(ord.items);
              }
            });
          });
        }
        this.checkedOrder = checkedOrder;
        this.checkedItemsToShow = checkedItemsToShow;
      },
    },
    checkAllBaskets: {
      get: function () {
        return this.baskets
          ? this.checkedBasketOrder.length == this.baskets.length
          : false;
      },
      set: function (value) {
        var checkedBasketOrder = [];
        var checkedBasketItemsToShow = [];
        if (value) {
          this.baskets.forEach(function (order) {
            let smallOrder = order.items;
            smallOrder.forEach(function (ord) {
              if (
                ord.status === "Pending" &&
                ord.return_time !== null &&
                ord.return_time !== "null" &&
                ord.return_time !== 0
              ) {
                checkedBasketOrder.push(ord.uuid);
                checkedBasketItemsToShow.push(ord.items);
              }
            });
          });
        }
        this.checkedBasketOrder = checkedBasketOrder;
        this.checkedBasketItemsToShow = checkedBasketItemsToShow;
      },
    },
  },
  components: {
    StandingOrders,
  },
};
</script>
  
  <style lang="scss" scoped>
/*
  * Prefixed by https://autoprefixer.github.io
  * PostCSS: v8.4.14,
  * Autoprefixer: v10.4.7
  * Browsers: last 4 version
  */

.normaly {
  .supplier-products-data {
    border: 2px solid $gray;
    padding: 20px;
    border-radius: 10px;
  }
  .serial-holder {
    font-size: 20px;
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    //padding: 20px;
    font-size: 20px;
  }

  .supplier-data {
    padding: 20px;
  }

  .modal-content {
    display: none !important;
  }

  .modal-header {
    -ms-flex-line-pack: center !important;
    align-content: center !important;
    -webkit-box-pack: center !important;
    -ms-flex-pack: center !important;
    justify-content: center !important;
  }

  .branding {
    display: none !important;
  }

  .replace {
    padding: 8px 30px;
    background: #303030;
    color: #fff;
    border: none;
    border-image-source: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .refund {
    padding: 8px 30px;
    background: $main-color;
    color: #fff;
    border: none;
    border-image-source: none;
    -webkit-box-shadow: none;
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
      -moz-border: 1px dashed #cfd0d0;

      .method {
        padding: 1rem;
        border-bottom: 1px dashed #cfd0d0;
        -moz-border-bottom: 1px dashed #cfd0d0;
        font-size: 11pt;
        color: #544842;

        .custom-radio {
          -ms-flex-wrap: wrap;
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
            -o-object-fit: contain;
            object-fit: contain;
          }
        }
      }
    }
  }
}

.printing {
  color: #000 !important;

  display: none;

  .wrapper {
    border: 1px solid #000;
    -moz-border: 1px solid #000;

    .bor {
      padding: 5px 20px;
    }

    // .supplier-data {
    //   background: #f7f7f7;
    // }
  }

  .p-15 {
    padding: 0px;
  }

  .p-20 {
    padding: 20px;
  }

  .br {
    border-right: 1px solid #000;
    -moz-border-right: 1px solid #000;
  }

  .bl {
    border-left: 1px solid #000;
    -moz-border-left: 1px solid #000;
  }

  .bb {
    border-bottom: 1px solid #000;
    -moz-border-bottom: 1px solid #000;
  }

  .bt {
    border-top: 1px solid #000;
    -moz-border-top: 1px solid #000;
  }

  p {
    color: #000;
    font-weight: bold;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .data-heading {
    font-weight: bold;
    // margin-bottom: 25px;
  }

  .data-headings {
    .data-heading {
      padding: 10px 0;
    }
  }

  .holder-row {
    background: #fff;
    border-bottom: 2px solid #ccc;
    -moz-border-bottom: 2px solid #ccc;
    width: 100%;
    margin: auto;
    overflow: hidden;
  }

  .borderred-bottom {
    border-bottom: 2px solid #ccc;
    -moz-border-bottom: 2px solid #ccc;
  }

  .footer-social ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .footer-social ul li {
    margin: 0 9px;
  }

  .data-headings {
    overflow: hidden;
    width: 100%;
    margin: auto;
    margin: 0;
    padding: 0;
    background: #ccc;
  }

  .printing-normal {
    .info {
      width: 100%;
      margin: 0;
    }

    .info-colored,
    .info-colored + div {
      background: #ccc;
    }

    .info-data {
      margin: 2px 0;
    }
  }
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
    display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
  }

  .normaly {
    display: none;
  }

  .printing-normal {
    display: block;
  }

  .printing {
    display: block;
  }
}

.cancelReason {
  background: #ff000042 !important;
}

textarea {
  -webkit-transition: al 0.5s ease-in-out;
  -o-transition: al 0.5s ease-in-out;
  transition: al 0.5s ease-in-out;
  resize: none;
}

#the-canvas {
  height: 100px !important;
  border: 2px dashed #c9c6c6;
}
.actions-holder,
.buttons-holder {
  font-size: 17px;
}
@media (max-width: 992px) {
  .actions-holder,
  .buttons-holder {
    flex-direction: column;
  }
  .buttons-holder {
    a {
      margin: 10px 0;
    }
  }
}
.noReturnPolicy {
  word-break: normal !important;
}
</style>
  