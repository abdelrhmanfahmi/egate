<template>
  <section class="user-register">
    <b-container>
      <div class="main-title">
        <span class="sub-title"></span>
        <h2 class="main-header">{{ $t("register.createCustomerAccount") }}</h2>
      </div>
      <div class="user-register-form">
        <b-row class="justify-content-center">
          <b-col lg="10">
            <div class="register-info">
              <h4 class="main-header">{{ $t("register.mainInformation") }}</h4>
              <a v-b-toggle.login class="back">
                <span> &#60; {{ $t("register.alreadyHaveAccount") }}</span></a
              >
            </div>
            <form @submit.prevent="register()">
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
                    <b-form-input id="email" v-model="form.email" />
                    <div
                      class="error"
                      v-for="(error, index) in errors.email"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- Password -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="password">{{ $t("register.password") }}</label>
                    <span class="requried">*</span>
                    <div class="show-password">
                      <b-form-input
                        id="password"
                        v-model="form.password"
                        :type="fieldType"
                      />
                      <div class="icon-passowrd" @click="switchField()">
                        <font-awesome-icon
                          icon="fa-solid fa-eye"
                          v-if="fieldType === 'password'"
                          size="lg"
                        />
                        <font-awesome-icon
                          icon="fa-solid fa-eye-slash"
                          v-else
                          size="lg"
                        />
                      </div>
                    </div>
                    <div
                      class="error"
                      v-for="(error, index) in errors.password"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- Confirm Password -->
                <b-col lg="6">
                  <b-form-group>
                    <label for="confirmPassword">{{
                      $t("register.confirmPassword")
                    }}</label>
                    <span class="requried">*</span>
                    <div class="show-password">
                      <b-form-input
                        :type="fieldType"
                        id="confirmPassword"
                        v-model="form.password_confirmation"
                      />
                      <div class="icon-passowrd" @click="switchField()">
                        <font-awesome-icon
                          icon="fa-solid fa-eye"
                          v-if="fieldType === 'password'"
                          size="lg"
                        />
                        <font-awesome-icon
                          icon="fa-solid fa-eye-slash"
                          v-else
                          size="lg"
                        />
                      </div>
                    </div>
                    <div
                      class="error"
                      v-for="(error, index) in errors.password_confirmation"
                      :key="index"
                    >
                      {{ error }}
                    </div>
                  </b-form-group>
                </b-col>
                <!-- country code -->
                <b-col lg="3" cols="4">
                  <b-form-group>
                    <label for="countryCode">{{
                      $t("register.countryCode")
                    }}</label>
                    <span class="requried">*</span>
                    <b-form-select v-model="form.country_code">
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
                <b-col lg="9" cols="8">
                  <b-form-group>
                    <label for="phone">{{ $t("register.phone") }}</label>
                    <span class="requried">*</span>
                    <b-form-input
                      id="phone"
                      v-model="form.mobile_number"
                      type="number"
                    />
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
              <!-- active_with -->
              <b-form-group
                class="my-4"
                :label="$t('register.chooseOneOfTheWays')"
              >
                <b-form-radio
                  class="pt-2"
                  v-for="(connect, index) in connects"
                  :key="index"
                  v-model="form.active_with"
                  name="some-radios"
                  :value="connect.value"
                  >{{ connect.name }}</b-form-radio
                >
                <!-- <div
                  class="error"
                  v-for="(error, indx) in errors.active_with"
                  :key="indx"
                >
                  {{ error }}
                </div> -->
              </b-form-group>

              <b-form-checkbox v-model="terms" class="terms">
                {{ $t("register.PleaseReview") }}
                <router-link to="/">
                  {{ $t("register.termsConditions") }}</router-link
                >
                {{ $t("register.toCompleteTheRegistration") }}
              </b-form-checkbox>

              <b-form-checkbox
                v-model="form.register_mailing_list"
                class="py-3"
              >
                {{ $t("register.subscribeTheNewsletter") }}
              </b-form-checkbox>
              <div class="submition-box">
                <b-button type="submit" :disabled="!terms" variant="danger">
                  {{ $t("register.submit") }}
                </b-button>
              </div>
            </form>
          </b-col>
        </b-row>
        <div class="help py-5">
          <h6 class="main-header">
            {{ $t("register.unableRegister") }}
          </h6>
          <a class="tel" href="tel:4733378901">47 333 78 901</a>
        </div>
      </div>
    </b-container>
  </section>
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
        password: "",
        password_confirmation: "",
        country_code: "",
        mobile_number: "",
        active_with: "",
        register_mailing_list: false,
        callback_url: "http://localhost:8081",
      },
      errors: {},
      terms: "",
      connects: [
        { name: this.$t("register.phone"), value: "sms" },
        { name: this.$t("register.email"), value: "email" },
      ],
      countries: [],
      fieldType: "password",
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
    register() {
      auth
        .register("b2c", this.form)
        .then(async (res) => {
          await localStorage.setItem("token", res.data.items.access_token);
          if (res.data.items.item.verify_mobile_required) {
            this.$router.push("/ota-verification");
            location.reload();
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
        });
    },
    switchField() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
    },
  },
};
</script>

<style lang="scss" scoped>
.user-register {
  .main-title {
    text-align: center;
    padding: 30px 0;
  }
  .user-register-form {
    .register-info {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 25px;
      .back {
        font-weight: 500;
        color: $header-color;
        &:hover {
          color: $main-color;
        }
      }
    }
    .custom-select {
      height: 3.2rem;
    }
    .terms {
      a {
        color: $main-color;
        text-decoration: underline !important;
        display: inline-block;
      }
    }
    .submition-box {
      text-align: center;
      border: 1px solid rgba(204, 204, 204, 0.251);
      border-radius: 4px;
      background-color: rgba(216, 220, 221, 0.251);
      padding: 40px 30px;
    }
    .help {
      text-align: center;
      .main-header {
        text-transform: uppercase;
      }
      .tel {
        background-color: #3b5998;
        padding: 20px;
        margin: 10px 0;
        color: #fff;
        display: inline-block;
      }
    }
  }
}

// style arabic
html:lang(ar) {
  .user-register {
    .user-register-form {
      text-align: right;
    }
  }
}
</style>
