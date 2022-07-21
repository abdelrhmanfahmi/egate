<template>
  <div>
    <div :class="$i18n.locale" v-if="hasProducts">
      <div class="" v-if="!loading">
        <div class="row">
          <div class="col-12 order-shipping">
            <div :class="$i18n.locale">
              <div class="shipping-holder">
                <div class="container">
                  <!-- <b-button
                variant="outline-info"
                v-if="!showBtnClicked"
                @click="toggleOptionsSelect"
              >
                {{ $t("payment.selectOption") }}
              </b-button> -->

                  <div class="row">
                    <div class="col-12">
                      <h3 class="font-weight-bold">
                        {{ $t("payment.delivery") }}
                        <!--  / {{ $t("payment.pickup") }} -->
                      </h3>
                      <div class="addresses-holder p-5">
                        <div class="addresses">
                          <form>
                            <label>
                              <input
                                type="radio"
                                value="newAddress"
                                name="radio"
                                v-model="selectAddressShape"
                                class="GuestNewAddress"
                              />
                              <span>{{ $t("profile.newAddress") }}</span>
                            </label>
                            <label v-if="buyerUserData">
                              <input
                                type="radio"
                                value="existingAddresses"
                                name="radio"
                                v-model="selectAddressShape"
                                class="existingAddresses"
                              />
                              <span>{{ $t("payment.selectExist") }}</span>
                            </label>
                            <span
                              v-if="selectAddressShape === 'existingAddresses'"
                            >
                              <b-form-select
                                v-model="selectedAddress"
                                class="pickupAddresses"
                                @change="changeAddress"
                              >
                                <b-form-select-option
                                  selected
                                  disabled
                                  value="null"
                                  >{{
                                    $t("payment.selectExist")
                                  }}</b-form-select-option
                                >

                                <b-form-select-option
                                  v-for="(address, index) in addresses"
                                  :key="index"
                                  :value="address"
                                >
                                  <span class="mb-2" v-if="address.apartment"
                                    >{{ address.apartment }} ,</span
                                  >
                                  <span class="mb-2" v-if="address.floor"
                                    >{{ address.floor }} ,</span
                                  >
                                  <span
                                    class="mb-2"
                                    v-if="address.address_line1"
                                    >{{ address.address_line1 }} ,</span
                                  >
                                  <span
                                    class="mb-2"
                                    v-if="address.address_line2"
                                    >{{ address.address_line2 }} ,</span
                                  >

                                  <span class="mb-2" v-if="address.city"
                                    >{{ address.city.title }} ,</span
                                  >
                                  <span class="mb-2" v-if="address.region"
                                    >{{ address.region.title }} ,</span
                                  >

                                  <span class="mb-2" v-if="address.country">{{
                                    address.country.title
                                  }}</span>
                                </b-form-select-option>
                              </b-form-select>
                            </span>
                          </form>
                        </div>
                        <div class="addressShape" v-if="expanded">
                          <div
                            class="newAddress mt-5"
                            v-if="selectAddressShape === 'newAddress'"
                          >
                            <form class="account-information-form">
                              <b-row class="justify-content-center">
                                <!-- country  -->
                                <b-col lg="4">
                                  <b-form-group>
                                    <!-- <label>{{ $t("profile.country") }}</label> -->
                                    <b-form-select
                                      v-model="form.country_id"
                                      @input="getAllRegions"
                                    >
                                      <b-form-select-option
                                        value="null"
                                        disabled
                                        >{{ $t("profile.country") }}
                                        <span class="requried text-danger"
                                          >*</span
                                        >
                                      </b-form-select-option>
                                      <b-form-select-option
                                        v-for="(country, index) in countries"
                                        :key="index"
                                        :value="country.id"
                                        >{{ country.title }}
                                      </b-form-select-option>
                                    </b-form-select>
                                    <div
                                      class="error"
                                      v-for="(
                                        error, index
                                      ) in errors.country_id"
                                      :key="index"
                                    >
                                      {{ error }}
                                    </div>

                                    <div
                                      class="error"
                                      v-for="(error, index) in errors.country"
                                      :key="index"
                                    >
                                      {{ error }}
                                    </div>
                                    <div
                                      class="error"
                                      v-if="
                                        localClicked && form.country_id == null
                                      "
                                    >
                                      {{ $t("payment.CountryRequired") }}
                                    </div>
                                  </b-form-group>
                                </b-col>
                                <!-- regions -->
                                <b-col lg="4">
                                  <b-form-group>
                                    <!-- <label>{{ $t("profile.region") }}</label>
                        <span class="requried">*</span> -->
                                    <b-form-select
                                      v-model="form.region_id"
                                      :disabled="!form.country_id"
                                      @input="getAllCities"
                                    >
                                      <b-form-select-option
                                        value="null"
                                        disabled
                                        >{{ $t("profile.region") }}
                                        <span class="requried text-danger"
                                          >*</span
                                        >
                                      </b-form-select-option>
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

                                    <div
                                      class="error"
                                      v-if="
                                        localClicked && form.region_id == null
                                      "
                                    >
                                      {{ $t("payment.RegionRequired") }}
                                    </div>

                                    <div
                                      class="error"
                                      v-for="(
                                        error, index
                                      ) in errors.governorate"
                                      :key="index"
                                    >
                                      {{ error }}
                                    </div>
                                  </b-form-group>
                                </b-col>
                                <!-- cities -->
                                <b-col lg="4">
                                  <b-form-group>
                                    <!-- <label>{{ $t("profile.city") }}</label>
                        <span class="requried text-danger">*</span> -->
                                    <b-form-select
                                      v-model="form.city_id"
                                      :disabled="
                                        !form.country_id || !form.region_id
                                      "
                                    >
                                      <b-form-select-option
                                        value="null"
                                        disabled
                                        >{{ $t("profile.city") }}
                                        <span class="requried text-danger"
                                          >*</span
                                        >
                                      </b-form-select-option>
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
                                    <div
                                      class="error"
                                      v-for="(error, index) in errors.city"
                                      :key="index"
                                    >
                                      {{ error }}
                                    </div>
                                    <div
                                      class="error"
                                      v-if="
                                        localClicked && form.city_id == null
                                      "
                                    >
                                      {{ $t("payment.CityRequired") }}
                                    </div>
                                  </b-form-group>
                                </b-col>
                                <!-- street number  -->
                                <b-col lg="12">
                                  <b-form-group>
                                    <!-- <label for="streetNumber">{{
                          $t("profile.streetNumber")
                        }}</label> -->
                                    <!-- <span class="requried">*</span> -->
                                    <b-form-input
                                      id="streetNumber"
                                      v-model="form.address_line_1"
                                      :placeholder="
                                        $t('contactUs.address') + '*'
                                      "
                                    />
                                    <div
                                      class="error"
                                      v-for="(
                                        error, index
                                      ) in errors.address_line_1"
                                      :key="index"
                                    >
                                      {{ error }}
                                    </div>
                                    <div
                                      class="error"
                                      v-if="
                                        localClicked &&
                                        form.address_line_1 == null
                                      "
                                    >
                                      {{ $t("payment.AddressRequired") }}
                                    </div>
                                  </b-form-group>
                                </b-col>
                                <!-- home number  -->
                                <b-col lg="6">
                                  <b-form-group>
                                    <!-- <label for="homeNumber">{{
                          $t("profile.homeNumber")
                        }}</label> -->
                                    <!-- <span class="requried">*</span> -->
                                    <b-form-input
                                      id="homeNumber"
                                      v-model="form.building_number"
                                      :placeholder="$t('profile.homeNumber')"
                                    />
                                    <div
                                      class="error"
                                      v-for="(
                                        error, index
                                      ) in errors.building_number"
                                      :key="index"
                                    >
                                      {{ error }}
                                    </div>
                                  </b-form-group>
                                </b-col>
                                <!-- floor  -->
                                <b-col lg="6">
                                  <b-form-group>
                                    <!-- <label for="floor">{{ $t("profile.floor") }}</label>
                        <span class="requried">*</span> -->
                                    <b-form-input
                                      id="floor"
                                      v-model="form.floor"
                                      :placeholder="$t('profile.floor')"
                                    />
                                    <div
                                      class="error"
                                      v-for="(error, index) in errors.floor"
                                      :key="index"
                                    >
                                      {{ error }}
                                    </div>
                                  </b-form-group>
                                </b-col>
                                <!-- block number   -->
                                <b-col lg="6">
                                  <b-form-group>
                                    <!-- <label for="blockNumber">{{
                          $t("profile.blockNumber")
                        }}</label>
                        <span class="requried">*</span> -->
                                    <b-form-input
                                      id="blockNumber"
                                      v-model="form.apartment"
                                      :placeholder="$t('profile.blockNumber')"
                                    />
                                    <div
                                      class="error"
                                      v-for="(error, index) in errors.apartment"
                                      :key="index"
                                    >
                                      {{ error }}
                                    </div>
                                  </b-form-group>
                                </b-col>
                                <!-- post code  -->
                                <b-col lg="6">
                                  <b-form-group>
                                    <!-- <label for="postCode">{{
                          $t("profile.postCode")
                        }}</label>
                        <span class="required text-danger">*</span> -->
                                    <b-form-input
                                      id="postCode"
                                      type="number"
                                      v-model="form.pin_code"
                                      :formatter="formatPin_code"
                                      :placeholder="$t('profile.postCode')"
                                    />
                                    <div class="error" v-if="postalError">
                                      {{ $t("payment.postalError") }}
                                    </div>
                                  </b-form-group>
                                </b-col>
                                <!-- note  -->
                                <!-- <b-col lg="12">
                              <b-form-group>
                                <label for="textarea">{{
                                  $t("profile.note")
                                }}</label>
                                <b-form-textarea
                                  id="textarea"
                                  size="lg"
                                  v-model="form.notes"
                                ></b-form-textarea>
                                <div
                                  class="error"
                                  v-for="(error, index) in errors.notes"
                                  :key="index"
                                >
                                  {{ error }}
                                </div>
                              </b-form-group>
                            </b-col> -->
                              </b-row>

                              <b-button
                                v-if="buyerUserData"
                                type="submit"
                                @click.prevent="createAdress()"
                                class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto"
                              >
                                {{ $t("register.submit") }} &
                                {{ $t("cart.checkFees") }}
                              </b-button>
                              <b-button
                                v-else
                                type="submit"
                                @click.prevent="localStoreAdresses()"
                                class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto mx-2"
                              >
                                {{ $t("register.submit") }} &
                                {{ $t("cart.checkFees") }}
                              </b-button>
                              <!-- <router-link
                          v-if="submitted"
                          to="/payment"
                          class="login-button dark m-0 mt-4 ml-4 py-3 px-5 text-white text-center w-auto mx-2"
                        >
                          {{ $t("cart.checkout") }}
                        </router-link> -->

                              <!-- <button
                          @click.prevent="getShippingFeesNew"
                          to="/payment"
                          class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto mx-2"
                        >
                          {{ $t("cart.checkFees") }}
                        </button> -->
                            </form>
                            <!-- <h6
                            v-if="!buyerUserData && localStoreFail"
                            class="localStoreFail mt-3 error"
                          >
                            {{ $t("cart.fillData") }}
                          </h6> -->
                          </div>

                          <!-- <div
                        class="existingAddresses"
                        v-else-if="selectAddressShape === 'existingAddresses'"
                      >
                        <div class="existingAddressNewStep">
                          <form
                            v-if="
                              selectAddressShape === 'existingAddresses' &&
                              selectedAddress !== null
                            "
                            @submit.prevent="createAdress()"
                            class="account-information-form"
                          >
                            <b-row class="justify-content-center">
                              country 
                              <b-col lg="12">
                                <b-form-group>
                                  <label>{{ $t("profile.country") }}</label>
                                  <span class="requried">*</span>
                                  <b-form-select
                                    v-model="newForm.country_id"
                                    @input="getAllRegions"
                                    disabled
                                  >
                                    <b-form-select-option
                                      v-for="country in countries"
                                      :key="country.id"
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
                              regions
                              <b-col lg="6">
                                <b-form-group>
                                  <label>{{ $t("profile.region") }}</label>
                                  <span class="requried">*</span>
                                  <b-form-select
                                    v-model="newForm.region_id"
                                    disabled
                                    @input="getAllCities"
                                  >
                                    <b-form-select-option
                                      v-for="region in regions"
                                      :key="region.id"
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
                              cities
                              <b-col lg="6">
                                <b-form-group>
                                  <label>{{ $t("profile.city") }}</label>
                                  <span class="requried">*</span>
                                  <b-form-select
                                    v-model="newForm.city_id"
                                    disabled
                                  >
                                    <b-form-select-option
                                      v-for="city in cities"
                                      :key="city.id"
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
                              street number 
                              <b-col lg="12">
                                <b-form-group>
                                  <label for="streetNumber">{{
                                    $t("profile.streetNumber")
                                  }}</label>
                                  <span class="requried">*</span>
                                  <b-form-input
                                    id="streetNumber"
                                    disabled
                                    v-model="newForm.street"
                                  />
                                  <div
                                    class="error"
                                    v-for="(error, index) in errors.street"
                                    :key="index"
                                  >
                                    {{ error }}
                                  </div>
                                </b-form-group>
                              </b-col>
                              home number 
                              <b-col lg="6">
                                <b-form-group>
                                  <label for="homeNumber">{{
                                    $t("profile.homeNumber")
                                  }}</label>
                                  <span class="requried">*</span>
                                  <b-form-input
                                    disabled
                                    id="homeNumber"
                                    v-model="newForm.building_number"
                                  />
                                  <div
                                    class="error"
                                    v-for="(
                                      error, index
                                    ) in errors.building_number"
                                    :key="index"
                                  >
                                    {{ error }}
                                  </div>
                                </b-form-group>
                              </b-col>
                              floor 
                              <b-col lg="6">
                                <b-form-group>
                                  <label for="floor">{{
                                    $t("profile.floor")
                                  }}</label>
                                  <span class="requried">*</span>
                                  <b-form-input
                                    id="floor"
                                    v-model="newForm.floor"
                                    disabled
                                  />
                                  <div
                                    class="error"
                                    v-for="(error, index) in errors.floor"
                                    :key="index"
                                  >
                                    {{ error }}
                                  </div>
                                </b-form-group>
                              </b-col>
                              block number  
                              <b-col lg="6">
                                <b-form-group>
                                  <label for="blockNumber">{{
                                    $t("profile.blockNumber")
                                  }}</label>
                                  <span class="requried">*</span>
                                  <b-form-input
                                    id="blockNumber"
                                    v-model="newForm.apartment"
                                    disabled
                                  />
                                  <div
                                    class="error"
                                    v-for="(error, index) in errors.apartment"
                                    :key="index"
                                  >
                                    {{ error }}
                                  </div>
                                </b-form-group>
                              </b-col>
                              post code 
                              <b-col lg="6">
                                <b-form-group>
                                  <label for="postCode">{{
                                    $t("profile.postCode")
                                  }}</label>
                                  <b-form-input
                                    id="postCode"
                                    v-model="newForm.pin_code"
                                    disabled
                                  />
                                  <div
                                    class="error"
                                    v-for="(error, index) in errors.pin_code"
                                    :key="index"
                                  >
                                    {{ error }}
                                  </div>
                                </b-form-group>
                              </b-col>

                              <b-col lg="12">
                                <b-form-group>
                                  <label for="textarea">{{
                                    $t("profile.note")
                                  }}</label>
                                  <b-form-textarea
                                    id="textarea"
                                    size="lg"
                                    disabled
                                    v-model="form.notes"
                                  ></b-form-textarea>
                                </b-form-group>
                              </b-col>
                              note 
                            </b-row>
                            <button
                              @click.prevent="getShippingFeesExist"
                              class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto mx-2"
                            >
                              {{ $t("cart.checkFees") }}
                            </button>
                          </form>
                        </div>
                      </div> -->
                        </div>
                        <div
                          class="close-options"
                          v-if="expanded && selectAddressShape === 'newAddress'"
                          @click="expanded = !expanded"
                        >
                          <font-awesome-icon icon="fa-solid fa-xmark" />
                        </div>
                        <div
                          class="close-options"
                          v-else-if="!expanded"
                          @click="expanded = !expanded"
                        >
                          <font-awesome-icon icon="fa-solid fa-arrow-down" />
                        </div>
                      </div>
                    </div>
                    <!-- <div class="" v-else></div> -->
                  </div>
                </div>
              </div>
              <!-- {{ ratingNum }} -->
            </div>
          </div>
          <div class="easy-trans col-12">
            <div class="cart">
              <div
                class="d-flex justify-content-center align-items-center flex-column"
                v-if="loading"
              >
                <img
                  src="@/assets/images/Loader.gif"
                  alt="cart-image"
                  class="w-25"
                />
              </div>
              <div class="" v-else>
                <div class="" v-if="cartItems !== null">
                  <h5 class="heading py-5 text-center">
                    {{ $t("cart.purchaseCart") }}
                  </h5>
                  <div class="cart-table p-4">
                    <table class="table">
                      <thead>
                        <tr>
                          <th></th>
                          <th>{{ $t("cart.product") }}</th>
                          <th>{{ $t("cart.price") }}</th>
                          <th>{{ $t("cart.quantity") }}</th>
                          <th>{{ $t("cart.total") }}</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody
                        class="supplier"
                        v-for="(supplier, index) in cartItems"
                        :key="index"
                      >
                        <h5 class="name">
                          {{ supplier.supplier_name }}
                        </h5>
                        <tr
                          class="item-content"
                          v-for="(item, index) in supplier.products"
                          :key="index"
                        >
                          <td class="media">
                            <router-link
                              :to="{
                                path: '/details',
                                query: { id: `${item.product_supplier_id}` },
                              }"
                              class="thumb"
                            >
                              <img
                                :src="item.product_image"
                                :alt="item.name + ' image'"
                                class="product-image"
                              />
                            </router-link>
                          </td>
                          <td>
                            <router-link
                              :to="{
                                path: '/details',
                                query: { id: `${item.product_supplier_id}` },
                              }"
                            >
                              {{ item.product_name }}
                            </router-link>
                          </td>
                          <td v-if="item.price">
                            {{ item.price | fixedCurrency }} {{ currency }}
                          </td>
                          <td v-else>-</td>
                          <td>
                            <Counter
                              :minimum="
                                item.min_order_quantity
                                  ? item.min_order_quantity
                                  : 1
                              "
                              :quantity="item.quantity"
                              :product="item"
                              class="justify-content-center"
                              @changeTitle="ChangeQ($event)"
                            ></Counter>
                          </td>
                          <td v-if="item.product_sub_total">
                            {{ item.product_sub_total | fixedCurrency }}
                            {{ currency }}
                          </td>
                          <td v-else>-</td>

                          <td>
                            <div class="actions" @click="removeFromCart(item)">
                              <span class="action-icon">
                                <font-awesome-icon icon="fa-solid fa-trash" />
                              </span>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="4">
                            <div
                              class="coupon my-4"
                              v-for="(item, index) in supplier.products"
                              :key="index"
                            >
                              <div class="d-flex flex-wrap align-items-center">
                                <b-button
                                  type="submit"
                                  @click="checkCoupon(supplier)"
                                  class="login-button my-2 py-3 px-4 w-auto"
                                >
                                  {{ $t("cart.couponDiscount") }}
                                </b-button>
                                <div class="input-holder">
                                  <input
                                    type="text"
                                    :placeholder="$t('cart.addCoupon')"
                                    class="my-2 h-100 p-4 itemInput"
                                    @input="changeCoupon($event)"
                                  />
                                  <span
                                    :title="$t('cart.enableButton')"
                                    class="close"
                                    @click="removeDisabled"
                                    >x</span
                                  >
                                </div>
                              </div>
                              <!-- <div >
                          <ul>
                            <li v-for="(error, index) in errors" :key="index">
                              {{ error }}
                            </li>
                          </ul>
                        </div> -->
                              <h6 class="couponValid text-success m-0 p-0"></h6>
                              <h6
                                class="couponNotValid text-danger m-0 p-0"
                              ></h6>
                            </div>
                          </td>
                          <td colspan="3">
                            <div class="order-shipping mt-5">
                              <div :class="$i18n.locale">
                                <form
                                  @change="orderType(supplier.supplier_id)"
                                  class="d-flex align-items-baseline"
                                >
                                  <label
                                    @click="shippingStore(supplier)"
                                    class="shipping-label"
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
                                    <span class="mx-2">{{
                                      $t("payment.delivery")
                                    }}</span>
                                  </label>
                                  <label>
                                    <input
                                      @input="changePickup($event, supplier)"
                                      @click="changePickup($event, supplier)"
                                      type="radio"
                                      value="1"
                                      :name="'types-' + index"
                                      v-model="ratingNum[index].delivery_type"
                                    />
                                    <span class="mx-2">{{
                                      $t("payment.pickup")
                                    }}</span>
                                  </label>
                                  <b-form-select
                                    v-model="
                                      ratingNum[index].supplier_address_id
                                    "
                                    @input="selectAddressUUID"
                                    @change="selectType(supplier, index)"
                                    class="w-100 mt-2 supplierAddresses d-none"
                                    :class="{
                                      'text-danger':
                                        ratingNum[index].supplier_address_id ===
                                        null,
                                      'text-dark d-block':
                                        ratingNum[index].supplier_address_id !==
                                        null,
                                    }"
                                  >
                                    <b-form-select-option
                                      selected
                                      disabled
                                      value="null"
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
                                  <span class="feedsResult"></span>
                                  <h4 class="pickupNoData"></h4>
                                  <br />
                                  <ul
                                    class="list-unstyled"
                                    v-if="firstFees || deliverType == true"
                                  >
                                    <li
                                      v-for="(fee, index) in firstFees"
                                      :key="index"
                                    >
                                      <h4
                                        v-if="index == supplier.supplier_id"
                                        class="feedsResultShipping mb-0"
                                        :value="fee.shipping_fee"
                                      >
                                        {{ $t("profile.deleiveryFees") }}
                                        {{ fee.shipping_fee | fixedCurrency }}
                                        {{ currency }}
                                      </h4>
                                    </li>
                                  </ul>
                                </form>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <!-- <div class="proceAfterDisc" v-if="couponChecked">
              {{ $t("cart.proceAfterDisc") }} :
              <span
                ><b>{{ totalPayment }}</b></span
              >
            </div> -->
                    </table>
                  </div>
                </div>
                <div
                  class="d-flex justify-content-center align-items-center flex-column"
                  v-else
                >
                  <img
                    src="@/assets/images/Loader.gif"
                    alt="cart-image"
                    class="w-25"
                  />
                  <!-- <h3 class="m-0">
          {{ $t("cart.noCartProducts") }}
        </h3> -->
                </div>
              </div>
            </div>
          </div>
          <div class="payment w-100">
            <div class="payment py-3">
              <div class="container">
                <!-- <h4 class="header text-center py-5 font-weight-bold">
                  {{ $t("payment.payment") }}
                </h4> -->
                <div class="content">
                  <div class="row payment-data">
                    <div class="col-12 col-lg-7 col-xl-8 payment-delivery">
                      <div
                        class="d-flex justify-content-between heading align-items-center mb-4"
                      >
                        <span class="title">{{
                          $t("payment.deliveryData")
                        }}</span>
                        <!-- <router-link to="/cart">
                      {{ $t("payment.backToCart") }}
                      <span>
                        <font-awesome-icon icon="fa-solid fa-arrow-right" />
                      </span>
                    </router-link> -->
                      </div>
                      <form class="row delivery-form">
                        <div
                          class="col-6 form-group required"
                          v-if="!buyerUserData"
                        >
                          <label for="firstName">{{
                            $t("payment.firstName")
                          }}</label>
                          <input
                            type="text"
                            class="form-control"
                            id="firstName"
                            v-model="paymentFormData.first_name"
                          />
                          <div
                            class="error text-start"
                            v-for="(error, index) in errors.first_name"
                            :key="index"
                          >
                            {{ error }}
                          </div>
                        </div>
                        <div
                          class="col-6 form-group required"
                          v-if="!buyerUserData"
                        >
                          <label for="firstName">{{
                            $t("payment.lastName")
                          }}</label>
                          <input
                            type="text"
                            class="form-control"
                            id="lastName"
                            v-model="paymentFormData.last_name"
                          />
                          <div
                            class="error text-start"
                            v-for="(error, index) in errors.last_name"
                            :key="index"
                          >
                            {{ error }}
                          </div>
                        </div>
                        <!-- <div class="col-12 form-group" v-if="!buyerUserData">
                      <label for="companyName">
                  {{ $t("payment.category") }} ({{ $t("payment.optional") }})
                </label>
                      <label for="companyName">
                        {{ $t("payment.companyName") }}
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="companyName"
                        v-model="paymentFormData.company_name"
                      />
                      <div
                        class="error text-start"
                        v-for="(error, index) in errors.company_name"
                        :key="index"
                      >
                        {{ error }}
                      </div>
                    </div> -->
                        <!-- <div class="col-12 form-group required" v-if="checkType">
                <label for="country">{{ $t("payment.country") }}</label>
                <b-form-select
                  v-model="paymentFormData.country"
                  @input="getAllRegions"
                >
                  <b-form-select-option
                    v-for="country in countries"
                    :key="country.id"
                    :value="country.id"
                    >{{ country.title }}
                  </b-form-select-option>
                </b-form-select>
                <div
                  class="error text-start"
                  v-for="(error, index) in errors.country"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div> -->
                        <!-- <div class="col-6 form-group required" v-if="checkType">
                <label for="governorate">{{ $t("payment.governorate") }}</label>

                <b-form-select
                  v-model="paymentFormData.governorate"
                  :disabled="!paymentFormData.country"
                  @input="getAllCities"
                >
                  <b-form-select-option
                    v-for="region in regions"
                    :key="region.id"
                    :value="region.id"
                    >{{ region.title }}
                  </b-form-select-option>
                </b-form-select>
                <div
                  class="error text-start"
                  v-for="(error, index) in errors.governorate"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div> -->
                        <!-- <div class="col-6 form-group required" v-if="checkType">
                <label for="city">{{ $t("payment.city") }}</label>
                <b-form-select
                  v-model="paymentFormData.city"
                  :disabled="!paymentFormData.country || !paymentFormData.governorate"
                >
                  <b-form-select-option
                    v-for="city in cities"
                    :key="city.id"
                    :value="city.id"
                    >{{ city.title }}
                  </b-form-select-option>
                </b-form-select>
                <div
                  class="error text-start"
                  v-for="(error, index) in errors.city"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div> -->
                        <!-- <div class="col-12 form-group required" v-if="!buyerUserData">
                      <label for="address">{{ $t("payment.address") }}</label>
                      <input
                        type="text"
                        class="form-control"
                        id="address"
                        v-model="paymentFormData.address"
                      />
                      <div
                        class="error text-start"
                        v-for="(error, index) in errors.address"
                        :key="index"
                      >
                        {{ error }}
                      </div>
                    </div> -->

                        <!-- <div
                      :class="{ 'col-12': checkType }"
                      class="col-6 form-group"
                      v-if="checkType && !buyerUserData"
                    >
                      <label for="postalCode">{{
                        $t("payment.postalCode")
                      }}</label>
                      <input
                        type="text"
                        class="form-control"
                        id="postalCode"
                        v-model="paymentFormData.postal_code"
                      />
                      <div
                        class="error text-start"
                        v-for="(error, index) in errors.postal_code"
                        :key="index"
                      >
                        {{ error }}
                      </div>
                    </div> -->

                        <div class="col-md-5 col-sm-12 form-group">
                          <label for="email"
                            >{{ $t("payment.email") }}
                            <span
                              class="requried text-danger"
                              v-if="buyerUserData"
                              >*</span
                            ></label
                          >
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            v-model="paymentFormData.email"
                          />
                          <div
                            class="error text-start"
                            v-for="(error, index) in errors.email"
                            :key="index"
                          >
                            {{ error }}
                          </div>
                        </div>

                        <!-- <div class="col-2 form-group required">
                        <label for="country_code">{{
                          $t("payment.country_code")
                        }}</label>
                        <input
                          type="number"
                          class="form-control"
                          id="country_code"
                          v-model="paymentFormData.country_code"
                        />
                        <div
                          class="error text-start"
                          v-for="(error, index) in errors.country_code"
                          :key="index"
                        >
                          {{ error }}
                        </div>
                      </div> -->
                        <b-col md="3" sm="12">
                          <b-form-group>
                            <label for="countryCode">{{
                              $t("register.countryCode")
                            }}</label>
                            <span class="requried text-danger">*</span>

                            <b-form-select
                              v-model="paymentFormData.country_code"
                            >
                              <b-form-select-option
                                value="null"
                                disabled
                                selected
                                >{{ $t("register.countryCode") }}
                                <span class="requried text-danger">*</span>
                              </b-form-select-option>
                              <b-form-select-option
                                v-for="(country, index) in countries"
                                :key="index"
                                :value="country.phone_prefix"
                                >{{ country.title }}
                                {{ country.phone_prefix }}
                              </b-form-select-option>
                            </b-form-select>

                            <div
                              class="error"
                              v-for="(error, index) in errors.country_code"
                              :key="index"
                            >
                              {{ error }}
                            </div>
                          </b-form-group>
                        </b-col>

                        <div class="col-md-4 col-sm-12 form-group required">
                          <label for="phoneNumber">{{
                            $t("payment.phoneNumber")
                          }}</label>
                          <input
                            type="number"
                            class="form-control"
                            id="phoneNumber"
                            v-model="paymentFormData.phone"
                            :placeholder="paymentFormData.phone"
                          />
                          <div
                            class="error text-start"
                            v-for="(error, index) in errors.phone"
                            :key="index"
                          >
                            {{ error }}
                          </div>
                        </div>

                        <div
                          class="col-12 form-group custom-control custom-checkbox"
                          v-if="!buyerUserData"
                        >
                          <!-- <input
                  type="checkbox"
                  class="custom-control-input"
                  id="deliveryAddress"
                  v-model="paymentFormData.sameAddress"
                /> -->
                          <!-- <label class="custom-control-label" for="deliveryAddress">
                  {{ $t("payment.deliverySameAddress") }}
                </label> -->
                        </div>
                        <div class="col-12 form-group">
                          <label for="notes">
                            {{ $t("payment.notes") }} ({{
                              $t("payment.optional")
                            }})
                          </label>
                          <textarea
                            class="form-control"
                            id="notes"
                            rows="3"
                            v-model="paymentFormData.comment"
                          ></textarea>
                          <div
                            class="error text-start"
                            v-for="(error, index) in errors.comment"
                            :key="index"
                          >
                            {{ error }}
                          </div>
                        </div>
                      </form>
                    </div>
                    <div class="col-12 col-lg-5 col-xl-4 payment-method">
                      <div class="heading mb-4">
                        <span class="title">{{
                          $t("payment.paymentData")
                        }}</span>
                      </div>
                      <div class="methods-data">
                        <!-- <div class="info">
                {{ $t("payment.total") }}: {{ cart_sub_total | fixedCurrency }} {{ currency }}
              </div> -->
                        <!-- <div class="info">
                {{ $t("payment.discount") }} : {{ discount | fixedCurrency }} {{ currency }}
              </div> -->
                        <!-- <div class="info delivery">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="freeDelivery"
                    v-model="freeDelivery"
                    value="free"
                  />
                  <label class="custom-control-label" for="freeDelivery">
                    {{ $t("payment.freeDelivery") }}
                  </label>
                </div>
              </div> -->
                        <!-- <div
                class="d-flex justify-content-between align-items-center total"
              >
                <span class="title">{{ $t("payment.total") }}</span>
                <span class="price">{{ totalPayment | fixedCurrency }} {{ currency }}</span>
              </div> -->
                        <div class="methods">
                          <div
                            class="method"
                            v-if="
                              buyerUserData &&
                              walletData >= totalPaymentReplacement
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
                              <span>{{ walletData }} {{ currency }}</span>
                            </div>
                          </div>
                          <div class="method" v-if="buyerUserData">
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
                                <sup>*</sup>
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
                                <sup>*</sup>
                              </label>
                              <span>{{ $t("payment.requestReceipt") }}</span>
                            </div>
                          </div>
                          <div
                            class="method row justify-content-between align-content-center"
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
                                  <sup>*</sup>
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
                        <div
                          class="error text-center"
                          v-for="(error, index) in errors.payment_type"
                          :key="index"
                        >
                          {{ error }}
                        </div>
                        <!-- <div class="terms my-4">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="terms"
                  />
                  <label class="custom-control-label" for="terms">
                    {{ $t("payment.accept") }}
                    <a href="#">{{ $t("payment.termsAndConditions") }}</a>
                  </label>
                </div>
              </div> -->

                        <b-form-checkbox
                          v-model="paymentFormData.accept_terms"
                          class="terms my-4 d-inline-block"
                        >
                          <span>
                            {{ $t("payment.accept") }}
                          </span>
                        </b-form-checkbox>

                        <a
                          v-b-modal.terms&condation
                          @click="$bvModal.show('modal-scoped')"
                          class="text-decoration-underline"
                        >
                          {{ $t("payment.termsAndConditions") }}</a
                        >
                        <b-modal
                          size="lg"
                          id="modal-scoped"
                          :title="condations.title"
                        >
                          <p v-html="condations.description">
                            {{ condations.description }}
                          </p>
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

                        <div
                          class="error text-center"
                          v-for="(error, index) in errors.accept_terms"
                          :key="index"
                        >
                          {{ error }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="cart w-100">
            <div class="cart-detail p-4">
              <h5 class="heading mb-3">{{ $t("cart.totalCart") }}</h5>
              <div class="data">
                <table class="w-100">
                  <tbody>
                    <tr>
                      <th>{{ $t("profile.subTotal") }}</th>
                      <td v-if="cart_sub_total">
                        {{ cart_sub_total | fixedCurrency }} {{ currency }}
                      </td>
                    </tr>
                    <tr>
                      <th>{{ $t("cart.discount") }}</th>
                      <td v-if="totalDiscount !== null && cart_sub_total">
                        {{ totalDiscountReplacement }} {{ currency }}
                      </td>
                    </tr>
                    <tr>
                      <th>{{ $t("cart.deleiveryFees") }}</th>
                      <td v-if="shippingCartFee !== null">
                        {{ shippingCartFee | fixedCurrency }} {{ currency }}
                      </td>
                    </tr>
                    <!-- <tr>
                  <th>{{ $t("cart.delivery") }}</th>
                  <td>
                    <div class="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        class="custom-control-input"
                        id="freeDelivery"
                        v-model="freeDelivery"
                      />
                      {{ freeDeliveryStatus }}
                      <label class="custom-control-label" for="freeDelivery">
                        {{ $t("cart.free") }}
                      </label>
                    </div>
                  </td>
                </tr> -->
                    <tr>
                      <th>{{ $t("cart.total") }}</th>
                      <td v-if="totalPayment">
                        {{ totalPaymentReplacement | fixedCurrency }}
                        {{ currency }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="checkout d-flex">
                  <!-- <router-link
                v-if="buyerUserData"
                to="/order-shipping"
                class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto"
              >
                {{ $t("cart.next") }}
              </router-link> -->
                  <!-- <a
                @click="showModal = true"
                @ok="$refs.cartModal.onSubmit()"
                v-if="!buyerUserData"
                class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto"
              >
                {{ $t("cart.next") }}
              </a> -->

                  <div class="submit" v-if="buyerUserData">
                    <b-button
                      type="submit"
                      class="login-button dark"
                      @click="payment"
                    >
                      {{ $t("payment.checkout") }}
                    </b-button>
                  </div>
                  <div class="submit" v-else>
                    <b-button
                      type="submit"
                      class="login-button dark"
                      @click="guestPayment"
                    >
                      {{ $t("payment.checkout") }}
                    </b-button>
                  </div>

                  <transition name="modal">
                    <div class="modal-mask" v-if="showModal">
                      <login-modal @close="closeModal" />
                    </div>
                  </transition>
                  <!-- <router-link
                to="/payment"
                class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto"
              >
                {{ $t("cart.checkout") }}
              </router-link> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="d-flex justify-content-center align-items-center flex-column"
        v-else
      >
        <img src="@/assets/images/Loader.gif" alt="cart-image" class="w-25" />
      </div>
    </div>
    <div
      class="d-flex justify-content-center align-items-center py-5 my-5 text-center"
      v-else-if="!hasProducts"
    >
      <div>
        <img
          src="@/assets/images/pngfind.com-cart-png-2727925.png"
          alt="no-data-in-cart"
          srcset=""
        />
        <h4 class="mt-3">
          {{ $t("cart.noCartProducts") }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from "@/components/global/Counter.vue";
import suppliers from "@/services/suppliers";
import globalAxios from "@/services/global-axios";
import loginModal from "@/components/global/loginModal.vue";

import auth from "@/services/auth";
import profile from "@/services/profile";
// import paymentPage from "@/views/Payment";
export default {
  components: { Counter, loginModal },
  data() {
    return {
      coupon: null,
      discount: 0,
      loading: false,
      productLoading: false,
      freeDelivery: false,
      total_cart: [],
      newCartData: null,
      selectedCoupon: null,
      buttonDisabled: false,
      cartItems: null,
      price_after_discount: null,
      couponChecked: false,
      selectedInput: null,
      selectedButton: null,
      selectedSpan: null,
      myQuantity: null,
      showModal: false,
      priceData: null,

      ratingNum: [],
      deliverType: true,
      selectAddressShape: null,

      form: {
        country_id: null,
        region_id: null,
        city_id: null,
        building_number: null,
        floor: null,
        apartment: null,
        pin_code: "",
        notes: null,
        // address_uuid: null,
        address_line_1: null,
      },
      newForm: {
        country_id: null,
        region_id: null,
        city_id: null,
        building_number: null,
        floor: null,
        apartment: null,
        pin_code: null,
        notes: null,
        address_line_1: null,
      },
      countries: [],
      cities: [],
      regions: [],
      errors: {},
      newAddressOption: null,
      selectedAddress: null,
      addresses: null,
      submitted: false,
      supplierAddress: null,
      suppier_id: null,
      selectedInputText: "",
      firstFees: null,
      showBtnClicked: true,
      totalDiscount: null,
      cart_sub_total: null,
      totalPayment: null,

      // payment
      count: 0,
      storedData: null,
      paymentFormData: {
        // guest_uuid: localStorage.getItem("guest-id")
        //   ? localStorage.getItem("guest-id")
        //   : "",
        comment: null,
        phone: null,
        payment_type: null,
        first_name: null,
        last_name: null,
        // address: null,
        // sameAddress: false,
        country: "",
        governorate: "",
        city: "",
        // postal_code: null,
        email: null,
        // coupons: [],
        address_uuid: null,
        suppliers: null,
        redirect_url: null,
        country_code: null,
        accept_terms: false,
        company_name: null,
      },
      paymentCountries: [],
      paymentCities: [],
      paymentRegions: [],
      condations: {},

      availablePickup: true,
      expanded: true,
      closeBtn: true,
      shippingCartFee: null,
      totalFees: null,

      totalPaymentReplacement: null,
      totalDiscountReplacement: null,
      localStoreFail: false,
      hasProducts: false,
      walletData: null,
      pin_codeMaxLength: 6,
      postalError: false,
      localClicked: false,
    };
  },
  mounted() {
    this.getCartProducts();

    // localStorage.removeItem("discount");
    this.getAllCountires();
    this.getAllAdresses();
    localStorage.removeItem("s_id");

    // let checkTypes = localStorage.getItem('type');
    // if(checkTypes.includes('1')){
    //   alert('pickup')
    // }

    // payment

    // this.paymentGetAllCities();
    // let this.buyerUserData = localStorage.getItem("buyerUserData");
    this.paymentFormData.country = this.buyerUserData
      ? this.buyerUserData.country_id
      : "";
    this.paymentFormData.governorate = this.buyerUserData
      ? this.buyerUserData.region_id
      : "";
    this.paymentFormData.city = this.buyerUserData
      ? this.buyerUserData.city_id
      : "";

    this.paymentFormData.suppliers = this.mySuppliers.suppliers;
    this.paymentFormData.address_uuid = localStorage.getItem(
      "globalAddressUUID"
    )
      ? localStorage.getItem("globalAddressUUID")
      : "";

    this.paymentFormData.postal_code = this.buyerUserData
      ? this.buyerUserData.pin_code
      : null;
    this.paymentFormData.first_name = this.buyerUserData
      ? this.buyerUserData.first_name
      : "";
    this.paymentFormData.last_name = this.buyerUserData
      ? this.buyerUserData.last_name
      : "";

    this.paymentFormData.company_name = this.buyerUserData
      ? this.buyerUserData.company_name
      : "";

    this.paymentFormData.phone = this.buyerUserData
      ? this.buyerUserData.mobile_number.replace("+20", "").replace("+965", "")
      : "";

    this.paymentFormData.country_code = this.buyerUserData
      ? this.buyerUserData.phone_prefix
      : "";
    this.paymentFormData.email = this.buyerUserData
      ? this.buyerUserData.email
      : "";

    const backUrl = `${this.mainDoamin}complete-checkout`;
    this.paymentFormData.redirect_url = backUrl;

    this.getTerms();

    // console.log(this.paymentFormData.country_code);

    localStorage.setItem("globalAddressUUID", this.buyerUserData.uuid);

    // let mtNumber = this.buyerUserData.mobile_number.substr(0,3);
    // document.getElementById()
    this.getWallet();
  },
  methods: {
    formatPin_code(e) {
      return String(e).substring(0, 6);
    },
    changeCoupon($event) {
      // console.log($event.target.value);
      this.selectedCoupon = $event.target.value;
      // $event.target.setAttribute('disabled' , 'true')

      let input = $event.target;

      this.selectedInput = input;

      let button = input.parentElement.previousElementSibling;

      this.selectedButton = button;

      let span = input.nextElementSibling;

      this.selectedSpan = span;
    },

    getCartProducts() {
      // this.loading = true;
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

          // console.log("cart_items", res.data.items.cart_items);
          // console.log("res", res);

          // console.log(res);
          // this.cartItems = this.cartItems = res.data.items.cart_items
          this.cartItems = res.data.items.cart_items.map((cartItem) => {
            return {
              ...cartItem,
              supplier_addresses: [],
            };
          });
          // console.log(this.cartItems);
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
          if (this.buyerUserData && this.buyerUserData.address_uuid) {
            this.getLoggedFirstShippingFees();
          }
        })
        .finally(() => {
          // this.loading = false;
          setTimeout(() => {
            // checkAll
            var checkboxes = document.getElementsByClassName("checkFirst");

            // checkboxes[0].parentElement.click();
            // checkboxes[1].parentElement.click();
            // console.log("checkboxes" , checkboxes);

            for (let index = 0; index < checkboxes.length; index++) {
              const element = checkboxes[index];
              element.parentElement.click();
              // console.log(element);
            }

            var existingAddresses =
              document.querySelector(".existingAddresses");
            for (var i = 0; i < checkboxes.length; i++) {
              // checkboxes[i].checked = true;
              // checkboxes[i].parentElement.click();
              // console.log(checkboxes[i]);
              existingAddresses.click();
              existingAddresses.checked = true;
            }
            if (this.addresses !== null) {
              // checkboxes.submit();
            }
          }, 500);
          // setTimeout(() => {
          //   this.shippingStore();
          // }, 200);
          if (localStorage.getItem("buyerUserData") === null) {
            if (document.querySelector(".GuestNewAddress") !== null) {
              document.querySelector(".GuestNewAddress").click();
            }
            setTimeout(() => {
              document.querySelector(".GuestNewAddress").click();
            }, 500);
          }
        });
    },
    removeFromCart(product) {
      // this.removeProductFromCart({
      //   product: product,
      // });
      this.$store.dispatch("cart/removeProductFromCart", {
        product: product,
      });
      // this.loading = true;
      this.cartItems = null;
      setTimeout(() => {
        this.getCartProducts();
      }, 1000);
      // setTimeout(() => {
      //   this.loading = false;
      // }, 1200);
    },
    removeDisabled() {
      let myInput = this.selectedInput;

      myInput.removeAttribute("disabled");
      myInput.value = "";
      let button = this.selectedButton;
      button.removeAttribute("disabled");

      this.couponChecked = false;
      globalAxios.post(`cart`).then((res) => {
        this.total_cart = res.data.items;
      });

      this.selectedSpan.style.display = "none";
      document.querySelector(".itemInput").removeAttribute("disabled");
      document.querySelector(".login-button").removeAttribute("disabled");

      this.totalDiscountReplacement = parseFloat(0).toFixed(3);
      if (this.totalDiscountReplacement == 0) {
        this.totalPaymentReplacement = this.totalPayment;
      }
      document.querySelector(".couponValid").innerHTML = "";
      document.querySelector(".couponNotValid").innerHTML = "";

      let enteredCoupons = document.getElementsByClassName("couponNotValid");
      if (enteredCoupons) {
        for (let index = 0; index < enteredCoupons.length; index++) {
          const element = enteredCoupons[index];
          element.innerHTML = "";
        }
      }
    },
    checkCoupon(supplier) {
      // let data = {
      //   supplier_id: supplier.supplier_id,
      //   coupon: this.coupon,
      // };

      var data = {
        coupons: [
          {
            coupon: this.selectedCoupon,
            supplier_id: supplier.supplier_id,
          },
        ],
      };

      suppliers
        .checkCoupon(data)
        .then((res) => {
          // let coupons = [];

          // console.log(res.data.items.total_cart.total_discount);
          if (res.status == 200) {
            localStorage.setItem("cou", this.selectedCoupon);
            if (res.data.items.total_cart.total_discount !== 0) {
              this.selectedInput.parentElement.parentElement.parentElement.parentElement.querySelector(
                ".couponValid"
              ).innerHTML = `${this.$t("payment.couponValid")} `;
              this.selectedInput.parentElement.parentElement.parentElement.parentElement.querySelector(
                ".couponNotValid"
              ).innerHTML = ``;
            } else {
              this.selectedInput.parentElement.parentElement.parentElement.parentElement.querySelector(
                ".couponNotValid"
              ).innerHTML = `${this.$t("payment.couponNotValid")}`;
              this.selectedInput.parentElement.parentElement.parentElement.parentElement.querySelector(
                ".couponValid"
              ).innerHTML = ``;
            }
            this.totalDiscount =
              res.data.items.total_cart.total_discount.toFixed(3);
            // this.totalPayment =
            //   res.data.items.total_cart.total_price;
            this.total_cart = res.data.items;
            this.sucessMsg(res.data.message);
            this.couponChecked = true;
            // let myInput = document.querySelector("input");
            // myInput.setAttribute("disabled", "true");
            // this.cartItems = res.data.items.cart_items;

            ///

            let myInput = this.selectedInput;
            let button = this.selectedButton;

            let span = this.selectedSpan;

            span.style.display = "block";
            button.setAttribute("disabled", "true");
            // button.innerHTML = this.$t("cart.enableButton");
            myInput.setAttribute("disabled", "true");
            // this.getCartProducts()
            // localStorage.setItem(
            //   "discount",
            //   res.data.items.cart_sub_total_disc
            // );

            if (res.data.items.total_cart.total_discount == 0) {
              this.totalDiscountReplacement = parseFloat(this.totalDiscount);
              this.totalPaymentReplacement = parseFloat(
                this.totalDiscountReplacement
              );
            } else {
              this.totalDiscountReplacement =
                parseFloat(this.totalDiscountReplacement) +
                parseFloat(res.data.items.total_cart.total_discount).toFixed(3);
              this.totalPaymentReplacement =
                parseFloat(this.totalPaymentReplacement) -
                parseFloat(res.data.items.total_cart.total_discount);
            }
          }
        })
        .catch((error) => {
          if (error) {
            const err = Object.values(error)[2].data;
            this.errors = err.items;
            this.errMsg(err.message);
          }
        });
    },
    ChangeQ(myQuantity) {
      if (myQuantity > 0) {
        this.myQuantity = myQuantity;
      }
      // console.log(myQuantity);
      this.cartItems = null;

      setTimeout(() => {
        this.getCartProducts();
      }, 100);
    },
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },

    changeAddress() {
      document.getElementsByClassName("feedsResult").innerHTML = "";
      // console.log(document.querySelector('.feedsResult').classList.contains('d-block'));
      // if(document.querySelectorAll('.feedsResult').classList.contains('d-block')){
      //   document.querySelectorAll('.feedsResult').classList.remove('d-block')
      //   document.querySelectorAll('.feedsResult').classList.add('d-none')
      // }
      var doc = document.querySelectorAll(".feedsResult");
      // console.log(doc);
      // var notes = null;
      for (var i = 0; i < doc.length; i++) {
        if (doc[i].classList.contains("d-block")) {
          // notes = doc.childNodes[i];
          // break;
          doc[i].classList.remove("d-block");
          doc[i].innerHTML = "";
        }
      }

      this.newForm = this.selectedAddress;
      // console.log("old selected address", this.selectedAddress);
      // localStorage.setItem(
      //   "guestAddressData",
      //   JSON.stringify(this.selectedAddress)
      // );
      localStorage.setItem("globalAddressUUID", this.selectedAddress.uuid);

      setTimeout(() => {
        let address_uuid = localStorage.getItem("globalAddressUUID");

        suppliers
          .getFirstShippingFees(address_uuid)
          .then((res) => {
            // console.log(res);

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

            this.totalPaymentReplacement = this.totalPayment;

            // this.shippingCartFee = myData + 'reda';
            this.shippingCartFee = myData;

            // this.cart_sub_total = res.data.items.cart_sub_total;
            // this.totalDiscount = res.data.items.cart_sub_total_disc.toFixed(3);
            this.totalPaymentReplacement += parseFloat(myData);

            // console.log("myData", myData);
            // console.log("this.totalPayment", this.totalPayment.toFixed(3));
            if (myData == 0) {
              this.totalPaymentReplacement = this.totalPayment;
            }

            if (this.totalDiscountReplacement == parseFloat(0)) {
              // this.totalDiscountReplacement += parseFloat(res.data.items.total_cart.total_discount)
              this.totalPaymentReplacement -= parseFloat(
                this.totalDiscountReplacement
              );
            }
            // console.log(
            //   "this.totalPaymentReplacement",
            //   this.totalPaymentReplacement.toFixed(3)
            // );
            // this.totalPayment += myData;
            // this.shippingCartFee = res.data.items.cart_total_shipping_fee;

            // console.log("myData", myData);
          })
          .catch((err) => {
            console.log(err);
            let error = Object.values(err)[2].data;
            this.errors = error.items;
            this.errMsg(error.message);
          });
      }, 200);
    },
    selectAddressUUID(myselectAddressUUID) {
      // console.log(myselectAddressUUID);
      this.supplierAddress = myselectAddressUUID.uuid;
      this.address_uuid = myselectAddressUUID.uuid;
      localStorage.setItem("addressUUID", myselectAddressUUID.uuid);
      

      // setting delivery fees again after select pick-up

       let newFee = this.selectedInput.parentElement.parentElement
              .querySelector(".feedsResultShipping").getAttribute('value')


              


      this.shippingCartFee -= parseFloat(newFee);
      this.totalPaymentReplacement -= parseFloat(newFee);
    },
    selectType: function (supplier) {
      // console.log(this.supplierAddress);
      let newRating = {
        // name: supplier.supplier_name,
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
      // / console.log(this.ratingNum);
      this.checkSupplierFees(supplier);

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
        } else if (
          element.shipping_type == 1 &&
          element.id == supplier.supplier_id
        ) {
          element.shipping_type = 1;
          element.point_of_sell_uuid =
            localStorage.getItem("addressUUID") !== null ||
            localStorage.getItem("addressUUID") !== undefined
              ? localStorage.getItem("addressUUID")
              : null;
        }
      }
    },

    // address functions

    getAllAdresses() {
      profile.getAllAdresses().then((res) => {
        this.addresses = res.data.items;
        // console.log("addresses", res);
        for (let index = 0; index < res.data.items.length; index++) {
          const element = res.data.items[index];
          const element2 = element.is_default;
          if (element2) {
            this.selectedAddress = element;
            localStorage.setItem(
              "globalAddressUUID",
              this.selectedAddress.uuid
            );
          }
        }
      });
    },
    // Countires
    getAllCountires() {
      auth.getAllCountires().then((res) => {
        this.countries = res.data.items;
      });
    },
    // getAllRegions
    getAllRegions() {
      profile.getAllRegions(this.form.country_id).then((res) => {
        this.regions = res.data.items;
        this.form.region_id = null;
        this.form.city_id = null;
      });
    },
    // Cities
    getAllCities() {
      profile.getAllCities(this.form.region_id).then((res) => {
        this.cities = res.data.items;
        this.form.city_id = null;
      });
    },

    // order-shipping page functions

    // createAdress
    createAdress() {
      let address_uuid = localStorage.getItem("globalAddressUUID");
      (this.form.is_sale_point = false),
        profile
          .createAdress(this.form)
          .then((res) => {
            this.sucessMsg(res.data.message);
            this.errors = {};
            this.getAllAdresses();
            this.showForm = false;
            // this.form = {};
            if (res.status == 200) {
              this.submitted = true;

              setTimeout(() => {
                this.getShippingFeesExist(address_uuid);
                this.expanded = false;
              }, 500);
            }
            localStorage.setItem("globalAddressUUID", res.data.items.uuid);
          })
          .catch((error) => {
            const err = Object.values(error)[2].data;
            this.errors = err.items;
            this.errMsg(err.message);
          });
    },
    localStoreAdresses() {
      // localStorage.setItem("guestAddressData", JSON.stringify(this.form));
      this.localClicked = true;

      if (
        this.form.country_id !== null &&
        this.form.region_id !== null &&
        this.form.city_id !== null &&
        this.form.address_line_1 !== null
      ) {
        this.sucessMsg(this.$t("cart.success"));
        this.submitted = true;
        setTimeout(() => {
          this.expanded = false;
        }, 500);
        this.postalError = false;
        // document.getElementsByClassName('feedsResult').innerHTML = ''
        // document.getElementsByClassName('feedsResult').classList.remove('d-block')
        // document.getElementsByClassName('feedsResult').classList.add('d-none')
        this.getGuestFirstShippingFees();

        this.localStoreFail = true;
      } else if (this.form.pin_code.length < 6 && this.form.pin_code !== "") {
        this.postalError = true;
      } else {
        this.postalError = false;
        this.errMsg(this.$t("cart.fillData"));
        this.localStoreFail = false;
      }
    },
    getSupplierAddress(supplierId) {
      // this.selectedAddress = supplierId;

      // console.log(this.supplierAddress);
      suppliers
        .getSupplierAddress(supplierId)
        .then((res) => {
          // console.log(res);
          // this.selectedSupplierAddresses = res.data.items;
          // console.log(this.cartItems);
          this.cartItems.forEach((item, index) => {
            if (item.supplier_id == supplierId)
              this.cartItems[index].supplier_addresses = res.data.items;
          });
          if (res.data.items.length == 0 || res.data.items == "") {
            this.availablePickup = false;
            // console.log(this.selectedInput.parentElement.parentElement);
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

            // this.selectedInput.parentElement.classList.add("d-none");
            //  console.log(this.selectedInput.parentElement.parentElement.querySelector('.feedsResult'));
            // console.log(this.selectedInput.parentElement.parentElement.querySelector(
            //   ".feedsResultShipping"
            // ));
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
    changeShipping($event) {
      let input = $event.target;

      this.selectedInput = input;
      // document.querySelector(".supplierAddresses").classList.remove("d-block");

      this.showBtnClicked = true;

      this.selectedInput.parentElement.parentElement.querySelector(
        ".pickupNoData"
      ).innerHTML = "";

      this.expanded = true;

      //  let address_uuid = localStorage.getItem("addressUUID");

      let myResult =
        this.selectedInput.parentElement.parentElement.querySelector(
          ".feedsResult"
        );

      let myPickupData =
        this.selectedInput.parentElement.parentElement.querySelector(
          ".supplierAddresses"
        );

      myPickupData.classList.remove("d-block");
      myPickupData.classList.add("d-none");

      let data = {
        country: this.form.country_id,
        governorate: this.form.region_id,
        city: this.form.city_id,
        // address_uuid: address_uuid,
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
          // this.firstFees = res.data.items;

          // this.shippingCartFee = Number(res.data.items.shepping_fee)
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    changePickup($event, supplier) {
      let input = $event.target;

      this.selectedInput = input;

      // let button = input.parentElement.nextElementSibling;
      // button.classList.add("d-block");

      this.showBtnClicked = false;
      // console.log(supplier);
      this.getSupplierAddress(supplier.supplier_id);

      this.selectedInput.parentElement.nextElementSibling.classList.remove(
        "d-none"
      );
      this.selectedInput.parentElement.nextElementSibling.classList.add(
        "d-block"
      );

      this.selectedInput.parentElement.parentElement
        .querySelector(".feedsResult")
        .classList.remove("d-none");
      this.selectedInput.parentElement.parentElement
        .querySelector(".feedsResult")
        .classList.add("d-block");

      this.selectedInput.parentElement.parentElement.querySelector(
        ".feedsResult"
      ).innerHTML = `${this.$t("profile.deleiveryFees")} 0.000 ${
        this.currency
      }`;

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
        } else if (
          element.shipping_type == 1 &&
          element.id == supplier.supplier_id
        ) {
          element.shipping_type = 0;
          element.point_of_sell_uuid = null;
        }
      }
    },

    //

    shippingStore(supplier) {
      let newRating = {
        id: supplier.supplier_id,
        supplier_id: supplier.supplier_id,
        shipping_type: 0,
        coupon:
          localStorage.getItem("cou") !== null
            ? localStorage.getItem("cou")
            : "",
        point_of_sell_uuid: null,
      };

      // console.log(supplier);

      this.$store.dispatch("suppliers/addSupplierToCart", {
        supplier: newRating,
      });

      let myControler = this.$store.state.suppliers.suppliers;
      for (let index = 0; index < myControler.length; index++) {
        const element = myControler[index].supplier;

        if (element.shipping_type == 0 && element.id == supplier.supplier_id) {
          element.shipping_type = 0;
          element.point_of_sell_uuid = null;
        } else if (
          element.shipping_type == 1 &&
          element.id == supplier.supplier_id
        ) {
          element.shipping_type = 0;
          element.point_of_sell_uuid = null;
        }
      }
    },

    orderType(supplier) {
      // console.log(supplier);
      localStorage.setItem("s_id", supplier);
      localStorage.setItem("type", this.ratingNum);
      // let storedAddress = localStorage.getItem("addressUUID");
      // let storedbuyerUserData = localStorage.getItem("buyerUserData");
      // if (storedAddress == undefined || storedAddress === "undefined") {
      //   localStorage.setItem("addressUUID", storedbuyerUserData.uuid);
      //   // alert('undefined')
      // }

      if (this.ratingNum.includes("0")) {
        this.deliverType = true;

        // supplierAddresses
        // this.selectedInput.parentElement.parentElement
        //   .querySelector(".feedsResult")
        //   .classList.add("d-none");
        // this.selectedInput.parentElement.parentElement
        //   .querySelector(".feedsResult")
        //   .classList.remove("d-block");

        // this.selectedInput.parentElement.parentElement
        //   .querySelector(".feedsResult")
        //   .nextElementSibling.classList.add("d-none");
        // this.selectedInput.parentElement.parentElement
        //   .querySelector(".feedsResult")
        //   .nextElementSibling.classList.remove("d-block");
      } else {
        this.deliverType = false;

        // this.selectedInput.parentElement.nextElementSibling.classList.remove(
        //   "d-none"
        // );
        // this.selectedInput.parentElement.nextElementSibling.classList.add(
        //   "d-block"
        // );

        // this.selectedInput.parentElement.parentElement
        //   .querySelector(".feedsResult")
        //   .classList.remove("d-none");
        // this.selectedInput.parentElement.parentElement
        //   .querySelector(".feedsResult")
        //   .classList.add("d-block");

        // this.selectedInput.parentElement.parentElement.querySelector(
        //   ".feedsResult"
        // ).innerHTML = `${this.$t("profile.deleiveryFees")} 0.000 ${
        //   this.currency
        // }`;
      }
    },
    getShippingFeesExist() {
      // let address_uuid = localStorage.getItem("addressUUID");

      // let myResult =
      //   this.selectedInput.parentElement.nextElementSibling.nextElementSibling
      //     .nextElementSibling;

      // let data = {
      //   country: this.form.country_id,
      //   governorate: this.form.region_id,
      //   city: this.form.city_id,
      //   address_uuid: address_uuid,
      //   supplier_id: localStorage.getItem("s_id"),
      // };
      // suppliers
      //   .getShippingFees(data)
      //   .then((res) => {
      //     this.sucessMsg(res.data.message);

      //     myResult.innerHTML =
      //       this.$t("profile.deleiveryFees") +
      //       Number(res.data.items.price).toFixed(3) +
      //       " " +
      //       this.currency;

      //     if (res.data.items == [] || res.data.items == "") {
      //       myResult.innerHTML = this.$t("profile.deliveryFeesText");
      //     }

      //     this.errors = [];
      //     this.firstFees = res.data.items;
      //   })
      //   .catch((error) => {
      //     const err = Object.values(error)[2].data;
      //     this.errors = err.items;
      //     this.errMsg(err.message);
      //   });

      let address_uuid = this.buyerUserData.uuid;

      suppliers
        .getLoggedFirstShippingFees(address_uuid)
        .then((res) => {
          // console.log(res);
          this.firstFees = res.data.items;
          this.sucessMsg(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          let error = Object.values(err)[2].data;
          this.errors = error.items;
          this.errMsg(error.message);
        });
    },
    getShippingFeesNew() {
      // console.log(
      //   "getShippingFeesNew",
      //   (this.selectedInput.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML =
      //     res.data.items.price)
      // );
      // let address_uuid = localStorage.getItem("addressUUID");
      // let myResult =
      //   this.selectedInput.parentElement.nextElementSibling.nextElementSibling
      //     .nextElementSibling;
      // let data = {
      //   country: this.form.country_id,
      //   governorate: this.form.region_id,
      //   city: this.form.city_id,
      //   // address_uuid: address_uuid,
      //   supplier_id: localStorage.getItem("s_id"),
      // };
      // suppliers
      //   .getLoggedFirstShippingFees(data)
      //   .then((res) => {
      //     this.sucessMsg(res.data.message);
      //     this.deliveryText = res.data.items.price
      //     this.selectedInputText = res.data.items.price;
      //     this.firstFees = res.data.items;
      //     myResult.innerHTML =
      //       this.$t("profile.deleiveryFees") +
      //       Number(res.data.items.price).toFixed(3) +
      //       " " +
      //       this.currency;
      //     if (res.data.items == [] || res.data.items == "") {
      //       myResult.innerHTML = this.$t("profile.deliveryFeesText");
      //     }
      //     this.errors = [];
      //     this.firstFees = res.data.items;
      //   })
      //   .catch((error) => {
      //     const err = Object.values(error)[2].data;
      //     this.errors = err.items;
      //     this.errMsg(err.message);
      //   });
      // this.getLoggedFirstShippingFees()
    },
    getLoggedFirstShippingFees() {
      suppliers
        .getFirstShippingFees(this.buyerUserData.address_uuid)
        .then((res) => {
          // console.log("new", res);

          this.firstFees = res.data.items;
          this.sucessMsg(res.data.message);
          // for (let index = 0; index < res.data.items.length; index++) {
          //   const element = res.data.items[index].shipping_fee;
          //   console.log("getLoggedFirstShippingFees", element);
          // }

          // this.totalFees =

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
          this.errMsg(err.message);
        });
    },
    getGuestFirstShippingFees() {
      let data = {
        country: this.form.country_id,
        governorate: this.form.region_id,
        city: this.form.city_id,
      };
      suppliers
        .getGuestFirstShippingFees(data)
        .then((res) => {
          // console.log(res);
          this.firstFees = res.data.items;
          this.sucessMsg(res.data.message);

          // for (let index = 0; index < res.data.items.length; index++) {
          //   const element = res.data.items[index].shipping_fee;
          //   console.log("element guest", element);
          // }
        })
        .catch((err) => {
          console.log(err);
          let error = Object.values(err)[2].data;
          this.errors = error.items;
          this.errMsg(err.message);
        });
    },
    checkSupplierFees(supplier) {
      let data = {
        address_uuid: this.supplierAddress,
        supplier_id: supplier.supplier_id,
      };
      suppliers
        .checkSupplierFees(data)
        .then((res) => {
          // this.firstFees = res.data.items;
          this.sucessMsg(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          let error = Object.values(err)[2].data;
          this.errors = error.items;
          this.errMsg(err.message);
        });
    },
    toggleOptionsSelect() {
      this.showBtnClicked = true;
    },
    closeOptions() {
      // this.showBtnClicked = false;
      this.expanded = false;
    },

    //payment

    async payment() {
      // let test = localStorage.getItem('type');
      // console.log("test.length" , test.length);
      // console.log("this.mySuppliers.suppliers.length" , this.mySuppliers.suppliers.length);
      // if(this.mySuppliers.suppliers.length !== test){
      //   alert('choose all')
      // }
      // if (
      //   this.mySuppliers.suppliers == null ||
      //   this.mySuppliers.suppliers == ""
      // ) {
      //   alert('select suppliers first')
      // }

      // this.paymentFormData.country_code = this.buyerUserData.country_code
      //   ? this.buyerUserData.country_code
      //   : "";

      if (
        this.paymentFormData.address_uuid == "" ||
        !this.paymentFormData.address_uuid ||
        this.paymentFormData.address_uuid == undefined
      ) {
        this.paymentFormData.address_uuid =
          localStorage.getItem("globalAddressUUID");
      }

      suppliers
        .payment(this.paymentFormData)
        .then((res) => {
          this.sucessMsg(res.data.message);
          if (this.paymentFormData.payment_type === "visa") {
            setTimeout(() => {
              this.$router.push({
                path: "/visa-checkout-details",
                query: {
                  order_serial: res.data.items.order.order_serial,
                  date: res.data.items.order.created_at,
                  total_price: res.data.items.order.total_price,
                  payment_type: res.data.items.order.payment_type,
                  payment: res.data.items.order.payment,
                  uuid: res.data.items.order.uuid,
                  redirectURL: res.data.items.url,

                  // window.location.href = res.data.items.url;
                },
              });
            }, 500);
          } else {
            // console.log(res.data);
            if (this.buyerUserData) {
              setTimeout(() => {
                this.$router.push({
                  path: "/checkout-details",
                  query: {
                    order_serial: res.data.items.order_serial,
                    date: res.data.items.created_at,
                    total_price: res.data.items.total_price,
                    payment_type: res.data.items.payment_type,
                    payment: res.data.items.payment,
                    uuid: res.data.items.uuid,
                    orderId: res.data.items.id,
                  },
                });
              }, 500);
            }
          }
        })
        .catch((err) => {
          const errors = Object.values(err)[2].data;
          this.errors = errors.items;
          console.log(err);
          this.errMsg(errors.message);
        });
    },
    guestPayment() {
      // alert("clicked");
      let data = {
        first_name: this.paymentFormData.first_name,
        last_name: this.paymentFormData.last_name,
        company_name: this.paymentFormData.company_name,
        email: this.paymentFormData.email,
        payment_type: this.paymentFormData.payment_type,
        phone: this.paymentFormData.phone,
        country: this.form.country_id,
        governorate: this.form.region_id,
        city: this.form.city_id,
        accept_terms: this.paymentFormData.accept_terms == true ? "1" : "0",
        building_number: this.form.building_number,
        floor: this.form.floor,
        apartment: this.form.apartment,
        pin_code: this.form.pin_code,
        address_line_1: this.form.address_line_1,
        notes: this.paymentFormData.comment,
        suppliers: this.mySuppliers.suppliers,
        country_code: this.paymentFormData.country_code,
        redirect_url: this.paymentFormData.redirect_url,
      };

      // if (this.localStoreFail == false) {
      //   this.localStoreFail = true;
      // } else {

      // }
      suppliers
        .guestPayment(data)
        .then((res) => {
          this.sucessMsg(res.data.message);
          if (this.paymentFormData.payment_type === "visa") {
            setTimeout(() => {
              this.$router.push({
                path: "/visa-checkout-details",
                query: {
                  order_serial: res.data.items.order.order_serial,
                  date: res.data.items.order.created_at,
                  total_price: res.data.items.order.total_price,
                  payment_type: res.data.items.order.payment_type,
                  payment: res.data.items.order.payment,
                  uuid: res.data.items.order.uuid,
                  redirectURL: res.data.items.url,

                  // window.location.href = res.data.items.url;
                },
              });
            }, 500);
          } else {
            // console.log(res.data);
            if (this.buyerUserData) {
              setTimeout(() => {
                this.$router.push({
                  path: "/checkout-details",
                  query: {
                    order_serial: res.data.items.order_serial,
                    date: res.data.items.created_at,
                    total_price: res.data.items.total_price,
                    payment_type: res.data.items.payment_type,
                    payment: res.data.items.payment,
                    uuid: res.data.items.uuid,
                    orderId: res.data.items.id,
                  },
                });
              }, 500);
            } else {
              setTimeout(() => {
                this.$router.push("/success-checkout");
              }, 500);
            }
          }
        })
        .catch((err) => {
          const errors = Object.values(err)[2].data;
          this.errors = errors.items;
          console.log(err);
          this.errMsg(errors.message);
        });
    },
    paymentGetAllCountires() {
      auth.getAllCountires().then((res) => {
        this.paymentCountries = res.data.items;
      });
    },
    // getAllRegions
    paymentGetAllRegions() {
      profile.getAllRegions(this.paymentFormData.country).then((res) => {
        this.paymentRegions = res.data.items;
        this.form.region_id = null;
        this.form.city_id = null;
      });
    },
    // Cities
    paymentGetAllCities() {
      profile.getAllCities(this.paymentFormData.governorate).then((res) => {
        this.paymentCities = res.data.items;
        this.form.city_id = null;
      });
    },
    getTerms() {
      auth.termsAndCondations().then((res) => {
        // console.log("terms", res);
        this.condations = res.data.items;
      });
    },
    acceptMyTerms() {
      this.paymentFormData.accept_terms = true;
    },
    getWallet() {
      profile
        .getWallet()
        .then((res) => {
          this.walletData = res.data.items.balnce;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    // cartItems() {
    //   return this.newCartData
    //     ? this.newCartData
    //     : this.$store.state.cart.cartItems;
    // },
    // cart_sub_total() {
    //   return this.total_cart.cart_sub_total
    //     ? this.total_cart.cart_sub_total
    //     : this.$store.state.cart.cart_sub_total;
    // },
    // totalDiscount() {
    //   return this.priceData.cart_sub_total_disc
    //     ? this.priceData.cart_sub_total_disc
    //     : 0;
    // },
    // totalPayment() {
    //   return this.total_cart.cart_sub_total_after_disc
    //     ? this.total_cart.cart_sub_total_after_disc
    //     : this.cart_sub_total;
    // },
    newPrice() {
      return this.total_cart;
    },

    freeDeliveryStatus() {
      return sessionStorage.setItem("freeDelivery", this.freeDelivery);
    },

    //payment

    // cartItems() {
    //   return this.$store.state.cart.cartItems;
    // },
    // cart_sub_total() {
    //   return this.$store.state.cart.cart_sub_total;
    // },
    cartTest() {
      return this.$store.state.cart;
    },
    // totalPayment() {
    //   return parseInt(this.cart_sub_total) - parseInt(this.discount);
    // },
    // discount() {
    //   return localStorage.getItem("discount")
    //     ? localStorage.getItem("discount")
    //     : 0;
    // },
    checkType() {
      return localStorage.getItem("type").includes("1");
    },
    mySuppliers() {
      return this.$store.state.suppliers;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~/src/assets/scss/_cartStyle.scss";
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
</style>
