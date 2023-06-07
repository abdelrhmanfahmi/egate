<template>
  <div class="user-login">
    <!-- login component  -->
    <b-sidebar
      id="login"
      backdrop
      width="450px"
      :right="getDir === 'rtl'"
      shadow
      z-index="5"
      body-class="sidebar-login"
      bg-variant="#fff"
    >
      <template #default="{ hide }">
        <!-- <div class="text-center"> -->
        <div class="d-flex justify-content-start px-4">
          <!-- <h2>{{ $t("login.wholeSaleClients") }}</h2> -->
          <h2>{{ $t("login.login") }}</h2>
        </div>
        <div class="user-login-form">
          <div
            class="row flex-row justify-content-between align-items-center mb-4 main-color"
          >
            <div class="col-md-4 col-sm-12 p-0 m-0 my-col" @click="selectType('b2c')">
              <span
                class="main-color font-weight-bold link"
                :class="{ 'text-decoration-underline': selectedType === 'b2c' }"
                >{{ $t("login.retailBuyer") }}</span
              >
            </div>
            <div class="col-md-5 col-sm-12 p-0 m-0 my-col" @click="selectType('b2b')">
              <span
                class="main-color font-weight-bold link"
                :class="{ 'text-decoration-underline': selectedType === 'b2b' }"
              >
                <!-- {{ $t("login.wholeSaleBuyer") }} -->
                {{ $t("home.corporate") }}
              </span>
            </div>
            <!-- <div class="col-md-3 col-sm-12 p-0 m-0 my-col" v-if="supplier_registration ">
              <a
                :href="`${supplierDomain}`"
                target="_blank"
                class="main-color font-weight-bold"
                >{{ $t("home.suppliers") }}</a
              >
            </div> -->
          </div>
          <!-- <h6 class="title">{{ $t("login.login") }}</h6> -->
          <p class="mb-2">{{ $t("login.WelcomeAgain") }}</p>
          <p class="error">{{ errorMsg }}</p>
          <div v-if="selectedType === 'b2c'">
            <form @submit.prevent="loginB2c()">
              <b-form-input
                v-model="form.email"
                type="email"
                :placeholder="$t('register.email')"
              />
              <div
                class="error text-start"
                v-for="(error, index) in errorsLogin.email"
                :key="index"
              >
                {{ error }}
              </div>
              <div class="show-password">
                <b-form-input
                  class="my-2"
                  v-model="form.password"
                  :type="fieldType"
                  :placeholder="$t('register.password')"
                />
                <div
                  class="error text-start"
                  v-for="(error, index) in errorsLogin.password"
                  :key="index"
                >
                  {{ error }}
                </div>
                <div class="icon-passowrd" @click="switchField()">
                  <font-awesome-icon
                    icon="fa-solid fa-eye"
                    v-if="fieldType === 'password'"
                    size="lg"
                  />
                  <font-awesome-icon icon="fa-solid fa-eye-slash" v-else size="lg" />
                </div>
              </div>

              <div class="d-flex justify-content-end">
                <b-button class="forget-password main-color" v-b-modal.ForgetPassword>
                  {{ $t("login.fogetPassword") }}
                </b-button>
              </div>
              <b-button type="submit" class="login-button w-50 br-5">
                {{ $t("login.login") }}
              </b-button>
            </form>
            <RecapchaComponent @psssrecaptcha="recaptchaValue($event)" />
          </div>
          <div class="" v-else>
            <B2bTab />
          </div>
        </div>
        <div
          class="social-login"
          v-if="
            selectedType === 'b2c' &&
            (social_login_facebook ||
              social_login_google ||
              social_login_microsoft ||
              social_login_apple)
          "
        >
          <p>{{ $t("login.LoginSocial") }}</p>
          <div class="social-icons d-flex justify-content-center align-items-center">
            <button
              @click="getLink('facebook')"
              class="button-social"
              v-if="social_login_facebook"
            >
              <font-awesome-icon icon="fa-brands fa-facebook-f" size="lg" />
            </button>
            <button
              @click="getLink('google')"
              class="button-social"
              v-if="social_login_google"
            >
              <font-awesome-icon icon="fa-brands fa-google" size="lg" />
            </button>
            <button
              @click="getLink('azure')"
              class="button-social"
              v-if="social_login_microsoft"
            >
              <font-awesome-icon icon="fa-brands fa-windows" size="lg" />
            </button>
            <button
              @click="getLink('apple')"
              class="button-social apple-login"
              v-if="social_login_apple"
            >
              <font-awesome-icon icon="fa-brands fa-apple" size="lg" />
            </button>
          </div>
        </div>

        <div class="user-login-form" v-if="selectedType === 'b2c'">
          <b-button
            to="/user-register"
            class="login-button my-2 border-main"
            @click="hide"
          >
            {{ $t("login.DontHave") }} {{ $t("login.createAccount") }}
          </b-button>
        </div>
        
      </template>
    </b-sidebar>
    <b-modal
      id="ForgetPassword"
      :title="$t('login.resetPassword')"
      no-close-on-backdrop
      no-close-on-esc
      ref="b2cLogin"
    >
      <form>
        <b-form-group>
          <label for="email">{{ $t("register.email") }}</label>
          <span class="requried">*</span>
          <b-form-input id="email" v-model="emailForget" maxlength="100" />
          <div class="error" v-for="(error, index) in errors.email" :key="index">
            {{ error }}
          </div>
        </b-form-group>
      </form>
      <div slot="modal-footer" class="d-flex">
        <a @click="sendEmail()" class="reset-Link" type="submit">{{
          $t("login.reset")
        }}</a>
      </div>
    </b-modal>
    
  </div>
