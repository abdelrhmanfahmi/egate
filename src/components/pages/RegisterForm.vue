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
                
                <b-col lg="2" class="">
                  <label for="f-name">{{ $t("register.selectPrefixes") }}</label>

                    <b-form-select v-model="form.perfix">
                      <b-form-select-option value="null" disabled
                        >{{$t('home.All')}}</b-form-select-option
                      >
                      <b-form-select-option :value="prefix" v-for="(prefix , index) in prefixes" :key="index"
                        >{{prefix}}</b-form-select-option
                      >
                    </b-form-select>
                 
                </b-col>
                <b-col lg="5">
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
                <b-col lg="5">
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
                    <b-form-input
                      id="email"
                      v-model="form.email"
                      maxlength="100"
                    />
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

              <b-form-checkbox
                v-model="terms"
                class="terms my-1 d-inline-block"
              >
                <span>
                  {{ $t("register.PleaseReview") }}
                </span>
              </b-form-checkbox>
              <div class="terms d-inline-block">
                <span>
                  <a
                    v-b-modal.terms&condation
                    @click="$bvModal.show('modal-scoped')"
                  >
                    {{ $t("register.termsConditions") }}</a
                  >
                </span>
                <span>
                  {{ $t("register.toCompleteTheRegistration") }}
                </span>
              </div>

              <!-- <b-modal
                size="lg"
                id="terms&condation"
                :title="condations.title"
                ok-only
              >
                <p v-html="condations.description">
                  {{ condations.description }}
                </p>
              </b-modal> -->

              <b-modal size="lg" id="terms&condation" :title="condations.title">
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
                    <span class="mx-1">{{ $t("payment.accept") }}</span>
                    <span class="mx-1">{{
                      $t("payment.termsAndConditions")
                    }}</span>
                  </b-button>
                </template>
              </b-modal>

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
          <a class="tel pb-0" v-html="contactPhone.description"></a>
        </div>
      </div>
    </b-container>
  </section>
</template>
<script>
import auth from "@/services/auth";
import profile from "@/services/profile";
export default {
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        country_code: "KW",
        mobile_number: "",
        active_with: "sms",
        register_mailing_list: false,
        perfix:null
      },
      errors: {},
      terms: "",
      connects: [
        { name: this.$t("register.phone"), value: "sms" },
        { name: this.$t("register.email"), value: "email" },
      ],
      countries: [],
      fieldType: "password",
      condations: {},
      contactPhone: "",
      prefixes: null,
    };
  },
  mounted() {
    this.getTerms();
    this.getAllCountires();
    this.contactUsPhone();
    this.getProfilePrefixes();
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
      localStorage.clear();
      this.form.callback_url = `${this.mainDoamin}`;
      auth
        .register("b2c", this.form)
        .then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res.data.items));
          if (res.data.items.item.verify_mobile_required) {
            this.$router.push("/otp-verification");
            location.reload();
          } else {
            localStorage.setItem("massege", this.$t("register.openEmail"));
            this.$router.push("/");
            location.reload();
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    switchField() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
    },
    getTerms() {
      auth.termsAndCondations().then((res) => {
        this.condations = res.data.items;
      });
    },
    acceptMyTerms() {
      this.terms = true;
    },
    contactUsPhone() {
      profile
        .contactUsPhone()
        .then((res) => {
          console.log(res);
          this.contactPhone = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getProfilePrefixes() {
      profile.getProfilePrefixes().then((res) => {
        this.prefixes = res.data.items;
      });
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
        direction: ltr;
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
