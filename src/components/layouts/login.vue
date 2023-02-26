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
        <div class="text-center">
          <h2>{{ $t("login.wholeSaleClients") }}</h2>
        </div>
        <div class="user-login-form">
          <div
            class="row flex-row justify-content-between align-items-center mb-4 text-dark"
          >
            <div class="col-md-4 col-sm-12" @click="selectType('b2c')">
              <span
                class="text-dark font-weight-bold link"
                :class="{ 'text-decoration-underline': selectedType === 'b2c' }"
                >{{ $t("login.retailBuyer") }}</span
              >
            </div>
            <div class="col-md-5 col-sm-12" @click="selectType('b2b')">
              <span
                class="text-dark font-weight-bold link"
                :class="{ 'text-decoration-underline': selectedType === 'b2b' }"
                >{{ $t("login.wholeSaleBuyer") }}</span
              >
            </div>
            <div class="col-md-3 col-sm-12">
              <a
                :href="`${supplierDomain}`"
                target="_blank"
                class="text-dark font-weight-bold"
                >{{ $t("home.suppliers") }}</a
              >
            </div>
          </div>
          <h6 class="title">{{ $t("login.login") }}</h6>
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
                  <font-awesome-icon
                    icon="fa-solid fa-eye-slash"
                    v-else
                    size="lg"
                  />
                </div>
              </div>

              <b-button class="forget-password" v-b-modal.ForgetPassword>
                {{ $t("login.fogetPassword") }}
              </b-button>
              <b-button type="submit" class="login-button">
                {{ $t("login.login") }}
              </b-button>
            </form>
          </div>
          <div class="" v-else>
            <B2bTab />
          </div>
        </div>
        <div class="social-login" v-if="selectedType === 'b2c'">
          <p>{{ $t("login.LoginSocial") }}</p>
          <div
            class="social-icons d-flex justify-content-center align-items-center"
          >
            <button @click="getLink('facebook')" class="button-social">
              <font-awesome-icon icon="fa-brands fa-facebook-f" size="lg" />
            </button>
            <button @click="getLink('google')" class="button-social">
              <font-awesome-icon icon="fa-brands fa-google" size="lg" />
            </button>
            <button @click="getLink('azure')" class="button-social">
                <font-awesome-icon icon="fa-brands fa-windows" size="lg" />
              </button>
            <button @click="getLink('apple')" class="button-social apple-login">
              <font-awesome-icon icon="fa-brands fa-apple" size="lg" />
            </button>
          </div>
        </div>

        <div class="user-login-form" v-if="selectedType === 'b2c'">
          <p class="title">{{ $t("login.DontHave") }}</p>

          <b-button to="/user-register" class="login-button my-2" @click="hide">
            {{ $t("login.createAccount") }}
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
          <div
            class="error"
            v-for="(error, index) in errors.email"
            :key="index"
          >
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
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        token: "",
        device_type: "web",
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
        callback_url : `${this.mainDoamin}auth/check-reset-password`
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
        .catch((err) => {
          console.log(err);
        });
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
        type:'b2c'
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
    border: 1px solid rgba(204, 204, 204, 0.251);
    border-radius: 4px;
    background-color: rgba(216, 220, 221, 0.251);
    padding: 40px 30px 20px;

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
        background: #ed2124;
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
    padding: 20px 30px;
    margin: 0 5px;
    color: #fff;
    border: 0;
    border-radius: 5px;
    margin-bottom: 10px;

    &:first-child {
      background-color: #3b5998;
    }

    &:nth-child(2) {
      background-color: #c5221f;
    }

    &:nth-child(3) {
      background-color: #3b5998;
    }

    &:last-child {
      background-color: #c5221f;
    }
  }
}

.reset-Link {
  color: #ffffff;
  background-color: #ff0e00;
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
</style>