</template>

<script>
// login  component
import auth from "@/services/auth";
import B2bTab from "../loginTabs/B2bTab.vue";
import RecapchaComponent  from "@/components/Recaptcha/RecaptchaCompoent.vue"
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        token: "",
        device_type: "web",
        recaptcha:''
      },
      errorMsg: "",
      fieldType: "password",
      emailForget: "",
      errorsLogin: {},
      errors: {},
      selectedType: "b2c",
    };
  },
  methods: {
    recaptchaValue($event){
      this.form.recaptcha = $event
    },
    /**
     * @vuese
     * login B2c function
     */
    loginB2c() {
      localStorage.clear();

      let loginData = {
        email: this.form.email,
        password: this.form.password,
        token: this.firebaseToken,
        device_type: this.form.device_type,
        recaptcha: this.form.recaptcha,
        callback_url: `${this.mainDoamin}CheckUserValidity`,
      };

      auth
        .login("b2c", loginData)
        .then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res.data.items));
          if (
            !res.data.items.item.is_verified &&
            res.data.items.item.verify_mobile_required
          ) {
            localStorage.setItem("massege", this.$t("register.otpVerify"));
            this.$router.push("/otp-verification");
            setTimeout(() => {
              location.reload();
            }, 50);
          } else if (
            !res.data.items.item.is_verified ||
            (!res.data.items.item.is_verified &&
              res.data.items.item.verify_email_required)
          ) {
            localStorage.setItem("massege", this.$t("register.openEmail"));
            this.$router.push("/");
            setTimeout(() => {
              location.reload();
            }, 50);
          } else {
            this.$router.push("/");
            setTimeout(() => {
              location.reload();
            }, 50);
          }
        })
        .then(() => {
          setTimeout(() => {
            location.reload();
          }, 50);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errorsLogin = err.items;
          this.errMsg(err.message);
        });
    },
    /**
     * @vuese
     * login socially function
     */
    async getLink(provider) {
      const backUrl = `${this.mainDoamin}complete-social-profile`;
      await localStorage.setItem("provider", provider);
      auth
        .getSocialLink("b2c", provider, backUrl)
        .then((res) => {
          window.location.href = res.data.items.url;
        })
        // .catch((err) => {
        //   console.log(err);
        // });
    },
    /**
     * @vuese
     * switchField function to show password
     */
    switchField() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
    },
    // step One forget Password
    /**
     * @vuese
     * sendEmail function
     */
    sendEmail() {
      const payload = {
        email: this.emailForget,
        callback_url: `${this.mainDoamin}Forget-Password`,
        type: "b2c",
      };
      auth
        .sendEmail(payload)
        .then((res) => {
          this.sucessMsg(res.data.message);
          this.$bvModal.hide("ForgetPassword");
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    selectType(type) {
      this.selectedType = type;
    },
  },
  computed: {
    firebaseToken() {
      return this.$store.state.firebaseToken;
    },
  },
  components: {
    B2bTab,
    RecapchaComponent
  },
};
</script>

<style lang="scss" scoped>
/**
    * component style
  */

.user-login {
  .user-login-form {
    text-align: center;
    //border: 1px solid rgba(204, 204, 204, 0.251);
    //border-radius: 4px;
    // background-color: rgba(216, 220, 221, 0.251);
    //padding: 40px 30px 20px;
    padding: 20px;

    .title {
      padding-bottom: 10px;
      position: relative;

      &:after {
        margin: 0 auto;
        right: 0;
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 20px;
        height: 3px;
        background: $main-color;
      }
    }

    .forget-password {
      font-weight: 500;
      color: $header-color;
      background-color: transparent;
      border: none;

      &:hover {
        color: $main-color;
      }
    }
  }

  .social-login {
    padding: 20px 0;

    .social-icons {
      display: flex;
      flex-wrap: wrap;
    }
  }

  .button-social {
    //padding: 20px 30px;
    padding: 15px 20px;
    margin: 0 5px;
    color: #fff;
    border: 0;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #f5f5f5 !important;

    &:first-child {
      color: #3b5998;
    }

    &:nth-child(2) {
      color: #c5221f;
    }

    &:nth-child(3) {
      color: #3b5998;
    }

    &:last-child {
      color: #c5221f;
    }
  }
}

.reset-Link {
  color: #ffffff;
  background-color: $main-color;
  padding: 0.5rem 1.3rem;
  width: 100%;
}

.text-start {
  text-align: start;
}

.apple-login {
  background: #666666 !important;
}

.text-decoration-underline {
  text-decoration: underline !important;
}

.link {
  cursor: pointer;
}
.my-col {
  font-size: 16px;
}
</style>
