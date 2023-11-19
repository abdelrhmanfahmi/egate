<template>
  <div class="checkoutStep">
    <v-row>
      <v-col cols="12" md="7" lg="7" sm="12" class="myCol">
        <div class="form-holder">
          <Form @submit="submitDataForm">
            <div class="shipping-address-data">
              <h4 class="my-5">Address Book</h4>
              <v-row>
                <v-col cols="12" lg="4" md="4" sm="12">
                  <Field @change="getCountryId" class="form-control styleSelects mb-3" name="country_id"
                    :rules="isRequired" as="select" v-model="form.country_id">
                    <option disabled value="">Country</option>
                    <option v-for="(country, idx) in countries" :key="idx" :value="country.id">{{ country.name_en }}
                    </option>
                  </Field>
                  <ErrorMessage class="text-danger" name="country_id" />
                </v-col>

                <v-col cols="12" lg="4" md="4" sm="12">
                  <Field @change="getCityId" id="governorate_id" class="form-control styleSelects mb-3"
                    name="governorate_id" :rules="isRequired" as="select" v-model="form.governorate_id">
                    <option disabled selected value="">State</option>
                    <option v-for="(state, idx) in states" :key="idx" :value="state.id">{{ state.name_en }}</option>
                  </Field>
                  <ErrorMessage class="text-danger" name="governorate_id" />
                </v-col>

                <v-col cols="12" lg="4" md="4" sm="12">
                  <Field class="form-control styleSelects mb-3" name="city_id" :rules="isRequired" as="select"
                    v-model="form.city_id">
                    <option disabled selected value="">City</option>
                    <option v-for="(city, idx) in cities" :key="idx" :value="city.id">{{ city.name_en }}</option>
                  </Field>
                  <ErrorMessage class="text-danger" name="city_id" />
                </v-col>

                <v-col cols="12" lg="12" md="12" sm="12">
                  <Field name="address" id="address" hide-details="true" v-model="form.address"
                    class="w-100 form-control styleSelects mb-3" placeholder="Address" type="text" :rules="isRequired" />
                  <ErrorMessage class="text-danger" name="address" />
                </v-col>

                <v-col cols="12" lg="4" md="4" sm="12">
                  <Field name="first_name" id="firstName" hide-details="true" placeholder="First Name"
                    class="w-100 form-control styleSelects mb-3" :rules="isRequired" v-model="form.first_name" />
                  <ErrorMessage class="text-danger" name="first_name" />
                </v-col>

                <v-col cols="12" lg="4" md="4" sm="12">
                  <Field name="last_name" id="lastName" hide-details="true" placeholder="Last Name"
                    class="w-100 form-control styleSelects mb-3" :rules="isRequired" v-model="form.last_name" />
                  <ErrorMessage class="text-danger" name="last_name" />
                </v-col>

                <v-col cols="12" lg="4" md="4" sm="12">
                  <Field name="mobile" id="phone" hide-details="true" placeholder="Mobile Number"
                    class="w-100 form-control styleSelects mb-3" type="number" :rules="isRequired"
                    v-model="form.mobile" />
                  <ErrorMessage class="text-danger" name="mobile" />
                </v-col>
              </v-row>
            </div>
            <v-row class="mt-11">
              <v-col cols="12" md="6" sm="12">
                <v-btn to="/cart" class="return-btn">
                  <v-icon icon="mdi-chevron-left"></v-icon>Return To Cart
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" sm="12" class="text-black">
                <v-btn class="bg-main text-white" type="submit">Continue To Checkout <v-icon
                    icon="mdi-chevron-right"></v-icon></v-btn>
              </v-col>
            </v-row>
          </Form>
        </div>
      </v-col>
      <v-col cols="12" md="5" lg="5" sm="12" class="myCol bordered-left">
        <CartExistData :cartItems="cartItems" :cartTotalPrice="cartTotalPrice" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import globalApis from "@/services/globalApis";
import CartExistData from "./CartExistData.vue";
import { useToast } from "vue-toastification";
import { Form, Field, ErrorMessage } from 'vee-validate';
import globalAxios from "@/services/global-axios";
export default {
  components: {
    CartExistData,
    Field,
    Form,
    ErrorMessage
  },
  mounted() {
    this.getCountriesData();
  },
  data() {
    return {
      countries: [],
      states: [],
      cities: [],
      form: {
        country_id: null,
        city_id: null,
        governorate_id: null,
        address: null,
        first_name: null,
        last_name: null,
        mobile: null,
      },
      cartItems: [],
      cartTotalPrice: 0
    };
  },
  methods: {
    isRequired(value) {
      if (value) {
        return true;
      }

      return 'This field is required';
    },
    async submitDataForm(values, { resetForm }) {
      console.log(values);
      const toast = useToast();
      try {
        const response = await globalAxios.post('client/address-books', values);
        if (response.data.code == 200) {
          toast.success(`Address Book Stores Successfully`, {
            position: "top-right",
            transition: "slide",
            hideProgressBar: false,
            showIcon: true,
            timeout: 3000,
            showCloseButton: true,
            swipeClose: true,
          });
          resetForm();
          this.$emit("changeSteper", 2);
        }
      } catch (e) {
        toast.error(`${e.response.data.message}`, {
          position: "top-right",
          transition: "slide",
          hideProgressBar: false,
          showIcon: true,
          timeout: 3000,
          showCloseButton: true,
          swipeClose: true,
        });
      }
    },
    async getCountriesData() {
      try {
        const response = await globalApis.getCountries();
        this.countries = response.data.items;
      } catch (e) {
        console.log(e);
      }
    },
    async getCountryId(e) {
      let countryId = e.target.value;
      const response = await globalApis.getStates(countryId);
      this.states = response.data.items;
    },
    async getCityId(e) {
      let stateId = e.target.value;
      const response = await globalApis.getCities(stateId);
      this.cities = response.data.items;
    },
  },
  computed: {
    count() {
      try {
        return this.$store.getters['cart/cartItemCount'];
      } catch (e) {
        console.log(e);
      }

    },
    cartItems() {
      try {
        return this.$store.getters['cart/cartItems'];
      } catch (e) {
        console.log(e);
      }
    },
    cartTotalPrice() {
      try {
        return this.$store.getters['cart/cartTotalPrice'];
      } catch (e) {
        console.log(e);
      }
    },
    isAuthenticated: function () {
      return this.$store.getters['Auth/isAuthenticated'];
    },
  },
  watch: {
    count(newCount, oldCount) {
      console.log(`We have ${newCount} fruits now, yay!`)
    },
    cartItems(newCartItems, oldCartItems) {
      console.log(newCartItems);
    },
    cartTotalPrice(newCartTotalPrice, oldCartTotalPrice) {
      console.log(newCartTotalPrice);
    }
  },
};
</script>

<style lang="scss" scoped>
.styleSelects {
  padding: 1rem;
  border: 1px solid #999;
  background: inherit;
}

.return-btn {
  background-color: inherit;
}

.mdi-chevron-left::before {
  color: #003399;
}

.mdi-chevron-right::before i {
  color: #fff;
}

p {
  color: #6E6C5A;
}

.login-btn {
  color: #3399FF;
}

.form-holder {
  margin: 20px 0;

  .email-form {
    width: 70%;
  }

  .v-col-lg-4 {
    padding-bottom: 0;
  }

  .v-text-field .v-input__details {
    display: none;
  }

  .v-checkbox {
    height: 40px;
  }
}
</style>
