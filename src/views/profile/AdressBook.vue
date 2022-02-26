<template>
  <div class="address-book">
    <h4 class="main-header">{{ $t("profile.shippingAddress") }}</h4>
    <p class="add-address" @click="showForm = !showForm"><span>+ </span>{{ $t("profile.newAddress") }}</p>
    <form @submit.prevent="updateProfile()" class="account-information-form" v-if="showForm">
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
            <label for="streetNumber">{{ $t("profile.streetNumber") }}</label>
            <span class="requried">*</span>
            <b-form-input id="streetNumber" v-model="form.streetNumber" />
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
            <label for="homeNumber">{{ $t("profile.homeNumber") }}</label>
            <span class="requried">*</span>
            <b-form-input id="homeNumber" v-model="form.homeNumber" />
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
            <label for="floor">{{ $t("profile.floor") }}</label>
            <span class="requried">*</span>
            <b-form-input id="floor" v-model="form.floor" />
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
            <label for="blockNumber">{{ $t("profile.blockNumber") }}</label>
            <span class="requried">*</span>
            <b-form-input id="blockNumber" v-model="form.blockNumber" />
            <div
              class="error"
              v-for="(error, index) in errors.first_name"
              :key="index"
            >
              {{ error }}
            </div>
          </b-form-group>
        </b-col>
        <!-- post code  -->
        <b-col lg="6">
          <b-form-group>
            <label for="postCode">{{ $t("profile.postCode") }}</label>
            <span class="requried">*</span>
            <b-form-input id="postCode" v-model="form.postCode" />
            <div
              class="error"
              v-for="(error, index) in errors.first_name"
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
            <b-form-textarea id="textarea" size="lg"></b-form-textarea>
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
    <b-table hover :items="items" :fields="fields" stacked="lg" class="my-4"></b-table>
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
        floor: "",
        blockNumber: "",
        postCode: "",
      },
      countries: [],
      errors: {},
      showForm:false,
      fields: [
        {
          key: "age",
          label: this.$t("profile.homeNumber"),
        },
        {
          key: "first_name",
          label: this.$t("profile.streetNumber"),
        },
        {
          key: "last_name",
          label: this.$t("profile.district"),
        },
        {
          key: "product",
          label: this.$t("profile.state"),
        },
        {
          key: "country",
          label: this.$t("profile.country"),
        },
        {
          key: "id",
          label: "#",
        },
      ],
      items: [
        {
          age: 40,
          first_name: "Dickerson",
          last_name: "Macdonald",
          product: "Macdonald",
          country: "Egypt",
          id: "1",
        },
        {
          age: 21,
          first_name: "Larsen",
          last_name: "Shaw",
          product: "Macdonald",
          country: "Egypt",
          id: "1",
        },
        {
          age: 89,
          first_name: "Geneva",
          last_name: "Wilson",
          product: "Macdonald",
          country: "Egypt",
          id: "1",
        },
        {
          age: 38,
          first_name: "Jami",
          last_name: "Carney",
          product: "Macdonald",
          country: "Egypt",
          id: "1",
        },
      ],
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
}

html:lang(ar) {
  .address-book {
    text-align: right;
  }
}
</style>