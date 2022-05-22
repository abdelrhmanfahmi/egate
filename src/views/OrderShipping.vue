<template>
  <div :class="$i18n.locale">
    <!-- <div class="block" v-for="(product, index) in products" :key="index">
      <h3>{{ product.name }}</h3>
      <p>Desc: {{ product.description }}</p>
      <p>Price: £{{ product.price }}</p>
      <h3>Rating</h3>
      <form @change="selectType(product, index)">
        <input
          type="radio"
          value="first"
          :name="'types-' + index"
          v-model="ratingNum[index]"
        />1
        <input
          type="radio"
          value="second"
          :name="'types-' + index"
          v-model="ratingNum[index]"
        />2
        <input
          type="radio"
          value="thirs"
          :name="'types-' + index"
          v-model="ratingNum[index]"
        />3
        <input
          type="radio"
          value="fourth"
          :name="'types-' + index"
          v-model="ratingNum[index]"
        />4
        <input
          type="radio"
          value="fifth"
          :name="'types-' + index"
          v-model="ratingNum[index]"
        />5
        <input
          type="radio"
          value="sixth"
          :name="'types-' + index"
          v-model="ratingNum[index]"
        />6
        <input type="submit" />
      </form>
    </div> -->
    <div class="container my-5">
      <h3 class="font-weight-bold">
        {{ $t("payment.delivery") }} / {{ $t("payment.pickup") }}
      </h3>
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <div class="cart-table p-5">
            <div
              class="supplier mt-4"
              v-for="(supplier, index) in cartItems"
              :key="index"
            >
              <div class="row">
                <div class="col-md-4 col-sm-12 mb-2">
                  <h5 class="name">
                    {{ supplier.supplier_name }}
                  </h5>
                </div>
                <div class="col-md-8 col-sm-12 mb-4">
                  <form @change="ordeType(supplier.supplier_id)" class="d-flex">
                    <label>
                      <input
                        @change="changeShippping"
                        type="radio"
                        value="0"
                        :name="'types-' + index"
                        v-model="ratingNum[index]"
                        checked
                      />
                      <span class="mx-2">{{ $t("payment.delivery") }}</span>
                    </label>
                    <label>
                      <input
                        @input="getSupplierAddress(supplier.supplier_id)"
                        @change="changePackUp"
                        type="radio"
                        value="1"
                        :name="'types-' + index"
                        v-model="ratingNum[index]"
                      />
                      <span>{{ $t("payment.pickup") }}</span>
                    </label>
                    <b-form-select
                      @input="selectAddressUUID"
                      @change="selectType(supplier, index)"
                      class="w-100 mt-2 supplierAddresses d-none"
                    >
                      <b-form-select-option
                        v-for="(address, index) in selectedSupplierAddresses"
                        :key="index"
                        :value="address"
                        >{{ address.country.title }} ,
                        {{ address.region.title }} ,
                        {{ address.city.title }}
                      </b-form-select-option>
                    </b-form-select>
                    <span class="feedsResult"></span>
                  </form>
                </div>
              </div>
              <!-- <hr class="divider" /> -->
            </div>
          </div>
          <div class="" v-if="deliverType == false">
            <router-link to="/payment">
              <button
                class="m-0 mt-4 py-3 px-5 text-white text-center btn-block"
                :class="{
                  'login-button dark': supplierAddress,
                  'login-button': !supplierAddress,
                }"
                :disabled="!supplierAddress"
              >
                {{ $t("cart.checkout") }}
              </button>
            </router-link>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="addresses-holder p-5" v-if="deliverType == true">
            <div class="addresses mb-5">
              <form>
                <label>
                  <input
                    type="radio"
                    value="newAddress"
                    name="radio"
                    v-model="selectAddressShape"
                    checked
                  />
                  <span>{{ $t("profile.newAddress") }}</span>
                </label>
                <label v-if="userData">
                  <input
                    type="radio"
                    value="existingAddresses"
                    name="radio"
                    v-model="selectAddressShape"
                  />
                  <span>{{ $t("payment.selectExist") }}</span>
                </label>
                <span v-if="selectAddressShape === 'existingAddresses'">
                  <b-form-select
                    v-model="selectedAddress"
                    class="pickupAddresses"
                    @input="changeAddress"
                    placeholder="test"
                  >
                    <b-form-select-option
                      selected
                      disabled
                      :value="$t('payment.selectExist')"
                      >{{ $t("payment.selectExist") }}</b-form-select-option
                    >

                    <b-form-select-option
                      v-for="(address, index) in addresses"
                      :key="index"
                      :value="address"
                      >{{ address.country.title }} ,
                      {{ address.region.title }} ,
                      {{ address.city.title }}
                    </b-form-select-option>
                  </b-form-select>
                </span>
              </form>
            </div>
            <div class="addressShape">
              <div
                class="newAddress"
                v-if="selectAddressShape === 'newAddress'"
              >
                <form class="account-information-form">
                  <b-row class="justify-content-center">
                    <!-- country  -->
                    <b-col lg="12">
                      <b-form-group>
                        <!-- <label>{{ $t("profile.country") }}</label> -->

                        <b-form-select
                          v-model="form.country_id"
                          @input="getAllRegions"
                        >
                          <b-form-select-option value="null" disabled
                            >{{ $t("profile.country") }}
                            <span class="requried text-danger">*</span>
                          </b-form-select-option>
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

                        <div
                          class="error"
                          v-for="(error, index) in errors.country"
                          :key="index"
                        >
                          {{ error }}
                        </div>
                      </b-form-group>
                    </b-col>
                    <!-- regions -->
                    <b-col lg="6">
                      <b-form-group>
                        <!-- <label>{{ $t("profile.region") }}</label>
                        <span class="requried">*</span> -->
                        <b-form-select
                          v-model="form.region_id"
                          :disabled="!form.country_id"
                          @input="getAllCities"
                        >
                          <b-form-select-option value="null" disabled
                            >{{ $t("profile.region") }}
                            <span class="requried text-danger">*</span>
                          </b-form-select-option>
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

                        <div
                          class="error"
                          v-for="(error, index) in errors.governorate"
                          :key="index"
                        >
                          {{ error }}
                        </div>
                      </b-form-group>
                    </b-col>
                    <!-- cities -->
                    <b-col lg="6">
                      <b-form-group>
                        <!-- <label>{{ $t("profile.city") }}</label>
                        <span class="requried text-danger">*</span> -->
                        <b-form-select
                          v-model="form.city_id"
                          :disabled="!form.country_id || !form.region_id"
                        >
                          <b-form-select-option value="null" disabled
                            >{{ $t("profile.city") }}
                            <span class="requried text-danger">*</span>
                          </b-form-select-option>
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
                        <div
                          class="error"
                          v-for="(error, index) in errors.city"
                          :key="index"
                        >
                          {{ error }}
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
                          v-model="form.street"
                          :placeholder="$t('profile.streetNumber') + '*'"
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
                          :placeholder="$t('profile.homeNumber') + '*'"
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
                    <!-- floor  -->
                    <b-col lg="6">
                      <b-form-group>
                        <!-- <label for="floor">{{ $t("profile.floor") }}</label>
                        <span class="requried">*</span> -->
                        <b-form-input
                          id="floor"
                          v-model="form.floor"
                          :placeholder="$t('profile.floor') + '*'"
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
                          :placeholder="$t('profile.blockNumber') + '*'"
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
                          v-model="form.pin_code"
                          :placeholder="$t('profile.postCode') + '*'"
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
                    <!-- note  -->
                    <b-col lg="12">
                      <b-form-group>
                        <label for="textarea">{{ $t("profile.note") }}</label>
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
                    </b-col>
                  </b-row>

                  <b-button
                    v-if="userData"
                    type="submit"
                    @click.prevent="createAdress()"
                    class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto"
                  >
                    {{ $t("register.submit") }}
                  </b-button>
                  <b-button
                    v-else
                    type="submit"
                    @click.prevent="localStoreAdresses()"
                    class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto mx-2"
                  >
                    {{ $t("register.submit") }}
                  </b-button>
                  <router-link
                    v-if="submitted"
                    to="/payment"
                    class="login-button dark m-0 mt-4 ml-4 py-3 px-5 text-white text-center w-auto mx-2"
                  >
                    {{ $t("cart.checkout") }}
                  </router-link>

                  <button
                    @click.prevent="getShippingFeesNew"
                    to="/payment"
                    class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto mx-2"
                  >
                    {{ $t("cart.checkFees") }}
                  </button>
                </form>
              </div>

              <div
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
                      <!-- country  -->
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
                      <!-- regions -->
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
                      <!-- cities -->
                      <b-col lg="6">
                        <b-form-group>
                          <label>{{ $t("profile.city") }}</label>
                          <span class="requried">*</span>
                          <b-form-select v-model="newForm.city_id" disabled>
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
                      <!-- street number  -->
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
                      <!-- home number  -->
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
                            v-for="(error, index) in errors.building_number"
                            :key="index"
                          >
                            {{ error }}
                          </div>
                        </b-form-group>
                      </b-col>
                      <!-- floor  -->
                      <b-col lg="6">
                        <b-form-group>
                          <label for="floor">{{ $t("profile.floor") }}</label>
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
                      <!-- block number   -->
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
                      <!-- post code  -->
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
                          <label for="textarea">{{ $t("profile.note") }}</label>
                          <b-form-textarea
                            id="textarea"
                            size="lg"
                            disabled
                            v-model="form.notes"
                          ></b-form-textarea>
                        </b-form-group>
                      </b-col>
                      <!-- note  -->
                    </b-row>

                    <router-link
                      to="/payment"
                      class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto"
                    >
                      {{ $t("cart.checkout") }}
                    </router-link>
                    <button
                      @click.prevent="getShippingFeesExist"
                      class="login-button dark m-0 mt-4 py-3 px-5 text-white text-center w-auto mx-2"
                    >
                      {{ $t("cart.checkFees") }}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div class="" v-else></div>
        </div>
      </div>
    </div>
    <!-- {{ ratingNum }} -->
  </div>
