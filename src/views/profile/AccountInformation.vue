<template>
  <div class="account-information">
    <!-- b2c user  account information page  -->
    <h4 class="main-header">{{ $t("profile.accountInfo") }}</h4>
    <form @submit.prevent="updateProfile()" class="account-information-form">
      <b-row class="justify-content-center">
        <!-- First Name -->
        <b-col lg="6">
          <b-form-group>
            <label for="f-name">{{ $t("register.firstName") }}</label>
            <span class="requried">*</span>
            <b-form-input id="f-name" v-model="form.first_name" />
            <div
              class="error"
              v-for="(error, index) in errors.first_name"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- Last Name -->
        <b-col lg="6">
          <b-form-group>
            <label for="l-name">{{ $t("register.lastName") }}</label>
            <span class="requried">*</span>
            <b-form-input id="l-name" v-model="form.last_name" />
            <div
              class="error"
              v-for="(error, index) in errors.last_name"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- Email -->
        <b-col lg="12">
          <b-form-group>
            <label for="email">{{ $t("register.email") }}</label>
            <span class="requried">*</span>
            <router-link to="/contact-us" class="mx-1 text-lowercase">
              {{ $t("profile.needEmailContact") }}
            </router-link>

            <b-form-input id="email" v-model="form.email" disabled />
            <div
              class="error"
              v-for="(error, index) in errors.email"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- country code -->
        <b-col lg="4" cols="12">
          <b-form-group>
            <label for="countryCode">{{ $t("register.countryCode") }}</label>
            <span class="requried">*</span>
            <b-form-select v-model="form.country_code" disabled>
              <b-form-select-option
                v-for="country in countries"
                :key="country.id"
                :value="country.iso"
                >{{ country.title }}
                {{ country.phone_prefix }}</b-form-select-option
              >
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
        <!-- phone -->
        <b-col lg="8" cols="12">
          <b-form-group>
            <label for="phone">{{ $t("register.phone") }}</label>
            <span class="requried">*</span>
            <router-link to="/contact-us" class="mx-1 text-lowercase">
              {{ $t("profile.needPhoneContact") }}
            </router-link>

            <div class="row justify-content-start align-items-center">
              <div class="col-1"><span>{{phonePrefix}}</span></div>
              <div class="col-10"><b-form-input id="phone" v-model="form.mobile_number" disabled /></div>
            </div>
            <div
              class="error"
              v-for="(error, index) in errors.mobile_number"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-button type="submit" class="login-button">
        {{ $t("profile.save") }}
      </b-button>
    </form>
  </div>
</template>

<script>
import auth from "@/services/auth";

export default {
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        email: "",
        country_code: "KW",
        mobile_number: "",
      },
      countries: [],
      errors: {},

      phonePrefix:null
    };
  },
  mounted() {
    /**
     * get AllCountires  function
     * @function
     */
    this.getAllCountires();
    /**
     * spread user data function ,  that comes from backend  
     * @function
     */
    this.form = { ...this.buyerUserData };
    this.phonePrefix = this.buyerUserData.phone_prefix
    this.form.mobile_number = this.buyerUserData.phone
  },
  methods: {
     /**
     * get AllCountires  function
     * @function
     */
    getAllCountires() {
      auth
        .getAllCountires()
        .then((res) => {
          this.countries = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },
     /**
     * update Profile  function
     * @function
     */
    updateProfile() {
      const payload = {
        first_name: this.form.first_name,
        last_name: this.form.last_name,
      };
      auth
        .storeInfo(payload)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.errors = {};
          this.$store.commit("SET_USER_DATA_INFO", res.data.items);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
  },
};
</script>

<style lang="scss" scoped>

/**
  * page style
*/
.account-information {
  padding-top: 40px;
  .main-header {
    text-transform: uppercase;
  }
  .account-information-form {
    padding: 20px 0;
    .login-button {
      margin: 30px 0px;
      width: 20%;
    }
  }
}

html:lang(ar) {
  .account-information {
    text-align: right;
  }
}
</style>
