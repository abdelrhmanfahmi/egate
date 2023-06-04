<template>
  <!-- shopping cart page  -->
  <div :class="$i18n.locale" class="shopping-cart-page">
    <div class="new-shopping-cart">
      <div class="row justify-content-between align-items-center my-4 mt-2">
        <div class="px-2">
          <h2 class="text-dark">{{ $t("profile.shoppingCart") }} ({{ cartLength }})</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div class="row justify-content-center align-items-center">
            <div class="col-md-6 col-sm-12">
              <h5>{{ $t("profile.shippingInfo") }}</h5>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="input-holder">
                <form @keyup.prevent="searchAddresses">
                  <!-- <span class="remove-search" role="button">x</span> -->
                  <!-- coupon input  -->

                  <input
                    type="text"
                    :placeholder="$t('profile.searchAddress')"
                    class="my-2 h-100 p-3 w-100 itemInput"
                    v-model="addressSearchText"
                  />
                  <b-button type="submit" class="login-button my-2 py-3 px-4 w-auto">
                    <!-- <span>{{ $t("cart.couponDiscount") }}</span> -->
                    <span>{{ $t("cart.search") }}</span>
                  </b-button>
                </form>
              </div>
            </div>
          </div>
          <div class="addresses-holder mt-5">
            <b-row v-if="loading" class="px-5">
              <b-col lg="3" sm="6" v-for="x in 10" :key="x">
                <b-skeleton-img></b-skeleton-img>
                <b-card>
                  <b-skeleton
                    animation="fade"
                    width="60%"
                    class="border-none"
                  ></b-skeleton>
                  <b-skeleton
                    animation="fade"
                    width="85%"
                    class="border-none"
                  ></b-skeleton>
                </b-card>
              </b-col>
            </b-row>
            <!-- data comes from backend  -->
            <VueSlickCarousel
              v-bind="settings"
              v-if="adresses && adresses.length && !addressLoading"
            >
              <div
                v-for="(address, index) in adresses"
                :key="index"
                class="slider-data"
                @click.prevent="selectMe(address)"
              >
                <div class="sign my-2 d-flex align-items-center">
                  <span
                    ><font-awesome-icon icon="fa-regular fa-circle-check" size="2x"
                  /></span>
                  <span class="h6 mx-2">Deliver To This Address</span>
                </div>
                <div class="address-data">
                  <div class="row mb-2">
                    <div class="col-md-6 col-sm-12" v-if="address.country">
                      <div>{{ $t("profile.country") }} : {{ address.country.title }}</div>
                    </div>
                    <div class="col-md-6 col-sm-12" v-if="address.region">
                      <div>{{ $t("profile.region") }} : {{ address.region.title }}</div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-md-6 col-sm-12" v-if="address.city">
                      <div>{{ $t("profile.city") }} : {{ address.city.title }}</div>
                    </div>
                    <div class="col-md-6 col-sm-12" v-if="address.block">
                      <div>{{ $t("profile.block_number") }} : {{ address.block }}</div>
                    </div>
                  </div>
                  <div class="row mb-2">
                    <div class="col-md-6 col-sm-12" v-if="address.street">
                      <div>
                        {{ $t("profile.newStreetNumber") }} : {{ address.street }}
                      </div>
                    </div>
                    <div class="col-md-6 col-sm-12" v-if="address.floor">
                      <div>{{ $t("profile.floor") }} : {{ address.floor }}</div>
                    </div>
                  </div>
                </div>
                <div class="edit-address" @click="editAdress(address)">
                  <font-awesome-icon icon="fa-solid fa-pen" size="2x" />
                </div>
              </div>
            </VueSlickCarousel>
            <div class="" v-if="addressLoading">
              <div class="text-center">
                <b-spinner variant="danger" label="Spinning"></b-spinner>
              </div>
            </div>
            <div
              class="d-flex justify-content-center align-items-center"
              v-if="adresses.length <= 0"
            >
              <h4 v-if="!addressLoading">{{ $t("profile.quotationsRatingsEmpty") }}</h4>
            </div>
          </div>
          <div class="add-new-address">
            <p class="add-address" @click="showForm = !showForm">
              <span>+ </span>{{ $t("profile.newAddress") }}
            </p>
            <form
              @submit.prevent="createAdress()"
              class="account-information-form"
              v-if="showForm"
            >
              <b-row class="justify-content-center">
                <!-- country  -->
                <b-col lg="12">
                  <b-form-group>
                    <label>{{ $t("profile.country") }}</label>
                    <span class="requried">*</span>
                    <b-form-select
                      v-model="addressesForm.country_id"
                      @input="getAllRegions"
                    >
                      <b-form-select-option
                        v-for="(country, index) in countries"
                        :key="index"
                        :value="country.id"
                        >{{ country.title }}
                      </b-form-select-option>
                    </b-form-select>
                    <div
                      class="error"
                      v-for="(error, index) in errors.country_id"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- regions -->
                <b-col lg="6">
                  <b-form-group>
                    <label>{{ $t("profile.region") }}</label>
                    <span class="requried">*</span>
                    <b-form-select
                      v-model="addressesForm.region_id"
                      :disabled="!addressesForm.country_id"
                      @input="getAllCities"
                    >
                      <b-form-select-option
                        v-for="(region, index) in regions"
                        :key="index"
                        :value="region.id"
                        >{{ region.title }}
                      </b-form-select-option>
                    </b-form-select>
                    <div
                      class="error"
                      v-for="(error, index) in errors.region_id"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- cities -->
                <b-col lg="6">
                  <b-form-group>
                    <label>{{ $t("profile.city") }}</label>
                    <span class="requried">*</span>
                    <b-form-select
                      v-model="addressesForm.city_id"
                      :disabled="!addressesForm.country_id || !addressesForm.region_id"
                    >
                      <b-form-select-option
                        v-for="(city, index) in cities"
                        :key="index"
                        :value="city.id"
                        >{{ city.title }}
                      </b-form-select-option>
                    </b-form-select>
                    <div
                      class="error"
                      v-for="(error, index) in errors.city_id"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- name in english (new add)-->
                <b-col lg="6" v-if="$i18n.locale == 'en'">
                  <b-form-group v-if="buyerUserData.type == 'buyer'">
                    <label>{{ $t("profile.name") }}</label>
                    <b-form-select v-model="addressesForm.name">
                      <b-form-select-option value="null" disabled
                        >{{ $t("profile.name") }}
                        <span class="requried text-danger">*</span>
                      </b-form-select-option>
                      <b-form-select-option
                        v-for="(formName, index) in en_B2B_formNames"
                        :key="index"
                        :value="formName"
                        >{{ formName }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                  <b-form-group v-else>
                    <label>{{ $t("profile.name") }}</label>
                    <span class="requried">*</span>
                    <b-form-select v-model="addressesForm.name">
                      <b-form-select-option
                        v-for="(formName, index) in en_formNames"
                        :key="index"
                        :value="formName"
                        >{{ formName }}
                      </b-form-select-option>
                    </b-form-select>
                    <div class="error" v-for="(error, index) in errors.name" :key="index">
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- name in arabic (new add)-->
                <b-col lg="6" v-else>
                  <b-form-group
                    v-if="buyerUserData.type == 'buyer' && arabicAvailable !== 'no'"
                  >
                    <label>{{ $t("profile.name") }}</label>
                    <b-form-select v-model="addressesForm.name">
                      <b-form-select-option value="null" disabled
                        >{{ $t("profile.name") }}
                        <span class="requried text-danger">*</span>
                      </b-form-select-option>
                      <b-form-select-option
                        v-for="(formName, index) in ar_B2B_formNames"
                        :key="index"
                        :value="formName"
                        >{{ formName }}
                      </b-form-select-option>
                    </b-form-select>
                  </b-form-group>
                  <b-form-group v-else>
                    <label>{{ $t("profile.name") }}</label>
                    <span class="requried">*</span>
                    <b-form-select v-model="addressesForm.name">
                      <b-form-select-option
                        v-for="(formName, index) in ar_formNames"
                        :key="index"
                        :value="formName"
                        >{{ formName }}
                      </b-form-select-option>
                    </b-form-select>
                    <div class="error" v-for="(error, index) in errors.name" :key="index">
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- address number -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="streetNumber">{{ $t("contactUs.address") }}</label>
                    <span class="requried">*</span>
                    <b-form-input
                      id="streetNumber"
                      v-model="addressesForm.address_line_1"
                    />
                    <div
                      class="error"
                      v-for="(error, index) in errors.address_line_1"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- block  -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="floor">{{ $t("profile.blockNumber") }}</label>
                    <span class="requried">*</span>
                    <b-form-input id="floor" v-model="addressesForm.block" />
                    <div
                      class="error"
                      v-for="(error, index) in errors.block"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- street  (new add)-->
                <b-col lg="6">
                  <b-form-group>
                    <label for="street">{{ $t("profile.newStreetNumber") }}</label>
                    <span class="requried">*</span>
                    <b-form-input id="street" v-model="addressesForm.street" />
                    <div
                      class="error"
                      v-for="(error, index) in errors.street"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- avenue (new add)  -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="floor">{{ $t("profile.avenue") }}</label>
                    <span class="requried">*</span>
                    <b-form-input id="floor" v-model="addressesForm.avenue" />
                    <div
                      class="error"
                      v-for="(error, index) in errors.avenue"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- home number  -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="homeNumber">{{ $t("profile.homeNumber") }}</label>
                    <!-- <span class="requried">*</span> -->
                    <b-form-input
                      id="homeNumber"
                      v-model="addressesForm.building_number"
                    />
                    <div
                      class="error"
                      v-for="(error, index) in errors.building_number"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>

                <!-- floor   -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="floor">{{ $t("profile.floor") }}</label>
                    <!-- <span class="requried">*</span> -->
                    <b-form-input id="floor" v-model="addressesForm.floor" />
                    <div
                      class="error"
                      v-for="(error, index) in errors.floor"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- old block number   -->
                <!-- <b-col lg="6">
                  <b-form-group>
                    <label for="blockNumber">{{ $t("profile.blockNumber") }}</label>
                    <span class="requried">*</span>
                    <b-form-input id="blockNumber" v-model="addressesForm.apartment" />
                    <div
                      class="error"
                      v-for="(error, index) in errors.apartment"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col> -->
                <!-- post code  -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="postCode">{{ $t("profile.zipCode") }}</label>
                    <span class="requried">*</span>
                    <b-form-input id="postCode" v-model="addressesForm.pin_code" />
                    <div
                      class="error"
                      v-for="(error, index) in errors.pin_code"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- note  -->
                <b-col lg="12">
                  <b-form-group>
                    <label for="textarea">{{ $t("profile.note") }}</label>
                    <b-form-textarea
                      id="textarea"
                      size="lg"
                      v-model="addressesForm.notes"
                    ></b-form-textarea>
                    <div
                      class="error"
                      v-for="(error, index) in errors.notes"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-button type="submit" class="login-button">
                {{ $t("register.submit") }}
              </b-button>
            </form>
            <form>
              <b-form-group>
                <!-- <label for="textarea">Additional Notes</label> -->
                <b-form-textarea
                  id="textarea"
                  v-model="addressesForm.additional_notes"
                  placeholder="Additional Notes"
                ></b-form-textarea>
                <div
                  class="error"
                  v-for="(error, index) in errors.additional_notes"
                  :key="index"
                >
                  {{ error }}
                </div>
              </b-form-group>
            </form>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="step2">
            <div class="" v-if="!loading">
              <div class="row">
                <div class="cart w-100">
                  <div class="cart-detail px-4 pt-0">
                    <div class="">
                      <div class="">
                        <!-- display all coasts data  -->

                        <div class="data">
                          <!-- start add coupon  -->
                          <div class="coupon-holder mb-3">
                            <h4 class="text-dark">
                              {{ $t("payment.haveCoupon") }}
                            </h4>
                            <div class="">
                              <div class="">
                                <div class="cart">
                                  <div class="cart-table">
                                    <div class="">
                                      <div class="input-holder">
                                        <form @submit.prevent="addCoupon">
                                          <!-- coupon input  -->

                                          <input
                                            type="text"
                                            :placeholder="$t('cart.addCoupon')"
                                            class="my-2 h-100 p-3 w-100 itemInput"
                                            v-model="couponText"
                                            :disabled="validCoupon"
                                          />
                                          <span
                                            :title="$t('cart.enableButton')"
                                            class="close"
                                            >x</span
                                          >
                                          <b-button
                                            type="submit"
                                            class="login-button my-2 py-3 px-4 w-auto"
                                            @click="addCoupon"
                                            :disabled="validCoupon"
                                          >
                                            <!-- <span>{{ $t("cart.couponDiscount") }}</span> -->
                                            <span>{{ $t("payment.Apply") }}</span>
                                          </b-button>
                                        </form>
                                      </div>

                                      <!-- button dosnt work if input is empty  -->
                                    </div>

                                    <!-- display coupon if valid  -->

                                    <h6 class="couponValid text-success m-0 p-0"></h6>
                                    <h6 class="couponNotValid text-danger m-0 p-0"></h6>

                                    <!-- display error if coupon is invalid  -->
                                    <div class="error text-center" v-if="couponError">
                                      {{ couponError }}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="valid-coupons text-center">
                                <h5
                                  v-if="coupons && coupons.length > 0"
                                  class="text-center"
                                >
                                  {{ $t("cart.validCoupons") }}
                                </h5>
                                <!-- list valid coupons  -->
                                <ul class="unstyled-order coupons-data-holder">
                                  <li v-for="(coupon, index) in coupons" :key="index">
                                    <span class="couponValue">{{ coupon.title }} </span>
                                    <span
                                      class="removeCoupon"
                                      @click="removeMyCoupon(coupon, index)"
                                      >x</span
                                    >
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <!-- end add coupon  -->
                          <table class="w-100">
                            <tbody>
                              <tr>
                                <th>{{ $t("profile.subTotal") }}</th>
                                <td
                                  v-if="cart_sub_total"
                                  :class="{
                                    'float-right': $i18n.locale == 'en',
                                    'float-left': $i18n.locale == 'ar',
                                  }"
                                >
                                  {{ cart_sub_total | fixedCurrency }}
                                  {{ currency }}
                                </td>
                              </tr>
                              <tr>
                                <th>{{ $t("cart.discount") }}</th>
                                <td
                                  v-if="totalDiscount !== null && cart_sub_total"
                                  :class="{
                                    'float-right': $i18n.locale == 'en',
                                    'float-left': $i18n.locale == 'ar',
                                  }"
                                >
                                  <span v-if="totalDiscountReplacement == 0">-</span>
                                  <span v-else>
                                    {{ totalDiscountReplacement | fixedCurrency }}
                                    {{ currency }}
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <th>{{ $t("cart.deleiveryFees") }}</th>
                                <td
                                  v-if="shippingCartFee !== null"
                                  :class="{
                                    'float-right': $i18n.locale == 'en',
                                    'float-left': $i18n.locale == 'ar',
                                  }"
                                >
                                  <span v-if="shippingCartFee == 0">-</span>
                                  <span v-else
                                    >{{ shippingCartFee | fixedCurrency }}
                                    {{ currency }}</span
                                  >
                                </td>
                              </tr>

                              <tr>
                                <th>
                                  <h4 class="main-color">
                                    {{ $t("cart.total") }}
                                  </h4>
                                </th>
                                <td
                                  v-if="totalPayment"
                                  :class="{
                                    'float-right': $i18n.locale == 'en',
                                    'float-left': $i18n.locale == 'ar',
                                  }"
                                >
                                  <h4 class="main-color">
                                    {{ totalPaymentReplacement | fixedCurrency }}
                                    {{ currency }}
                                  </h4>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!-- display payment methods  -->

                          <div class="">
                            <div class="payment w-100">
                              <div class="payment">
                                <div class="">
                                  <div class="content">
                                    <div class="payment-data">
                                      <div class="payment-method">
                                        <div class="heading mb-3">
                                          <span class="title"
                                            >{{
                                              $t("payment.choosePaymentMethod")
                                            }}:</span
                                          >
                                        </div>
                                        <div class="methods-data">
                                          <div class="methods">
                                            <!-- display when wallet amount equal or more than cart coast  -->
                                            <div
                                              class="method coupon"
                                              v-if="
                                                buyerUserData &&
                                                totalPaymentReplacement <= 0 &&
                                                couponMethodAvailable == true
                                              "
                                            >
                                              <div
                                                class="custom-control custom-radio custom-control-inline"
                                              >
                                                <input
                                                  type="radio"
                                                  id="paymentMethod0"
                                                  name="paymentMethod"
                                                  class="custom-control-input"
                                                  v-model="paymentFormData.payment_type"
                                                  value="coupon"
                                                />
                                                <label
                                                  class="custom-control-label"
                                                  for="paymentMethod0"
                                                >
                                                  {{ $t("cart.couponDiscount") }}
                                                  <sup>*</sup>
                                                </label>
                                              </div>
                                            </div>

                                            <!-- display when wallet amount equal or more than cart coast  -->
                                            <div
                                              class="method wallet"
                                              v-if="
                                                walletData > 0 &&
                                                buyerUserData &&
                                                walletData >= totalPaymentReplacement &&
                                                walletMethodAvailable == true
                                              "
                                            >
                                              <div
                                                class="custom-control custom-radio custom-control-inline"
                                              >
                                                <input
                                                  type="radio"
                                                  id="paymentMethod0"
                                                  name="paymentMethod"
                                                  class="custom-control-input"
                                                  v-model="paymentFormData.payment_type"
                                                  value="wallet"
                                                />
                                                <label
                                                  class="custom-control-label"
                                                  for="paymentMethod0"
                                                >
                                                  {{ $t("profile.wallet") }}
                                                  <sup>*</sup>
                                                </label>
                                                <span
                                                  >{{ walletData }} {{ currency }}</span
                                                >
                                              </div>
                                            </div>
                                            <!-- display when wallet less than cart coast  -->
                                            <div
                                              class="method wallet_visa"
                                              v-if="
                                                walletData > 0 &&
                                                buyerUserData &&
                                                walletData < totalPaymentReplacement &&
                                                walletVisaMethodAvailable == true
                                              "
                                            >
                                              <div
                                                class="custom-control custom-radio custom-control-inline"
                                              >
                                                <input
                                                  type="radio"
                                                  id="paymentMethod5"
                                                  name="paymentMethod"
                                                  class="custom-control-input"
                                                  v-model="paymentFormData.payment_type"
                                                  value="wallet_visa"
                                                />
                                                <label
                                                  class="custom-control-label"
                                                  for="paymentMethod5"
                                                >
                                                  {{ $t("profile.wallet") }}
                                                  <!-- {{ $t("profile.wallet_visa") }} -->
                                                  <sup>*</sup>
                                                </label>
                                                <span
                                                  >{{ walletData }} {{ currency }}</span
                                                >
                                                <p>
                                                  {{ $t("profile.remainKnet") }}
                                                </p>
                                              </div>
                                            </div>
                                            <!-- bank option  -->
                                            <div
                                              class="method bank"
                                              v-if="
                                                buyerUserData &&
                                                bankMethodAvailable == true
                                              "
                                            >
                                              <div
                                                class="custom-control custom-radio custom-control-inline"
                                              >
                                                <input
                                                  type="radio"
                                                  id="paymentMethod1"
                                                  v-b-modal.bankModal
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
                                                  <sup>*</sup>
                                                </label>
                                                <span>{{
                                                  $t("payment.paymentByBank")
                                                }}</span>
                                              </div>
                                              <p
                                                class="error text-center"
                                                v-if="
                                                  paymentFormData.payment_type ===
                                                    'bank' && paymentFormData.file == null
                                                "
                                              >
                                                {{ $t("profile.filePlaceHolder") }}
                                              </p>
                                              <div
                                                class="error text-center"
                                                v-for="(error, index) in errors.file"
                                                :key="index"
                                              >
                                                {{ error }}
                                              </div>
                                            </div>
                                            <!-- cach option  -->
                                            <div
                                              class="method cach"
                                              v-if="cachMethodAvailable == true"
                                            >
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
                                                  <sup>*</sup>
                                                </label>
                                                <span>{{
                                                  $t("payment.requestReceipt")
                                                }}</span>
                                              </div>
                                            </div>
                                            <!-- visa option ( online payment)  -->
                                            <div
                                              class="method visa row justify-content-between align-content-center"
                                              v-if="visaMethodAvailable == true"
                                            >
                                              <div class="col-md-8 col-xs-12">
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
                                                </div>
                                              </div>
                                              <div class="col-md-4 col-xs-12">
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
                                          <!-- if error in choose payment method or not choosed  -->
                                          <div
                                            class="error text-center"
                                            v-for="(error, index) in errors.payment_type"
                                            :key="index"
                                          >
                                            {{ error }}
                                          </div>

                                          <!-- terms and conditions  -->

                                          <b-form-checkbox
                                            v-model="paymentFormData.accept_terms"
                                            class="terms my-4 d-inline-block custom-input"
                                          >
                                            <span class="text-dark">
                                              {{ $t("payment.accept") }}
                                            </span>
                                          </b-form-checkbox>

                                          <a
                                            v-b-modal.terms&condation
                                            @click="$bvModal.show('modal-scoped')"
                                            class="text-decoration-underline text-dark"
                                          >
                                            {{ $t("payment.termsAndConditions") }}</a
                                          >
                                          <b-modal
                                            size="lg"
                                            id="modal-scoped"
                                            :title="condations.title"
                                          >
                                            <p v-html="condations.description"></p>
                                            <template #modal-footer="{ ok }">
                                              <b-button
                                                size="sm"
                                                variant="outline-success"
                                                @click="
                                                  ok();
                                                  acceptMyTerms();
                                                "
                                              >
                                                <h6 class="m-0">
                                                  <span class="mx-1">{{
                                                    $t("payment.accept")
                                                  }}</span>
                                                  <span class="mx-1">{{
                                                    $t("payment.termsAndConditions")
                                                  }}</span>
                                                </h6>
                                              </b-button>
                                            </template>
                                          </b-modal>
                                          <sup>*</sup>

                                          <!-- if terms and conditions not selected  -->

                                          <div
                                            class="error text-center"
                                            v-for="(error, index) in errors.accept_terms"
                                            :key="index"
                                          >
                                            {{ error }}
                                          </div>
                                          <!-- checkout button if user exist  -->
                                          <div class="checkout">
                                            <div class="submit" v-if="buyerUserData">
                                              <b-button
                                                type="submit"
                                                class="login-button bg-main"
                                                disabled
                                                v-if="checkoutSubmitted"
                                              >
                                                {{ $t("payment.checkout") }}
                                                ...
                                                <span>
                                                  <b-spinner
                                                    label="Spinning"
                                                    small
                                                  ></b-spinner>
                                                </span>
                                              </b-button>

                                              <b-button
                                                type="submit"
                                                class="login-button bg-main"
                                                @click="payment"
                                                :disabled="
                                                  paymentFormData.payment_type ===
                                                    'bank' && paymentFormData.file == null
                                                "
                                                v-else
                                              >
                                                {{ $t("payment.checkout") }}
                                              </b-button>
                                            </div>
                                            <!-- checkout button if user not exist (guest)  -->
                                            <div class="submit" v-else>
                                              <b-button
                                                type="submit"
                                                class="login-button bg-main"
                                                disabled
                                                v-if="checkoutSubmitted"
                                              >
                                                {{ $t("payment.checkout") }}
                                                ...
                                                <span>
                                                  <b-spinner
                                                    label="Spinning"
                                                    small
                                                  ></b-spinner>
                                                </span>
                                              </b-button>

                                              <b-button
                                                type="submit"
                                                class="login-button bg-main"
                                                @click="guestPayment"
                                                v-else
                                              >
                                                {{ $t("payment.checkout") }}
                                              </b-button>
                                            </div>

                                            <!-- login modal if want to login if guest  -->

                                            <transition name="modal">
                                              <div class="modal-mask" v-if="showModal">
                                                <login-modal @close="closeModal" />
                                              </div>
                                            </transition>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- this modal apper when bank payment method checked  -->
                          <b-modal id="bankModal" :title="$t('payment.uploadImage')">
                            <form class="bankData mb-5">
                              <div class="d-flex">
                                <p><b>IBan : </b></p>
                                <p
                                  class="iban"
                                  v-if="companyIban"
                                  v-html="companyIban.description"
                                ></p>
                              </div>
                              <div class="form-input mb-4">
                                <label for="bankImage">
                                  {{ $t("payment.uploadImage") }}
                                </label>
                                <b-form-group>
                                  <b-form-file
                                    size="lg"
                                    id="bankImage"
                                    @change="uploadBankImage"
                                    :placeholder="$t('profile.filePlaceHolder')"
                                    drop-placeholder="Drop file here..."
                                  >
                                  </b-form-file>
                                </b-form-group>
                              </div>
                            </form>
                          </b-modal>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- second : when page loading  -->

            <div
              class="d-flex justify-content-center align-items-center flex-column"
              v-else
            >
              <img src="@/assets/images/BeanLoading2.gif" alt="cart-image" class="w-25" />
            </div>
          </div>
        </div>
      </div>
      <div class="suppliers-table">
        <div class="" v-if="cartItems !== null">
          <!-- <h5 class="heading py-5 text-center">
            {{ $t("cart.purchaseCart") }}
          </h5> -->
          <div class="cart-table p-4" v-for="(supplier, index) in cartItems" :key="index">
            <div class="accordion" role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header header-tag="header" class="p-3 pb-0" role="tab">
                  <h5 class="name mb-0" v-b-toggle="`accordion-${index + 1}`">
                    {{ supplier.supplier_name }}
                  </h5>
                </b-card-header>
                <b-collapse
                  :id="`accordion-${index + 1}`"
                  visible
                  accordion="my-accordion"
                  role="tabpanel"
                >
                  <b-card-body>
                    <table class="table suppliers-table">
                      <thead>
                        <tr>
                          <th>{{ $t("profile.productImage") }}</th>
                          <!-- <th>{{ $t("cart.product") }}</th> -->
                          <th>{{ $t("profile.productName") }}</th>
                          <!-- <th>{{ $t("items.supplier") }}</th> -->
                          <th>{{ $t("cart.price") }}</th>
                          <th>{{ $t("cart.quantity") }}</th>
                          <th>{{ $t("cart.total") }}</th>
                          <th></th>
                        </tr>
                      </thead>
                      <!-- list suppliers in cart data  -->
                      <tbody class="supplier">
                        <tr
                          class="item-content text-center"
                          v-for="(item, index) in supplier.products.filter(
                            (item) => !item.basket_promotion_id
                          )"
                          :key="index"
                        >
                          <!-- product image and go to pproduct page with click  -->
                          <td class="">
                            <router-link
                              :to="{
                                path: '/details',
                                query: {
                                  id: `${item.product_supplier_id}`,
                                },
                              }"
                              class="thumb"
                            >
                              <img
                                :src="item.product_image"
                                :alt="item.product_name + ' image'"
                                class="product-image"
                              />
                            </router-link>
                          </td>
                          <!-- product name  and go to pproduct page with click  -->
                          <td>
                            <router-link
                              :to="{
                                path: '/details',
                                query: {
                                  id: `${item.product_supplier_id}`,
                                },
                              }"
                            >
                              {{ item.product_name }}
                            </router-link>
                          </td>
                          <!-- <td v-if="supplier.supplier_name">
                          {{supplier.supplier_name}}
                        </td> -->
                          <!-- if product price exist -->
                          <td v-if="item.price">
                            <p class="main-color">
                              <b> {{ item.price | fixedCurrency }} {{ currency }}</b>
                            </p>
                          </td>
                          <!-- if product price not exist -->
                          <td v-else>-</td>
                          <!-- counter to update product quantity -->
                          <td>
                            <Counter
                              :minimum="
                                item.min_order_quantity ? item.min_order_quantity : 1
                              "
                              :quantity="item.quantity"
                              v-if="!item.gift_promotion_id"
                              :product="item"
                              class="justify-content-center"
                              @changeTitle="ChangeQ($event)"
                            ></Counter>
                            <span v-else>{{ item.quantity }}</span>
                          </td>
                          <!-- product price * product quantity = total product price -->
                          <td v-if="item.product_sub_total">
                            {{ item.product_sub_total | fixedCurrency }}
                            {{ currency }}
                          </td>
                          <td v-else>-</td>

                          <!-- remove product from cart -->

                          <td>
                            <div
                              class="actions"
                              @click="removeFromCart(item)"
                              v-if="!item.gift_promotion_id"
                            >
                              <span class="action-icon">
                                <font-awesome-icon icon="fa-solid fa-xmark" size="xl" />
                              </span>
                            </div>
                            <div class="" v-else>
                              <img
                                src="@/assets/images/giftbox.png"
                                class="gift-product"
                                alt="gift-product"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr
                          class="item-content text-center"
                          v-for="item in supplier.products.filter(
                            (item) => item.basket_promotion_id
                          )"
                          :key="item.id"
                        >
                          <!-- product image and go to pproduct page with click  -->
                          <td>
                            <router-link
                              :to="{
                                path: '/basketOfferDetails',
                                query: {
                                  id: `${item.basket_promotion_id}`,
                                },
                              }"
                              class="thumb"
                            >
                              <img
                                :src="item.basket_image"
                                :alt="item.basket_name + ' image'"
                                class="product-image"
                              />
                            </router-link>
                          </td>
                          <!-- product name  and go to pproduct page with click  -->
                          <td>
                            <router-link
                              class="text-dark"
                              :to="{
                                path: '/basketOfferDetails',
                                query: {
                                  id: `${item.basket_promotion_id}`,
                                },
                              }"
                            >
                              <p>{{ item.basket_name }}</p>
                            </router-link>
                          </td>
                          <!-- if product price exist -->
                          <td v-if="item.price || item.price >= 0">
                            <p class="main-color">
                              <b>{{ item.price | fixedCurrency }} {{ currency }}</b>
                            </p>
                          </td>
                          <!-- if product price not exist -->
                          <td v-else>-</td>
                          <!-- counter to update product quantity -->
                          <td>
                            <BasketCounter
                              :minimum="1"
                              :quantity="item.quantity"
                              :product="item"
                              class="justify-content-center"
                              @changeTitle="ChangebasketQ($event)"
                            ></BasketCounter>
                          </td>
                          <!-- product price * product quantity = total product price -->
                          <td
                            v-if="item.product_sub_total || item.product_sub_total >= 0"
                          >
                            {{ item.product_sub_total | fixedCurrency }}
                            {{ currency }}
                          </td>
                          <td v-else>-</td>

                          <!-- remove product from cart -->

                          <td>
                            <div class="actions" @click="removebasketFromCart(item)">
                              <span class="action-icon">
                                <font-awesome-icon icon="fa-solid fa-xmark" size="xl" />
                              </span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <!-- select shipping or pick-up  -->
                          <td colspan="12" class="p-0 mt-0">
                            <div class="order-shipping">
                              <div :class="$i18n.locale">
                                <form
                                  @change="orderType(supplier.supplier_id)"
                                  class="d-flex align-items-start justify-content-start px-2 results-form flex-column"
                                >
                                  <!-- if select shipping  -->
                                  <p class="h5">choose your delivery method:</p>
                                  <label
                                    @click="shippingStore(supplier)"
                                    class="shipping-label mt-2"
                                  >
                                    <input
                                      @change="changeShipping($event)"
                                      @input="shippingStore(supplier)"
                                      type="radio"
                                      value="0"
                                      :name="'types-' + index"
                                      v-model="ratingNum[index].delivery_type"
                                      class="checkFirst"
                                      id="check"
                                    />
                                    <span class="mx-2 ml-0"
                                      >{{ $t("payment.delivery") }} :
                                      <b class="mx-2"
                                        ><b class="main-color">2.00 kwd</b> next day
                                        delivery
                                      </b></span
                                    >
                                  </label>
                                  <!-- if select pickup  -->
                                  <label class="shipping-label mt-2">
                                    <input
                                      @input="changePickup($event, supplier)"
                                      @click="changePickup($event, supplier)"
                                      type="radio"
                                      value="1"
                                      :name="'types-' + index"
                                      v-model="ratingNum[index].delivery_type"
                                    />
                                    <span class="mx-2">
                                      {{ $t("payment.pickup") }} :
                                      <b class="main-color mx-2">Pick-up location</b>
                                    </span>
                                  </label>
                                  <!-- if supplier has address in pickup  -->
                                  <b-form-select
                                    v-model="ratingNum[index].supplier_address_id"
                                    @input="selectAddressUUID"
                                    @change="selectType(supplier, index)"
                                    class="w-100 mt-2 supplierAddresses d-none"
                                    :class="{
                                      'text-danger':
                                        ratingNum[index].supplier_address_id === null,
                                      'text-dark d-block':
                                        ratingNum[index].supplier_address_id !== null,
                                    }"
                                  >
                                    <b-form-select-option selected disabled value="null"
                                      ><span>{{
                                        $t("cart.selectPickupAddress")
                                      }}</span></b-form-select-option
                                    >
                                    <b-form-select-option
                                      v-for="(
                                        address, index
                                      ) in supplier.supplier_addresses"
                                      :key="index"
                                      :value="address"
                                      >{{ address.country.title }} ,
                                      {{ address.region.title }} ,
                                      {{ address.city.title }}
                                    </b-form-select-option>
                                  </b-form-select>
                                  <!-- print result of picked address cost price  -->
                                  <span class="feedsResult m-0"></span>
                                  <h4 class="pickupNoData"></h4>
                                  <!-- <br /> -->

                                  <!-- list the available addresses to pickup for this supplier  -->
                                  <ul
                                    class="list-unstyled m-0 px-3"
                                    v-if="firstFees || deliverType == true"
                                  >
                                    <li v-for="(fee, index) in firstFees" :key="index">
                                      <h5
                                        v-if="index == supplier.supplier_id"
                                        class="feedsResultShipping mb-0"
                                        :value="fee.shipping_fee"
                                      >
                                        <span>{{ $t("profile.deleiveryFees") }}</span>
                                        <span>{{
                                          fee.shipping_fee | fixedCurrency
                                        }}</span>
                                        <span>{{ currency }}</span>
                                        <!-- <p v-if="fee.message">
                                          {{ fee.message }}
                                        </p> -->
                                      </h5>
                                    </li>
                                  </ul>
                                </form>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * shopping cart page
 * @displayName shopping cart page
 */

