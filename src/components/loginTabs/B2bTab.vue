<template>
  <section class="user-register text-center my-5">
    <!-- login b2b tab     -->
    <div class="user-register-form">
      <b-row class="justify-content-center">
        <b-col lg="10">
          <div class="register-info">
            <!-- <h4 class="main-header">{{ $t("register.mainInformation") }}</h4> -->
            <!-- <router-link to="/b2b-register" class="back">
              <span class="main-color">
                &#60; {{ $t("register.haveNotAccount") }}</span
              >
            </router-link> -->
          </div>
          <form @submit.prevent="login()">
            <b-row class="justify-content-center">
              <!-- Email -->
              <b-col lg="12">
                <b-form-group>
                  <label for="email">{{ $t("register.email") }}</label>
                  <span class="requried">*</span>
                  <b-form-input type="email" id="email" v-model="form.email" />
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
              <b-col lg="12">
                <b-form-group>
                  <label for="password">{{ $t("register.password") }}</label>
                  <span class="requried">*</span>
                  <div class="show-password">
                    <b-form-input
                      id="password"
                      v-model="form.password"
                      :type="fieldType"
                    />
                    <div class="icon-passowrd" @click.stop="switchField()">
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
            </b-row>

            <a v-if="buyerUserData && buyerUserData.type === 'b2c'">
              <b class="forget-password my-3" v-b-modal.B2BForgetPassword>
                {{ $t("login.fogetPassword") }}
              </b>
            </a>
            <a to="/forget-password" v-else v-b-modal.B2BForgetPassword>
              <b class="forget-password my-3">
                {{ $t("login.fogetPassword") }}
              </b>
            </a>

            <div class="submition-box">
              <b-button type="submit" class="bg-main">
                {{ $t("register.submit") }}
              </b-button>
            </div>
          </form>
        </b-col>
      </b-row>
      <RecapchaComponent @psssrecaptcha="recaptchaValue($event)" />
      <div class="user-login-form mt-3">
        <b-button to="/b2b-register" class="login-button my-2 border-main">
          <b>{{ $t("login.DontHave") }} {{ $t("login.createAccount") }}</b>
        </b-button>
      </div>
    </div>
    <b-modal
      id="B2BForgetPassword"
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
  </section>
</template>
<script>
import auth from "@/services/auth";
import RecapchaComponent from "@/components/Recaptcha/RecaptchaCompoent.vue";
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
      errors: {},
      emailForget: "",
    };
  },
  methods: {
    recaptchaValue($event) {
      this.form.recaptcha = $event;
    },
    //  /**
    //  * @vuese
    //  * login function
    //  */
    login() {
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
        .login("buyer", loginData)
        .then((res) => {
          localStorage.setItem("userInfo", JSON.stringify(res.data.items));

          // if (!res.data.items.item.verify_email_required) { this.buyerUserData.profile_percentage == 100

          if (!res.data.items.item.email_verified_at) {
            localStorage.setItem("massege", this.$t("register.openEmail"));
            localStorage.removeItem("guest-id");
            this.$router.push("/profile/account-information-b2b");
            location.reload();
          } else if (!res.data.items.item.mobile_verified_at) {
            localStorage.setItem("massege", this.$t("register.otpVerify"));
            localStorage.removeItem("guest-id");
            this.$router.push("/profile/account-information-b2b");
            location.reload();
          } else {
            localStorage.setItem("massege", "");
            localStorage.removeItem("guest-id");
            this.$router.push("/profile/categories");
            location.reload();
          }

          // if (
          //   (res.data.items.item.type === "buyer" &&
          //     res.data.items.item.is_verified) ||
          //   (res.data.items.item.type === "supplier" &&
          //     res.data.items.item.is_buyer == 1 &&
          //     res.data.items.item.is_verified)
          // ) {
          //   localStorage.setItem("massege", "");
          //   localStorage.removeItem("guest-id");
          //   this.$router.push("/profile/categories");
          //   location.reload();
          // } else {
          //   localStorage.setItem("massege", this.$t("register.openEmail"));
          //   localStorage.removeItem("guest-id");
          //   this.$router.push("/profile/account-information-b2b");
          //   location.reload();
          // }

          // location.reload();
        })
        .catch((error) => {
          const err = Object.values(error)[2].data;
          this.errors = err.items;
          this.errMsg(err.message);
        });
    },
    //  /**
    //  * @vuese
    //  * switchField function to show password
    //  */
    switchField() {
      this.fieldType = this.fieldType === "password" ? "text" : "password";
    },
    sendEmail() {
      const payload = {
        email: this.emailForget,
        callback_url: `${this.mainDoamin}Forget-Password`,
        type: "buyer",
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
  },
  mounted() {},
  computed: {
    firebaseToken() {
      return this.$store.state.firebaseToken;
    },
  },
  components: {
    RecapchaComponent,
  },
};
</script>

<style lang="scss" scoped>
/**
    * component style  
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
        /**
          * header-color  
        */
        color: $header-color;

        &:hover {
          color: $main-color;
        }
      }
    }

    .submition-box {
      text-align: center;
      //border: 1px solid rgba(204, 204, 204, 0.251);
      //border-radius: 4px;
      //background-color: rgba(216, 220, 221, 0.251);
      padding: 20px;
      button {
        width: 100%;
        padding: 14px;
        background: $main-color;
        color: #fff;
      }
    }
  }
}

.forget-password {
  display: block;
  font-weight: 500;
  color: $header-color;
  background-color: transparent;
  border: none;

  &:hover {
    color: $main-color;
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
.reset-Link {
  color: #ffffff;
  background-color: $main-color;
  padding: 0.5rem 1.3rem;
  width: 100%;
}
</style>
