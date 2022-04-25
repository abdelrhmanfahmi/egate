<template>
  <div class="payment py-3">
    <div class="container">
      <h4 class="header text-center py-5 font-weight-bold">
        {{ $t("payment.payment") }}
      </h4>
      <div class="content">
        <div class="row payment-data justify-content-center">
          <div class="col-12 col-lg-7 col-xl-6 payment-delivery">
            <div
              class="d-flex justify-content-between heading align-items-center mb-4"
            >
              <span class="title">{{ $t("payment.deliveryData") }}</span>
              <router-link to="/cart">
                {{ $t("payment.backToCart") }}
                <span>
                  <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </span>
              </router-link>
            </div>
            <form class="row delivery-form">
              <div class="col-6 form-group required">
                <label for="firstName">{{ $t("payment.firstName") }}</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  v-model="formData.first_name"
                />
                <div
                  class="error text-start"
                  v-for="(error, index) in errors.first_name"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div>
              <div class="col-6 form-group required">
                <label for="firstName">{{ $t("payment.lastName") }}</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  v-model="formData.last_name"
                />
                <div
                  class="error text-start"
                  v-for="(error, index) in errors.last_name"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div>
              <div class="col-12 form-group">
                <!-- <label for="companyName">
                  {{ $t("payment.category") }} ({{ $t("payment.optional") }})
                </label> -->
                <label for="companyName">
                  {{ $t("payment.companyName") }}
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="companyName"
                  v-model="formData.company_name"
                />
                <div
                  class="error text-start"
                  v-for="(error, index) in errors.company_name"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div>
              <div class="col-12 form-group required">
                <label for="country">{{ $t("payment.country") }}</label>
                <b-form-select
                  v-model="formData.country"
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
              </div>
              <div class="col-6 form-group required">
                <label for="governorate">{{ $t("payment.governorate") }}</label>

                <b-form-select
                  v-model="formData.governorate"
                  :disabled="!formData.country"
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
              </div>
              <div class="col-6 form-group required">
                <label for="city">{{ $t("payment.city") }}</label>
                <b-form-select
                  v-model="formData.city"
                  :disabled="!formData.country || !formData.governorate"
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
              </div>
              <div class="col-12 form-group required">
                <label for="address">{{ $t("payment.address") }}</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  v-model="formData.address"
                />
                <div
                  class="error text-start"
                  v-for="(error, index) in errors.address"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div>

              <div class="col-6 form-group required">
                <label for="postalCode">{{ $t("payment.postalCode") }}</label>
                <input
                  type="text"
                  class="form-control"
                  id="postalCode"
                  v-model="formData.postal_code"
                />
                <div
                  class="error text-start"
                  v-for="(error, index) in errors.postal_code"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div>
              <div class="col-6 form-group required">
                <label for="phoneNumber">{{ $t("payment.phoneNumber") }}</label>
                <input
                  type="number"
                  class="form-control"
                  id="phoneNumber"
                  v-model="formData.phone"
                />
                <div
                  class="error text-start"
                  v-for="(error, index) in errors.phone"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div>
              <div class="col-12 form-group required">
                <label for="email">{{ $t("payment.email") }}</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="formData.email"
                />
                <div
                  class="error text-start"
                  v-for="(error, index) in errors.email"
                  :key="index"
                >
                  {{ error }}
                </div>
              </div>
              <div
                class="col-12 form-group custom-control custom-checkbox"
                v-if="userData"
              >
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="deliveryAddress"
                  v-model="formData.sameAddress"
                />
                <label class="custom-control-label" for="deliveryAddress">
                  {{ $t("payment.deliverySameAddress") }}
                </label>
              </div>
              <div class="col-12 form-group">
                <label for="notes">
                  {{ $t("payment.notes") }} ({{ $t("payment.optional") }})
                </label>
                <textarea
                  class="form-control"
                  id="notes"
                  rows="3"
                  v-model="formData.comment"
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
              <span class="title">{{ $t("payment.paymentData") }}</span>
            </div>
            <div class="methods-data">
              <div class="info">
                {{ $t("payment.total") }}: {{ cart_sub_total }} {{ currency }}
              </div>
              <div class="info">
                {{ $t("payment.discount") }} : {{ discount }} {{ currency }}
              </div>
              <div class="info delivery">
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
              </div>
              <div
                class="d-flex justify-content-between align-items-center total"
              >
                <span class="title">{{ $t("payment.total") }}</span>
                <span class="price">{{ totalPayment }} {{ currency }}</span>
              </div>
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
                      v-model="formData.payment_type"
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
                      v-model="formData.payment_type"
                      value="when reciving"
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
                      v-model="formData.payment_type"
                      value="online"
                    />
                    <label class="custom-control-label" for="paymentMethod3">
                      {{ $t("payment.onlinePayment") }}
                    </label>
                  </div>
                  <div class="online-media">
                    <img src="@/assets/images/cart.png" alt="" srcset="" />
                  </div>
                </div>
              </div>
              <div class="terms my-4">
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
              </div>
              <div class="submit">
                <b-button
                  type="submit"
                  class="login-button dark"
                  @click="payment"
                >
                  {{ $t("payment.checkout") }}
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import suppliers from "@/services/suppliers";
import auth from "@/services/auth";
import profile from "@/services/profile";
export default {
  data() {
    return {
      count: 0,
      storedData: null,
      formData: {
        // guest_uuid: sessionStorage.getItem("coupons")
        //   ? sessionStorage.getItem("coupons")
        //   : null,
        comment: null,
        phone: null,
        payment_type: null,
        first_name: null,
        last_name: null,
        company_name: null,
        address: null,
        sameAddress: false,
        country: null,
        governorate: null,
        city: null,
        postal_code: null,
        email: null,
        coupons: [],
      },
      freeDelivery:
        sessionStorage.getItem("freeDelivery") == "true" ? true : false,
      errors: [],
      countries: [],
      cities: [],
      regions: [],
    };
  },
  methods: {
    async payment() {
      suppliers
        .payment(this.formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          const errors = Object.values(err)[2].data;
          this.errors = errors.items;
          console.log(err);
        });
    },
    getAllCountires() {
      auth.getAllCountires().then((res) => {
        this.countries = res.data.items;
      });
    },
    // getAllRegions
    getAllRegions() {
      profile.getAllRegions(this.formData.country).then((res) => {
        this.regions = res.data.items;
        this.form.region_id = "";
        this.form.city_id = "";
      });
    },
    // Cities
    getAllCities() {
      profile.getAllCities(this.formData.governorate).then((res) => {
        this.cities = res.data.items;
        this.form.city_id = "";
      });
    },
  },
  computed: {
    cartItems() {
      return this.$store.state.cart.cartItems;
    },
    cart_sub_total() {
      return this.$store.state.cart.cart_sub_total;
    },
    cartTest() {
      return this.$store.state.cart;
    },
    totalPayment() {
      return parseInt(this.cart_sub_total) - parseInt(this.discount);
    },
    discount() {
      return localStorage.getItem("discount")
        ? localStorage.getItem("discount")
        : 0;
    },
  },
  mounted() {
    this.getAllCountires();
    this.storedData = JSON.parse(localStorage.getItem("guestAddressData"));
    // this.formData.country = this.storedData.country_id
    // this.formData.governorate = this.storedData.region_id
    // this.formData.country = this.storedData.country_id
    console.log(this.storedData);
    this.formData.postal_code = this.storedData.pin_code
      ? this.storedData.pin_code
      : null;
  },
};
</script>
<style lang="scss" scoped>
.payment {
  .header {
    color: #312620;
  }
  .content {
    .payment-data {
      .payment-delivery {
        .heading {
          .title {
            color: #312620;
            font-weight: 600;
            font-size: 18pt;
          }
          a {
            font-size: 11pt;
            color: #312620;
            span {
              margin-inline-start: 0.25rem;
            }
            &:hover {
              color: #ed2124;
            }
          }
        }
        .delivery-form {
          .form-group {
            margin-bottom: 1.5rem;
            label {
              margin-bottom: 0;
            }
            textarea {
              resize: none;
            }
            input:focus,
            textarea:focus,
            select:focus {
              outline: none;
              border-color: #ced4da;
              box-shadow: none;
            }
            &.required {
              label::after {
                content: "*";
                color: $main-color;
                padding-inline-start: 0.2rem;
              }
            }
          }
        }
      }
      .payment-method {
        .methods-data {
          background: #ecf0f1;
          padding: 2rem;
          border-radius: 0.5rem;
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
    }
    .heading {
      .title {
        color: #312620;
        font-weight: 600;
        font-size: 18pt;
      }
      a {
        font-size: 11pt;
        color: #312620;
        span {
          margin-inline-start: 0.25rem;
        }
        &:hover {
          color: #ed2124;
        }
      }
    }
  }
}
html:lang(ar) {
  svg {
    transform: rotate(180deg);
  }
}
</style>