</template>

<script>
import globalAxios from "@/services/global-axios";
import auth from "@/services/auth";
import profile from "@/services/profile";
import suppliers from "@/services/suppliers";
export default {
  data() {
    return {
      ratingNum: [],
      // loggedUser: {
      //   email: "test@test",
      // },
      // products: [
      //   {
      //     name: "Product A",
      //     description: "desc A",
      //     price: 2,
      //   },
      //   {
      //     name: "Product B",
      //     description: "desc B",
      //     price: 3,
      //   },
      // ],
      cartItems: null,
      deliverType: null,
      selectAddressShape: null,
      form: {
        country_id: null,
        region_id: null,
        city_id: null,
        building_number: null,
        floor: null,
        apartment: null,
        pin_code: null,
        notes: null,
        // address_uuid: null,
        street: null,
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
        street: null,
      },
      countries: [],
      cities: [],
      regions: [],
      errors: {},
      newAddressOption: null,
      options: [
        { value: null, text: "Please select an option", disabled: true },
        { value: "a", text: "This is First option" },
        { value: "b", text: "Selected Option" },
      ],
      selectedAddress: null,
      addresses: null,
      submitted: false,
      supplierAddress: null,
      selectedSupplierAddresses: null,
      selectedInput: null,
      suppier_id: null,
      selectedInputText: "",
    };
  },
  methods: {
    changeAddress() {
      this.newForm = this.selectedAddress;
      // console.log("old selected address", this.selectedAddress);
      // localStorage.setItem(
      //   "guestAddressData",
      //   JSON.stringify(this.selectedAddress)
      // );
      localStorage.setItem("addressUUID", this.selectedAddress.uuid);
    },
    selectAddressUUID(myselectAddressUUID) {
      this.supplierAddress = myselectAddressUUID.uuid;
      this.address_uuid = myselectAddressUUID.uuid;
      localStorage.setItem("addressUUID", myselectAddressUUID.uuid);
    },
    selectType: function (supplier, index) {
      // console.log(this.supplierAddress);
      let newRating = {
        // name: supplier.supplier_name,
        id: supplier.supplier_id,
        supplier_id: supplier.supplier_id,
        shipping_type: this.ratingNum[index],
        coupon: supplier.coupon ? supplier.coupon : "",
        point_of_sell_uuid: this.supplierAddress,
        // supplier_address_uuid: this.supplierAddress
        //   ? this.supplierAddress.uuid
        //   : localStorage.getItem('addressUUID'),
      };
      this.$store.dispatch("suppliers/addSupplierToCart", {
        supplier: newRating,
      });
      // console.log(newRating);
      // console.log(supplier);
      const type = document.querySelectorAll(`input[name="types-${index}"]`);
      // let myArray = [];
      for (const f of type) {
        if (f.checked) {
          // let myArray = [f.value]
          // console.log(JSON.stringify(f.value));
          // console.log(myArray);
        }
      }
      // localStorage.setItem("suppliers", JSON.stringify(supplier.supplier_id));
    },

    getCartProducts() {
      this.loading = true;
      globalAxios.post(`cart`).then((res) => {
        this.cartItems = res.data.items.cart_items;
      });
      this.loading = false;
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
            localStorage.setItem("addressUUID", this.selectedAddress.uuid);
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
        this.form.region_id = "";
        this.form.city_id = "";
      });
    },
    // Cities
    getAllCities() {
      profile.getAllCities(this.form.region_id).then((res) => {
        this.cities = res.data.items;
        this.form.city_id = "";
      });
    },

    // createAdress
    createAdress() {
      (this.form.is_sale_point = false),
        profile
          .createAdress(this.form)
          .then((res) => {
            this.sucessMsg(res.data.message);
            this.errors = {};
            this.getAllAdresses();
            this.showForm = false;
            this.form = {};
            if (res.status == 200) {
              this.submitted = true;
            }
            localStorage.setItem("addressUUID", res.data.items.uuid);
          })
          .catch((error) => {
            const err = Object.values(error)[2].data;
            this.errors = err.items;
            this.errMsg(err.message);
          });
    },
    localStoreAdresses() {
      // localStorage.setItem("guestAddressData", JSON.stringify(this.form));

      if (
        this.form.country_id !== null &&
        this.form.region_id !== null &&
        this.form.city_id !== null &&
        this.form.pin_code !== null
      ) {
        this.sucessMsg(this.$t("cart.success"));
        this.submitted = true;
      } else {
        this.errMsg(this.$t("cart.fillData"));
      }
    },
    getSupplierAddress(supplierId) {
      this.selectedAddress = supplierId;
      // console.log(this.supplierAddress);
      suppliers
        .getSupplierAddress(supplierId)
        .then((res) => {
          // console.log(res);
          this.selectedSupplierAddresses = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePackUp($event) {
      let input = $event.target;

      this.selectedInput = input;

      let button = input.parentElement.nextElementSibling;
      button.classList.add("d-block");
    },
    changeShippping($event) {
      let input = $event.target;

      this.selectedInput = input;
      document.querySelector(".supplierAddresses").classList.remove("d-block");
    },
    ordeType(supplier) {
      console.log(supplier);
      localStorage.setItem("s_id", supplier);
      localStorage.setItem("type", this.ratingNum);
      // let storedAddress = localStorage.getItem("addressUUID");
      // let storedUserData = localStorage.getItem("userData");
      // if (storedAddress == undefined || storedAddress === "undefined") {
      //   localStorage.setItem("addressUUID", storedUserData.uuid);
      //   // alert('undefined')
      // }
      if (this.ratingNum.includes("0")) {
        this.deliverType = true;
      } else {
        this.deliverType = false;
      }
    },
    getShippingFeesExist() {
      let address_uuid = localStorage.getItem("addressUUID");

      let myResult =
        this.selectedInput.parentElement.nextElementSibling.nextElementSibling
          .nextElementSibling;

      let data = {
        country: this.form.country_id,
        governorate: this.form.region_id,
        city: this.form.city_id,
        address_uuid: address_uuid,
        supplier_id: localStorage.getItem("s_id"),
      };
      suppliers
        .getShippingFees(data)
        .then((res) => {
          this.sucessMsg(res.data.message);

          myResult.innerHTML =
            this.$t("profile.deleiveryFees") +
            +Number(res.data.items.price).toFixed(3) +
            " " +
            this.currency;

          if (res.data.items == [] || res.data.items == "") {
            if (res.data.items == [] || res.data.items == "") {
              myResult.innerHTML = this.$t("profile.deliveryFeesText");
            }
          }

          this.errors = [];
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    getShippingFeesNew() {
      // console.log(
      //   "getShippingFeesNew",
      //   (this.selectedInput.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML =
      //     res.data.items.price)
      // );
      // let address_uuid = localStorage.getItem("addressUUID");

      let myResult =
        this.selectedInput.parentElement.nextElementSibling.nextElementSibling
          .nextElementSibling;

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
          this.sucessMsg(res.data.message);
          // this.deliveryText = res.data.items.price
          this.selectedInputText = res.data.items.price;

          myResult.innerHTML =
            this.$t("profile.deleiveryFees") +
            +Number(res.data.items.price).toFixed(3) +
            " " +
            this.currency;

          if (res.data.items == [] || res.data.items == "") {
            if (res.data.items == [] || res.data.items == "") {
              myResult.innerHTML = this.$t("profile.deliveryFeesText");
            }
          }

          this.errors = [];
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
  },
  mounted() {
    this.getCartProducts();
    this.getAllCountires();
    this.getAllAdresses();
    localStorage.removeItem("s_id");

    // let checkTypes = localStorage.getItem('type');
    // if(checkTypes.includes('1')){
    //   alert('pickup')
    // }
  },
  computed: {
    supplierCart() {
      return this.$store.state.suppliers;
    },
  },
};
</script>
<style lang="scss" scoped>
$primary-color: #00005c; // Change color here. C'mon, try it!
$text-color: mix(#000, $primary-color, 64%);
form {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

label {
  display: flex;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin: 0px 20px 0.375em 0;
  /* Accessible outline */
  /* Remove comment to use */
  /*
		&:focus-within {
				outline: .125em solid $primary-color;
		}
	*/
  input {
    position: absolute;

    &:checked + span {
      /* background-color: mix(#fff, $primary-color, 84%); */
      &:before {
        box-shadow: inset 0 0 0 0.4375em $primary-color;
      }
    }
  }

  span {
    display: flex;
    align-items: center;
    padding: 0.375em 0.75em 0.375em 0.375em;
    border-radius: 99em; // or something higher...
    transition: 0.25s ease;
    &:hover {
      background-color: mix(#fff, $primary-color, 84%);
    }
    &:before {
      display: flex;
      flex-shrink: 0;
      content: "";
      background-color: #fff;
      width: 1.5em;
      height: 1.5em;
      border-radius: 50%;
      margin-right: 0.375em;
      transition: 0.25s ease;
      box-shadow: inset 0 0 0 0.125em $primary-color;
      margin: 0 5px;
    }
  }
}
.address-book {
  padding-top: 40px;
  .main-header {
    text-transform: uppercase;
  }
  .add-address {
    font-size: 17px;
    color: #312620;
    margin: 15px 0;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    &:hover {
      color: $main-color;
    }
    span {
      font-size: 23px;
      font-weight: 600;
    }
  }
  .account-information-form {
    padding: 20px 0;
    .login-button {
      margin: 30px 0px;
      width: 20%;
    }
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
}

html:lang(ar) {
  .address-book {
    text-align: right;
  }
}
.addresses-holder {
  .addressShape {
    label {
      overflow: auto;
      margin: 0;
      display: inline-block;
    }
  }
}
.en {
  label {
    input {
      left: -100%;
    }
  }
}
.ar {
  label {
    input {
      left: 100%;
    }
  }
}
.pickupAddresses {
  min-width: 250px;
}
.cart-table,
.addresses-holder {
  background: #ecf0f1;
  padding: 5% 2%;
  margin: 2% 0;
  border-radius: 20px;
}
.supplier {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: #555555;
    width: 100%;
    height: 1.5px;
  }
  &::after:last-child {
    display: none !important;
  }
}

.divider {
  height: 3px;
  &:last-of-type {
    display: none;
  }
}
.name {
  color: #6e6e6e;
  font-weight: 600;
}
input,
input:active,
select,
textarea {
  border: none;
  outline: none;
  box-shadow: none;
  border-radius: 15px;
  &:focus {
    box-shadow: 0 0 0 0.1rem #6e6e6e;
  }
}
.feedsResult {
  font-size: 19px;
  text-transform: capitalize;
  font-weight: bold;
  margin: 20px;
}
</style>
