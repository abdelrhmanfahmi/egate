<template>
  <div class="adress-book">
    <h4 class="main-header">{{ $t("profile.accountInformation") }}</h4>
    <form @submit.prevent="updateProfile()" class="account-information-form">
      <b-row class="justify-content-center">
        <!-- country  -->
        <b-col lg="12">
          <b-form-group>
            <label for="countryCode">{{ $t("profile.country") }}</label>
            <span class="requried">*</span>
            <b-form-select v-model="form.country">
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
        <!-- State -->
        <b-col lg="6">
          <b-form-group>
            <label for="countryCode">{{ $t("profile.state") }}</label>
            <span class="requried">*</span>
            <b-form-select v-model="form.state">
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
        <!-- District -->
        <b-col lg="6">
          <b-form-group>
            <label for="countryCode">{{ $t("profile.district") }}</label>
            <span class="requried">*</span>
            <b-form-select v-model="form.district">
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
        <!-- street number  -->
        <b-col lg="12">
          <b-form-group>
            <label for="f-name">{{ $t("profile.streetNumber") }}</label>
            <span class="requried">*</span>
            <b-form-input id="f-name" v-model="form.streetNumber" />
            <div
              class="error"
              v-for="(error, index) in errors.first_name"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- home number  -->
        <b-col lg="6">
          <b-form-group>
            <label for="f-name">{{ $t("profile.homeNumber") }}</label>
            <span class="requried">*</span>
            <b-form-input id="f-name" v-model="form.homeNumber" />
            <div
              class="error"
              v-for="(error, index) in errors.first_name"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- floor  -->
        <b-col lg="6">
          <b-form-group>
            <label for="f-name">{{ $t("profile.floor") }}</label>
            <span class="requried">*</span>
            <b-form-input id="f-name" v-model="form.floor" />
            <div
              class="error"
              v-for="(error, index) in errors.first_name"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- block number   -->
        <b-col lg="6">
          <b-form-group>
            <label for="f-name">{{ $t("profile.blockNumber") }}</label>
            <span class="requried">*</span>
            <b-form-input id="f-name" v-model="form.blockNumber" />
            <div
              class="error"
              v-for="(error, index) in errors.first_name"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- street number  -->
        <b-col lg="6">
          <b-form-group>
            <label for="f-name">{{ $t("profile.streetNumber") }}</label>
            <span class="requried">*</span>
            <b-form-input id="f-name" v-model="form.streetNumber" />
            <div
              class="error"
              v-for="(error, index) in errors.first_name"
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
  </div>
</template>

<script>
import auth from "@/services/auth";

export default {
  data() {
    return {
      form: {
        country: "",
        state: "",
        district: "",
        streetNumber: "",
        homeNumber: "",
        floor:"",
        blockNumber:""
      },
      countries: [],
      errors: {},
    };
  },
  mounted() {
    this.getAllCountires();
  },
  methods: {
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
    updateProfile() {
      console.log("yes");
    },
  },
};
</script>

<style lang="scss" scoped>
.adress-book {
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
  .adress-book {
    text-align: right;
  }
}
</style>