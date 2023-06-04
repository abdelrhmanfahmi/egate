<template>
  <!-- b2c register form  -->
  <section class="user-register">
    <b-container>
      <div class="main-title">
        <!-- <span class="sub-title"></span> -->
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
                <b-col lg="2" class="" v-if="form.perfix !== null">
                  <label for="f-name">{{
                    $t("register.selectPrefixes")
                  }}</label>

                  <b-form-select v-model="form.perfix">
                    <b-form-select-option value="null" disabled>{{
                      $t("home.All")
                    }}</b-form-select-option>
                    <b-form-select-option
                      :value="prefix"
                      v-for="(prefix, index) in prefixes"
                      :key="index"
                      >{{ prefix }}</b-form-select-option
                    >
                  </b-form-select>
                </b-col>
                <b-col lg="5" v-if="form.first_name !== null">
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
                <b-col lg="5" v-if="form.last_name !== null">
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
                <b-col lg="12" v-if="form.email !== null">
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
                <b-col lg="6" v-if="form.password !== null">
                  <b-form-group>
                    <label for="NewPassword">{{ $t("register.password") }}</label>
                    <span class="requried">*</span>
                    <div class="show-password">
                      <b-form-input
                        id="NewPassword"
                        @keyup="checkPass"
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
                <b-col lg="6" v-if="form.password_confirmation !== null">
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
                <b-col lg="12" class="mb-3">
                  <CheckPassComponent />
                </b-col>
                <!-- country code -->
                <b-col lg="3" cols="4" v-if="form.country_code !== null">
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
                <b-col lg="9" cols="8" v-if="form.mobile_number !== null">
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
                v-if="form.active_with !== null"
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
              </b-form-group>
              <div v-if="dynamicInputs">
                <dynamicComponent
                  :dynamicInputs="dynamicInputs"
                  :form="form"
                  :errors="errors"
                />
              </div>
              <div class="terms d-inline-block">
                <span>
                  {{ $t("register.newPolicy") }}
                </span>
                <span>
                  <a
                    v-b-modal.terms&condation
                    @click="$bvModal.show('modal-scoped')"
                  >
                    {{ $t("register.termsConditions") }}</a
                  >
                </span>
              </div>
              <b-modal size="lg" id="terms&condation" :title="condations.title">
                <p
                  v-html="condations.description"
                  v-if="condations.description"
                ></p>
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
              <div class="submition-box bg-white border-0">
                <b-button type="submit" :disabled="!terms" class="bg-main br-5 w-25">
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
import dynamicComponent from "@/components/global/dynamicComponent";
import { createdFormData } from "@/services/helpers.js";
import CheckPassComponent from "@/components/auth/checkPassword.vue"
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
        perfix: "",
      },
      errors: {},
      terms: true,
      connects: [
        { name: this.$t("register.phone"), value: "sms" },
        { name: this.$t("register.email"), value: "email" },
      ],
      countries: [],
      fieldType: "password",
      condations: {},
      contactPhone: "",
      prefixes: null,
      dynamicInputs: null,
    };
  },
  mounted() {
    this.checkRegisterForm();
    this.checkDynamicInputs();
    this.getTerms();
    this.getAllCountires();
    this.contactUsPhone();
    this.getProfilePrefixes();
  },
  components: {
    dynamicComponent,
    CheckPassComponent
  },
  methods: {
    /**
     * @vuese
     *  get countries
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
     * @vuese
     *  check Register Form data
     */
    checkRegisterForm() {
      auth
        .checkRegisterForm("b2c")
        .then((res) => {
          let formControl = res.data.items;
          formControl.map((element) => {
            console.log("formControl", element.input_key);
            if (element.status !== 1) {
              this.form[element.input_key] = null;
            } else {
              this.form[element.input_key] = "";
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     *  register function
     */
    register() {
      localStorage.clear();
      this.form.callback_url = `${this.mainDoamin}`;
      auth
        .register("b2c", createdFormData(this.form))
        .then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res.data.items));
          if (res.data.items.item.verify_mobile_required) {
            localStorage.setItem("massege", this.$t("profile.newPhoneVerify"));
            this.$router.push("/otp-verification");
            setTimeout(() => {
              location.reload();
            }, 200);
          } else {
            localStorage.setItem("massege", this.$t("register.openEmail"));
            this.$router.push("/welcome");
            setTimeout(() => {
              location.reload();
            }, 200);
          }
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    /**
     * @vuese
     *  change type to show password
     */
    switchField() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
    },
    /**
     * @vuese
     *  get terms
     */
    getTerms() {
      auth.termsAndCondations().then((res) => {
        this.condations = res.data.items;
      });
    },
    /**
     * @vuese
     *  accept Terms
     */
    acceptMyTerms() {
      this.terms = true;
    },
    /**
     * @vuese
     *  contactUs Phone
     */
    contactUsPhone() {
      profile
        .contactUsPhone()
        .then((res) => {
          this.contactPhone = res.data.items;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    /**
     * @vuese
     *  get Profile Prefixes function
     */

    getProfilePrefixes() {
      profile.getProfilePrefixes().then((res) => {
        this.prefixes = res.data.items;
      });
    },
    checkDynamicInputs() {
      auth
        .dynamicInputs("user-b2c-register")
        .then((res) => {
          this.dynamicInputs = res.data.items;
          this.dynamicInputs.map((input) => {
            this.form[input.uuid] = null;
            if (input.type == "checkbox") {
              this.form[input.uuid] = false;
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkPass() {
      var len = document.getElementById("NewPassword").value;
      let myLetter = document.getElementById("letter");
      let letter1 = document.getElementById("letter1");
      let letter2 = document.getElementById("letter2");
      let letter3 = document.getElementById("letter3");
      let letter4 = document.getElementById("letter4");

      // Validate Uppercase letteres
      var uppercaseLetters = /[A-Z]/g;

      if (len.match(uppercaseLetters)) {
        letter2.classList.add("main-color");
        letter2.style.opacity = 1;
      } else {
        letter2.classList.remove("main-color");
        letter2.classList.add("text-gray");
        letter2.style.opacity = 0.5;
      }

      // Validate Special Characters
      var special_chars = /\W/g;

      if (len.match(special_chars)) {
        letter1.classList.add("main-color");
        letter1.style.opacity = 1;
      } else {
        letter1.classList.remove("main-color");
        letter1.classList.add("text-gray");
        letter1.style.opacity = 0.5;
      }

      // Validate lowercase letteres
      var lowercaseLetters = /[a-z]/g;

      if (len.match(lowercaseLetters)) {
        letter4.classList.add("main-color");
        letter4.style.opacity = 1;
      } else {
        letter4.classList.remove("main-color");
        letter4.classList.add("text-gray");
        letter4.style.opacity = 0.5;
      }

      //Validate Numbers
      var numbers = /[0-9]/g;

      if (len.match(numbers)) {
        letter3.classList.add("main-color");
        letter3.style.opacity = 1;
      } else {
        letter3.classList.remove("main-color");
        letter3.classList.add("text-gray");
        letter3.style.opacity = 0.5;
      }

      // Validate length of string
      if (len.length >= 8) {
        myLetter.classList.add("main-color");

        myLetter.style.opacity = 1;
      } else {
        myLetter.classList.remove("main-color");
        myLetter.classList.add("text-gray");
        myLetter.style.opacity = 0.5;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/**
  *  component style
*/
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