import suppliers from "@/services/suppliers";
import auth from "@/services/auth";
import profile from "@/services/profile";
import globalAxios from "@/services/global-axios";
import Counter from "@/components/global/Counter.vue";

import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { createdFormData } from "@/services/helpers.js";
import BasketCounter from "@/components/global/BasketCounter.vue";
export default {
  data() {
    return {
      fields: [
        {
          key: "image",
          label: "",
        },
        {
          key: "product",
          label: this.$t("profile.product"),
        },
        {
          key: "price",
          label: this.$t("profile.price"),
        },
        {
          key: "quantity",
          label: this.$t("profile.quantity"),
        },
        {
          key: "totalPrice",
          label: this.$t("profile.totalPrice"),
        },
        {
          key: "action",
          label: "",
        },
      ],
      addressFields: [
        {
          key: "apartment",
          label: this.$t("profile.apartment"),
        },
        {
          key: "building_number",
          label: this.$t("profile.block_number"),
        },
        {
          key: "floor",
          label: this.$t("profile.floor"),
        },
        {
          key: "apartment",
          label: this.$t("profile.apartment"),
        },
        {
          key: "address_line_1",
          label: this.$t("profile.streetNumber"),
        },
        {
          key: "city.title",
          label: this.$t("profile.city"),
        },
        {
          key: "region.title",
          label: this.$t("profile.region"),
        },
        {
          key: "country.title",
          label: this.$t("profile.country"),
        },
        {
          key: "pin_code",
          label: this.$t("profile.zipCode"),
        },
        {
          key: "actions",
          label: "",
        },
      ],
      items: [],
      cartItems: null,
      myQuantity: null,
      // data of new design

      // checkout data
      errors: {},
      addressSearchText: "",
      couponText: null,
      coupons: [],
      existCoupons: [],
      couponError: null,
      paymentFormData: {
        payment_type: null,
        accept_terms: false,
        file: null,
      },
      form: {
        country_id: null,
        region_id: null,
        city_id: null,
        building_number: null,
        floor: null,
        apartment: null,
        pin_code: "",
        notes: null,
        address_line_1: null,
      },
      condations: {},
      showModal: false,
      companyIban: null,
      loading: false,
      checkoutSubmitted: false,
      validCoupon: false,
      cachMethodAvailable: false,
      visaMethodAvailable: false,
      walletMethodAvailable: false,
      walletVisaMethodAvailable: false,
      bankMethodAvailable: false,
      couponMethodAvailable: false,
      walletData: null,
      shippingCartFee: null,
      totalFees: null,

      totalPaymentReplacement: null,
      totalDiscountReplacement: null,
      totalDiscount: null,
      cart_sub_total: null,
      totalPayment: null,
      deliverType: true,
      selectAddressShape: null,
      firstFees: null,
      ratingNum: [],
      // slider settings
      settings: {
        dots: false,
        infinite: false,
        arrows: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: false,
        centerMode: false,
        clickable: true,
        accessibility: true,
        draggable: true,
        focusOnSelect: true,

        responsive: [
          {
            breakpoint: 1191,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 820,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },

      // addresses data
      addressesForm: {
        country_id: "",
        region_id: "",
        city_id: "",
        building_number: "",
        floor: "",
        apartment: "",
        pin_code: "",
        notes: "",
        name: "",
        block: "",
        street: "",
        avenue: "",
        additional_notes: "",
      },
      countries: [],
      cities: [],
      regions: [],
      adresses: [],
      en_formNames: ["Office", "Home"],
      ar_formNames: ["المنزل", "المكتب"],
      en_B2B_formNames: ["Head office", "Ware house", "Retail shop"],
      ar_B2B_formNames: ["مدير المكتب", "مستودع", "محل بيع بالتجزئه"],
      showForm: false,
      addressLoading: false,
    };
  },
  components: {
    Counter,
    VueSlickCarousel,
    BasketCounter,
  },
  methods: {
    selectMe(address) {
      this.selectedAddress = address;
    },
    /**
     * edit Address function
     * @vuese
     */

    editAdress(row) {
      this.showForm = true;
      this.addressesForm.country_id = row.country_id;

      this.addressesForm = { ...row };

      profile.getAllRegions(this.addressesForm.country_id).then((res) => {
        this.regions = res.data.items;
        this.addressesForm.region_id = row.region.id;
      });

      profile.getAllCities(this.addressesForm.region_id).then((res) => {
        this.cities = res.data.items;
        this.addressesForm.city_id = row.city.id;
      });
    },
    /**
     * create Address function
     * @vuese
     */
    createAdress() {
      (this.form.is_sale_point = false),
        profile
          .createAdress(createdFormData(this.form))
          .then((res) => {
            this.sucessMsg(res.data.message);
            this.errors = {};
            this.getAllAdresses();
            this.showForm = false;
            this.form = {};
            // if (res.status == 200) {
            //   setTimeout(() => {
            //     // this.$router.replace('/profile/documents')
            //     this.$router.replace("/profile/documents");
            //   }, 500);
            // }
          })
          .catch((error) => {
            const err = Object.values(error)[2].data;
            this.errors = err.items;
            this.errMsg(err.message);
          });
    },

    // deleteAdress
    /**
     * delete Address function
     * @vuese
     */

    deleteAdress(row) {
      profile
        .deleteAdress(row.item.uuid)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.getAllAdresses();
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errMsg(err.message);
        });
    },
    /**
     * get All Adresses function
     * @vuese
     */
    getAllAdresses() {
      profile.getAllAdresses().then((res) => {
        this.adresses = res.data.items;
        for (let index = 0; index < res.data.items.length; index++) {
          const element = res.data.items[index];
          if (element.is_default == true) {
            this.selectedAddress = element;
          }
        }
      });
    },
    clearAll() {
      this.errors = {};
    },
    /**
     * get Cart Products function
     * @vuese
     */
    // getCartProducts() {
    //   this.loading = true;
    //   globalAxios.post(`cart`).then((res) => {
    //     this.cartItems = res.data.items.cart_items;
    //   });
    //   this.loading = false;
    // },
    /**
     * @vuese
     *   get cart data from backend
     */

    /**
     * @vuese
     *   Countires
     */
    getAllCountires() {
      auth.getAllCountires().then((res) => {
        this.countries = res.data.items;
      });
    },

    /**
     * @vuese
     *   getAllRegions
     */
    getAllRegions() {
      profile.getAllRegions(this.form.country_id).then((res) => {
        this.regions = res.data.items;
        this.form.region_id = null;
        this.form.city_id = null;
      });
    },

    /**
     * @vuese
     *  Cities
     */
    getAllCities() {
      profile.getAllCities(this.form.region_id).then((res) => {
        this.cities = res.data.items;
        this.form.city_id = null;
      });
    },

    getCartProducts() {
      globalAxios
        .post(`cart`)
        .then((res) => {
          if (res.data.items.length >= 0) {
            this.hasProducts = false;
          } else if (res.data.items.length) {
            this.hasProducts = true;
          }
          if (res.data.items.cart_items.length > 0) {
            this.hasProducts = true;
          }

          this.cartItems = res.data.items.cart_items.map((cartItem) => {
            return {
              ...cartItem,
              supplier_addresses: [],
            };
          });
          // setting cart data and cheeckout coasts data

          this.priceData = res.data.items;
          this.cart_sub_total = res.data.items.cart_sub_total;
          this.totalDiscount = res.data.items.cart_sub_total_disc.toFixed(3);
          this.totalPayment = res.data.items.cart_sub_total_after_disc;
          this.shippingCartFee = res.data.items.cart_total_shipping_fee;

          this.totalPaymentReplacement = this.totalPayment;
          this.totalDiscountReplacement = this.totalDiscount;
          this.ratingNum = res.data.items.cart_items.map(() => {
            return {
              delivery_type: "0",
              supplier_address_id: null,
            };
          });
        })
        .then(() => {
          if (this.buyerUserData) {
            // get shipping coast data
            let address_uuid = this.buyerUserData.address_uuid;
            this.getLoggedFirstShippingFees(address_uuid);
            var checkboxes = document.getElementsByClassName("checkFirst");
            for (let index = 0; index < checkboxes.length; index++) {
              const element = checkboxes[index];
              element.parentElement.click();
            }
          }
        });
    },
    /**
     * @vuese
     *  get shipping fee of supplier to user
     */
    getLoggedFirstShippingFees() {
      let address_uuid = localStorage.getItem("globalAddressUUID")
        ? localStorage.getItem("globalAddressUUID")
        : this.buyerUserData.uuid;
      suppliers
        .getFirstShippingFees(address_uuid)
        .then((res) => {
          // console.log("new", res);

          this.firstFees = res.data.items;
          this.sucessMsg(res.data.message);

          let arr = res.data.items;
          var size = Object.values(arr);
          // console.log("arr" , size);
          let myData = 0;
          for (let index = 0; index < size.length; index++) {
            const element = size[index].shipping_fee;
            // console.log(`element${index}`, element);
            myData += parseFloat(element);
          }

          // this.shippingCartFee = myData + 'reda';
          this.shippingCartFee = myData;
          this.totalPaymentReplacement += parseFloat(myData);
        })
        .catch((err) => {
          console.log(err);
          let error = Object.values(err)[2].data;
          this.errors = error.items;
          if (err.response.status !== 422) {
            this.errMsg(err.message);
          }
        });
    },
    /**
     * remove From Cart function
     * @vuese
     */
    removeFromCart(product) {
      this.$store.dispatch("cart/removeProductFromCart", {
        product: product,
      });
      this.loading = true;
      this.cartItems = null;
      setTimeout(() => {
        this.getCartProducts();
      }, 1000);
      setTimeout(() => {
        this.loading = false;
      }, 1200);
    },
    /**
     * Change Quantity function
     * @vuese
     */
    ChangeQ(myQuantity) {
      this.myQuantity = myQuantity;
      this.cartItems = null;
      setTimeout(() => {
        this.getCartProducts();
      }, 300);
    },
    searchAddresses() {
      this.addressLoading = true;
      let payload = {
        keyword: this.addressSearchText,
      };
      profile
        .searchAddresses(payload)
        .then((res) => {
          this.adresses = res.data.items;
        })
        .finally(() => {
          // this.addressSearchText = "";
          this.addressLoading = false;
        });
    },

    // methods of new design

    /**
     *  @vuese
     *   add new coupon
     */
    addCoupon() {
      // check if coupon exist and check if it's length > 1 (coupon not a blank)
      if (this.couponText && this.couponText.trim().length > 1) {
        this.validCoupon = true;

        if (this.coupons.length == 0) {
          let payload = {
            coupon: this.couponText,
          };

          suppliers
            .checkNewCoupon(payload)
            .then((res) => {
              // let coupons = [];

              // console.log(res.data.items.total_cart.total_discount);f
              if (res.status == 200) {
                this.existCoupons.push(this.couponText);
                this.coupons.unshift({
                  title: this.couponText,
                  value: res.data.items.total_cart.total_discount,
                });
                this.sucessMsg(res.data.message);
                this.couponText = null;
                this.couponError = null;
                // this.totalDiscountReplacement = res.data.items.total_cart.total_discount

                this.totalDiscount = res.data.items.total_cart.total_discount.toFixed(3);

                if (res.data.items.total_cart.total_discount == 0) {
                  this.totalDiscountReplacement = parseFloat(this.totalDiscount);
                  this.totalDiscountReplacement =
                    parseFloat(this.totalDiscountReplacement) +
                    parseFloat(res.data.items.total_cart.total_discount);
                } else {
                  if (this.totalDiscountReplacement == 0) {
                    this.totalDiscountReplacement = parseFloat(
                      res.data.items.total_cart.total_discount
                    ).toFixed(3);
                  } else {
                    this.totalDiscountReplacement =
                      parseFloat(this.totalDiscountReplacement) +
                      parseFloat(res.data.items.total_cart.total_discount);
                  }
                  this.totalPaymentReplacement =
                    parseFloat(this.totalPaymentReplacement) -
                    parseFloat(res.data.items.total_cart.total_discount);
                  if (this.totalPaymentReplacement < 0) {
                    this.totalPaymentReplacement = 0;
                  }
                }
              } else {
                this.validCoupon = false;
              }
            })
            .catch((error) => {
              this.validCoupon = false;
              if (error) {
                const err = Object.values(error)[2].data;
                this.errors = err.items;
                this.errMsg(err.message);
                this.couponError = err.message;
                if (err.code == 401) {
                  this.loginFirst();
                }
              }
            });
        } else {
          if (this.existCoupons.indexOf(this.couponText) > -1) {
            this.errMsg(this.$t("cart.couponExist"));
          } else {
            let payload = {
              coupon: this.couponText,
            };

            suppliers
              .checkNewCoupon(payload)
              .then((res) => {
                console.log("res", res);
                // let coupons = [];

                // console.log(res.data.items.total_cart.total_discount);
                if (res.status == 200) {
                  this.existCoupons.push(this.couponText);
                  this.coupons.unshift({
                    title: this.couponText,
                    value: res.data.items.total_cart.total_discount,
                  });

                  this.sucessMsg(res.data.message);
                  this.couponText = null;
                  this.couponError = null;

                  this.totalDiscount = res.data.items.total_cart.total_discount.toFixed(
                    3
                  );

                  if (res.data.items.total_cart.total_discount == 0) {
                    this.totalDiscountReplacement = parseFloat(this.totalDiscount);
                    this.totalPaymentReplacement = parseFloat(
                      this.totalDiscountReplacement
                    );
                  } else {
                    if (this.totalDiscountReplacement == 0) {
                      this.totalDiscountReplacement = parseFloat(
                        res.data.items.total_cart.total_discount
                      ).toFixed(3);
                    } else {
                      this.totalDiscountReplacement =
                        parseFloat(this.totalDiscountReplacement) +
                        parseFloat(res.data.items.total_cart.total_discount);
                    }
                    this.totalPaymentReplacement =
                      parseFloat(this.totalPaymentReplacement) -
                      parseFloat(res.data.items.total_cart.total_discount);
                    if (this.totalPaymentReplacement < 0) {
                      this.totalPaymentReplacement = 0;
                    }
                  }
                }
              })
              .catch((error) => {
                if (error) {
                  const err = Object.values(error)[2].data;
                  this.errors = err.items;
                  this.errMsg(err.message);
                  this.couponError = err.message;
                  if (err.code == 401) {
                    this.loginFirst();
                  }
                }
              });
          }
        }
      }
    },

    /**
     *  @vuese
     *   remove exist coupon
     */
    removeMyCoupon(coupon, index) {
      this.coupons.splice(index, 1);
      for (let index = 0; index < this.existCoupons.length; index++) {
        const element = this.existCoupons[index];

        if (element == coupon.title) {
          this.existCoupons.splice(index, 1);
        }
      }
      this.validCoupon = false;
      this.totalDiscountReplacement -= coupon.value;
      this.totalPaymentReplacement += coupon.value;
    },
    /**
     *  @vuese
     *   upload bank file when select bank payment method
     */
    uploadBankImage(event) {
      this.paymentFormData.file = event.target.files[0];
    },
    /**
     * @vuese
     *   get terms
     */
    getTerms() {
      auth.termsAndCondations().then((res) => {
        this.condations = res.data.items;
      });
    },
    checkPaymentAvailableTypes() {
      // cach test
      setTimeout(() => {
        let data = {
          payment_type: "cach",
        };
        suppliers
          .checPaymentAvailableTypes(data)
          .then((res) => {
            if (res.status == 200) {
              if (res.data.items.status == 1) {
                this.cachMethodAvailable = true;
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 50);
      // wallet test
      setTimeout(() => {
        let data = {
          payment_type: "wallet",
        };
        suppliers
          .checPaymentAvailableTypes(data)
          .then((res) => {
            if (res.status == 200) {
              if (res.data.items.status == 1) {
                this.walletMethodAvailable = true;
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 100);
      // visa test
      setTimeout(() => {
        let data = {
          payment_type: "visa",
        };
        suppliers
          .checPaymentAvailableTypes(data)
          .then((res) => {
            if (res.status == 200) {
              if (res.data.items.status == 1) {
                this.visaMethodAvailable = true;
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 150);
      // bank test
      setTimeout(() => {
        let data = {
          payment_type: "bank",
        };
        suppliers
          .checPaymentAvailableTypes(data)
          .then((res) => {
            if (res.status == 200) {
              if (res.data.items.status == 1) {
                this.bankMethodAvailable = true;
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 200);
      // wallet_visa test
      setTimeout(() => {
        let data = {
          payment_type: "wallet_visa",
        };
        suppliers
          .checPaymentAvailableTypes(data)
          .then((res) => {
            if (res.status == 200) {
              if (res.data.items.status == 1) {
                this.walletVisaMethodAvailable = true;
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 250);
      // coupon test
      setTimeout(() => {
        let data = {
          payment_type: "coupon",
        };
        suppliers
          .checPaymentAvailableTypes(data)
          .then((res) => {
            if (res.status == 200) {
              if (res.data.items.status == 1) {
                this.couponMethodAvailable = true;
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 250);
    },
    /**
     * @vuese
     *   get wallet data
     */
    getWallet() {
      profile
        .getWallet()
        .then((res) => {
          this.walletData = res.data.items.balance;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     * user payment
     */

    async payment() {
      this.paymentFormData.address_uuid = localStorage.getItem("globalAddressUUID");
      this.checkoutSubmitted = true;

      // check if data exist first
      if (
        this.paymentFormData.address_uuid == "" ||
        !this.paymentFormData.address_uuid ||
        this.paymentFormData.address_uuid == undefined
      ) {
        this.paymentFormData.address_uuid = localStorage.getItem("globalAddressUUID");
      }
      if (
        this.paymentFormData.address_uuid == "undefined" ||
        this.paymentFormData.address_uuid == "null" ||
        this.paymentFormData.address_uuid == null ||
        !localStorage.getItem("globalAddressUUID")
      ) {
        this.paymentFormData.address_uuid = this.buyerUserData.uuid;
      }

      this.paymentFormData.coupons = this.existCoupons;
      this.paymentFormData.country_code = this.buyerUserData.country_code;
      this.paymentFormData.first_name = this.buyerUserData.first_name;
      this.paymentFormData.last_name = this.buyerUserData.last_name;
      this.paymentFormData.phone = this.buyerUserData.phone;
      this.paymentFormData.email = this.buyerUserData.email;

      // this.paymentFormData = { ...this.selectedAddress };
      suppliers
        .payment(this.paymentFormData)
        .then((res) => {
          this.sucessMsg(res.data.message);
          // if user select visa or wallet + visa
          if (
            this.paymentFormData.payment_type === "visa" ||
            this.paymentFormData.payment_type === "wallet_visa"
          ) {
            setTimeout(() => {
              this.$router.push({
                path: "/visa-checkout-details",
                query: {
                  order_serial: res.data.items.order_serial,
                  date: res.data.items.order.created_at,
                  total_price: this.totalPaymentReplacement,
                  payment_type: res.data.items.order.payment_type,
                  payment: res.data.items.order.payment,
                  uuid: res.data.items.order.uuid,
                  redirectURL: res.data.items.url,
                  wallet_paied: res.data.items.wallet_paied,
                  visa_paied: res.data.items.visa_paied,

                  // window.location.href = res.data.items.url;
                },
              });
              // location.reload();
              this.$store.dispatch("cart/getCartProducts");
            }, 500);
          } else {
            this.$router.push({
              path: "/CodBanckCheckoutDetails",
              query: {
                orderId: res.data.items.id,
              },
            });
            this.$store.dispatch("cart/getCartProducts");
          }
        })
        .catch((err) => {
          // if error in ckeckout process
          const errors = Object.values(err)[2].data;
          this.errors = errors.items;
          let addressesErrors = errors.items;
          if (
            addressesErrors.country ||
            addressesErrors.city ||
            addressesErrors.governorate ||
            addressesErrors.address_line_1
          ) {
            this.goTop();
          }
          this.errMsg(errors.message);
        })
        .finally(() => {
          this.checkoutSubmitted = false;
        });
    },
    /**
     * @vuese
     *   change selected address and display the result of new address
     */
    changeAddress() {
      document.getElementsByClassName("feedsResult").innerHTML = "";

      var doc = document.querySelectorAll(".feedsResult");

      for (var i = 0; i < doc.length; i++) {
        if (doc[i].classList.contains("d-block")) {
          doc[i].classList.remove("d-block");
          doc[i].innerHTML = "";
        }
      }

      this.newForm = this.selectedAddress;

      localStorage.setItem("globalAddressUUID", this.selectedAddress.uuid);

      setTimeout(() => {
        let address_uuid = localStorage.getItem("globalAddressUUID");

        suppliers
          .getFirstShippingFees(address_uuid)
          .then((res) => {
            this.firstFees = res.data.items;
            this.sucessMsg(res.data.message);

            let arr = res.data.items;
            var size = Object.values(arr);

            let myData = 0;
            for (let index = 0; index < size.length; index++) {
              const element = size[index].shipping_fee;

              myData += parseFloat(element);
            }

            this.totalPaymentReplacement = this.totalPayment;

            this.shippingCartFee = myData;

            this.totalPaymentReplacement += parseFloat(myData);

            if (myData == 0) {
              this.totalPaymentReplacement = this.totalPayment;
            }

            if (this.totalDiscountReplacement == parseFloat(0)) {
              this.totalPaymentReplacement -= parseFloat(this.totalDiscountReplacement);
            }
          })
          .catch((err) => {
            console.log(err);
            let error = Object.values(err)[2].data;
            this.errors = error.items;
            this.errMsg(error.message);
          });
      }, 200);
    },

    /**
     * @vuese
     *   select address uuid to pass it to ckeckout data and setting coasts data
     */
    selectAddressUUID(myselectAddressUUID) {
      this.supplierAddress = myselectAddressUUID.uuid;
      this.address_uuid = myselectAddressUUID.uuid;
      localStorage.setItem("addressUUID", myselectAddressUUID.uuid);

      let newFee = this.selectedInput.parentElement.parentElement
        .querySelector(".feedsResultShipping")
        .getAttribute("value");

      this.shippingCartFee -= parseFloat(newFee);
      this.totalPaymentReplacement -= parseFloat(newFee);
    },
    /**
     * @vuese
     *   check terms as true
     */
    acceptMyTerms() {
      this.paymentFormData.accept_terms = true;
    },
    orderType(supplier) {
      localStorage.setItem("s_id", supplier);
      localStorage.setItem("type", this.ratingNum);

      if (this.ratingNum.includes("0")) {
        this.deliverType = true;
      } else {
        this.deliverType = false;
      }
    },
    /**
     * @vuese
     *  choose pickup
     */
    changePickup($event, supplier) {
      let input = $event.target;

      this.selectedInput = input;

      this.showBtnClicked = false;

      this.getSupplierAddress(supplier.supplier_id);

      this.selectedInput.parentElement.nextElementSibling.classList.remove("d-none");
      this.selectedInput.parentElement.nextElementSibling.classList.add("d-block");

      this.selectedInput.parentElement.parentElement
        .querySelector(".feedsResult")
        .classList.remove("d-none");
      this.selectedInput.parentElement.parentElement
        .querySelector(".feedsResult")
        .classList.add("d-block");

      this.selectedInput.parentElement.parentElement.querySelector(
        ".feedsResult"
      ).innerHTML = `${this.$t("profile.deleiveryFees")} 0.000 ${this.currency}`;

      let myControler = this.$store.state.suppliers.suppliers;
      for (let index = 0; index < myControler.length; index++) {
        const element = myControler[index].supplier;
        // console.log("element" , element.id);

        if (element.shipping_type == 0 && element.id == supplier.supplier_id) {
          element.shipping_type = 1;
          element.point_of_sell_uuid =
            localStorage.getItem("addressUUID") !== null ||
            localStorage.getItem("addressUUID") !== undefined
              ? localStorage.getItem("addressUUID")
              : null;
        } else if (element.shipping_type == 1 && element.id == supplier.supplier_id) {
          element.shipping_type = 0;
          element.point_of_sell_uuid = null;
        }
      }
    },
    /**
     * @vuese
     *    choose shipping
     */
    changeShipping($event) {
      let input = $event.target;

      this.selectedInput = input;

      this.showBtnClicked = true;

      this.selectedInput.parentElement.parentElement.querySelector(
        ".pickupNoData"
      ).innerHTML = "";

      this.expanded = true;

      let myResult = this.selectedInput.parentElement.parentElement.querySelector(
        ".feedsResult"
      );

      let myPickupData = this.selectedInput.parentElement.parentElement.querySelector(
        ".supplierAddresses"
      );

      myPickupData.classList.remove("d-block");
      myPickupData.classList.add("d-none");

      let data = {
        country: this.form.country_id,
        governorate: this.form.region_id,
        city: this.form.city_id,
        address_uuid: localStorage.getItem("globalAddressUUID"),
        supplier_id: localStorage.getItem("s_id"),
      };
      suppliers
        .getShippingFees(data)
        .then((res) => {
          // console.log("res" , res.data.items.shepping_fee);
          this.sucessMsg(res.data.message);

          myResult.innerHTML =
            this.$t("profile.deleiveryFees") +
            Number(res.data.items.shepping_fee).toFixed(3) +
            " " +
            this.currency;

          myResult.classList.remove("d-none");
          myResult.classList.add("d-block");

          if (res.data.items == [] || res.data.items == "") {
            myResult.innerHTML = this.$t("profile.deliveryFeesText");
          }

          this.errors = [];
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    /**
     * @vuese
     *   supplier addresses pickup addresses
     */
    getSupplierAddress(supplierId) {
      suppliers
        .getSupplierAddress(supplierId)
        .then((res) => {
          this.cartItems.forEach((item, index) => {
            if (item.supplier_id == supplierId)
              this.cartItems[index].supplier_addresses = res.data.items;
          });
          if (res.data.items.length == 0 || res.data.items == "") {
            this.availablePickup = false;

            this.selectedInput.parentElement.parentElement
              .querySelector(".supplierAddresses")
              .classList.remove("d-block");

            this.selectedInput.parentElement.parentElement
              .querySelector(".supplierAddresses")
              .classList.add("d-none");

            this.selectedInput.parentElement.parentElement
              .querySelector(".feedsResult")
              .classList.remove("d-block");

            this.selectedInput.parentElement.parentElement
              .querySelector(".feedsResult")
              .classList.add("d-none");

            this.selectedInput.parentElement.parentElement
              .querySelector(".pickupNoData")
              .classList.remove("d-none");
            this.selectedInput.parentElement.parentElement
              .querySelector(".pickupNoData")
              .classList.add("d-block");

            this.selectedInput.parentElement.parentElement.querySelector(
              ".pickupNoData"
            ).innerHTML = `${this.$t("profile.noPickupData")}`;

            if (
              this.selectedInput.parentElement.parentElement.querySelector(
                ".feedsResultShipping"
              )
            ) {
              this.selectedInput.parentElement.parentElement.querySelector(
                ".feedsResultShipping"
              ).innerHTML = ``;
            }
          } else {
            this.selectedInput.parentElement.parentElement.querySelector(
              ".feedsResultShipping"
            ).innerHTML = ``;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     *   select type (shipping or pickup ) and store it in store.js
     */
    selectType: function (supplier) {
      let newRating = {
        id: supplier.supplier_id,
        supplier_id: supplier.supplier_id,
        shipping_type: 1,
        coupon: supplier.coupon ? supplier.coupon : "",
        // point_of_sell_uuid: this.supplierAddress,
        point_of_sell_uuid:
          localStorage.getItem("addressUUID") !== null ||
          localStorage.getItem("addressUUID") !== undefined
            ? localStorage.getItem("addressUUID")
            : "",
      };
      this.$store.dispatch("suppliers/addSupplierToCart", {
        supplier: newRating,
      });
      this.checkSupplierFees(supplier);

      let myControler = this.$store.state.suppliers.suppliers;
      for (let index = 0; index < myControler.length; index++) {
        const element = myControler[index].supplier;

        if (element.shipping_type == 0 && element.id == supplier.supplier_id) {
          element.shipping_type = 1;
          element.point_of_sell_uuid =
            localStorage.getItem("addressUUID") !== null ||
            localStorage.getItem("addressUUID") !== undefined
              ? localStorage.getItem("addressUUID")
              : null;
        } else if (element.shipping_type == 1 && element.id == supplier.supplier_id) {
          element.shipping_type = 1;
          element.point_of_sell_uuid =
            localStorage.getItem("addressUUID") !== null ||
            localStorage.getItem("addressUUID") !== undefined
              ? localStorage.getItem("addressUUID")
              : null;
        }
      }
    },
    /**
     * @vuese
     *  check SupplierFees
     */
    checkSupplierFees(supplier) {
      let data = {
        address_uuid: localStorage.getItem("globalAddressUUID"),
        supplier_id: supplier.supplier_id,
      };
      suppliers
        .checkSupplierFees(data)
        .then((res) => {
          this.sucessMsg(res.data.message);
        })
        .catch((err) => {
          let error = Object.values(err)[2].data;
          this.errors = error.items;
          this.errMsg(err.message);
        });
    },
    /**
     * @vuese
     *  store shipping data to store.js
     */
    shippingStore(supplier) {
      let newRating = {
        id: supplier.supplier_id,
        supplier_id: supplier.supplier_id,
        shipping_type: 0,
        coupon: localStorage.getItem("cou") !== null ? localStorage.getItem("cou") : "",
        point_of_sell_uuid: null,
      };
      this.$store.dispatch("suppliers/addSupplierToCart", {
        supplier: newRating,
      });

      let myControler = this.$store.state.suppliers.suppliers;
      for (let index = 0; index < myControler.length; index++) {
        const element = myControler[index].supplier;

        if (element.shipping_type == 0 && element.id == supplier.supplier_id) {
          element.shipping_type = 0;
          element.point_of_sell_uuid = null;
        } else if (element.shipping_type == 1 && element.id == supplier.supplier_id) {
          element.shipping_type = 0;
          element.point_of_sell_uuid = null;
        }
      }
    },
    /**
     * @vuese
     *   change basket quantity  in table
     */
    ChangebasketQ(myQuantity) {
      if (myQuantity > 0) {
        this.myQuantity = myQuantity;
      }

      // this.cartItems = null;

      setTimeout(() => {
        this.getCartProducts();
        this.existCoupons = [];
        this.coupons = [];
        this.validCoupon = false;
      }, 100);
    },
    /**
     * @vuese
     *   remove basket product from cart
     */
    removebasketFromCart(product) {
      this.$store.dispatch("cart/removeProductFromCart", {
        product: product,
        basket_promotion_id: product.basket_promotion_id,
      });
      this.cartItems = null;
      setTimeout(() => {
        this.getCartProducts();
        this.paymentFormData.coupons = [];
        this.existCoupons = [];
        this.coupons = [];
        this.$store.dispatch("cart/getCartProducts");
      }, 1000);
    },
  },
  mounted() {
    /**
     * @vuese
     * setting user or guest country from stored country
     */

    let selectedCountry = localStorage.getItem("country");
    if (this.buyerUserData) {
      this.paymentFormData.country = this.buyerUserData.country_id;
      this.form.country_id = this.buyerUserData.country_id;
      this.getAllRegions();
    } else if (!this.buyerUserData && selectedCountry) {
      this.paymentFormData.country = JSON.parse(selectedCountry).id;
      this.form.country_id = JSON.parse(selectedCountry).id;
      this.getAllRegions();
    }

    localStorage.removeItem("s_id");
    localStorage.removeItem("cou");
    this.getCartProducts();
    this.getTerms();
    this.getWallet();
    this.checkPaymentAvailableTypes();
    this.getAllCountires();
    this.getAllAdresses();
    this.paymentFormData.suppliers = this.mySuppliers.suppliers;
  },
  computed: {
    /**
     *  @vuese
     * check newPrice
     */
    newPrice() {
      return this.total_cart;
    },

    freeDeliveryStatus() {
      return sessionStorage.setItem("freeDelivery", this.freeDelivery);
    },

    cartTest() {
      return this.$store.state.cart;
    },
    checkType() {
      return localStorage.getItem("type").includes("1");
    },
    /**
     *  @vuese
     * get suppliers function
     */
    mySuppliers() {
      return this.$store.state.suppliers;
    },
    cartLength() {
      return this.$store.getters["cart/cartLength"];
    },
  },
};
</script>
<style lang="scss" scoped>
.product-img {
  width: 4rem;
  height: 4rem;
  border-radius: 0.5rem;
}
.product-name {
  color: #312620;
  font-weight: 600;
  font-size: 12pt;
}
.actions {
  text-align: center;
  button {
    color: #000 !important;
    background-color: transparent !important;
    border: 0 !important;
  }
  svg {
    font-size: 1.2rem;
    margin: 0 5px;
    cursor: pointer;
  }
}
.table th,
.table td {
  border: none;
}
@media screen and (max-width: 767px) {
  table {
    text-align: center;
    tbody {
      tr {
        margin: 30px 0;
      }
    }
  }
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    position: absolute;
    width: 1px;
    padding: 0;
  }

  table td {
    display: block;
    font-size: 0.8rem;
    border-top: none !important;
  }
  .table-striped tbody tr:nth-of-type(odd) {
    margin: 30px 0;
    display: block;
  }
  .actions {
    justify-content: center;
    align-items: center;
  }
}

.input-holder {
  position: relative;
  button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 5px;
  }
}

/**
    * component style
  */
@import "~/src/assets/scss/_cartStyle.scss";

/**
    * other component style
  */
@media screen and (max-width: 767px) {
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    position: absolute;
    width: 1px;
    padding: 0;
  }

  table td {
    display: block;
    font-size: 0.8rem;
    border-top: none !important;
  }
}

// .float-right,
// .float-left {
//   line-height: 57px;
// }
.results-form {
  //background: rgba(236, 240, 241, 0.2);
}

.coupons-data-holder {
  span {
    background: #008000b3;
    padding: 2px 7px;
    text-align: center;
    font-size: 18px;
    word-break: break-all;
    margin-bottom: 3px;
    color: #fff;
    font-weight: bold;

    &:first-of-type {
      width: 50%;
    }
  }

  .removeCoupon {
    background: $main-color;
    color: #fff;
    cursor: pointer;
  }
}

.input-holder {
  position: relative;
  button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 5px;
  }
}
.remove-search {
  position: absolute;
}
.ar {
  .input-holder {
    button {
      left: 0;
      right: auto;
    }
    .remove-search {
      right: 0;
      left: auto;
    }
  }
}
.en {
  .input-holder {
    button {
      right: 0;
      left: auto;
    }
    .remove-search {
      right: auto;
      left: 0;
    }
  }
}
.product-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
}
table.suppliers-table {
  tbody {
    tr {
      background: #f5f5f5;
      border-bottom: 10px solid #fff;
      &:last-of-type {
        background: #fff;
      }
      td {
        a {
          color: #000;
          font-size: 16px;
        }
        .price {
          color: $main-color;
        }
      }
    }
  }
}
.add-address {
  font-size: 17px;
  color: #312620;
  //margin: 15px 0;
  transition: all 0.5s ease-in-out;
  width: 100%;
  //margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin: 20px 0;
  color: #ccc;
  cursor: pointer;
  &:hover {
    color: $main-color;
  }
  span {
    font-size: 23px;
    font-weight: 600;
  }
}
.slider-data {
  position: relative;
  .edit-address {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: $main-color;
    cursor: pointer;
  }
}
</style>
