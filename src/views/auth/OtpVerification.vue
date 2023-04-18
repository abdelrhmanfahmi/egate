<template>
  <!-- otp verify page  -->
  <section class="otp-verification">
    <b-alert variant="danger" show v-if="massageErr">
      {{ massageErr }}
    </b-alert>

    <div class="otp-form">
      <h1>{{ $t("login.welcome") }}</h1>
      <h4>{{ $t("register.pleaseVerification") }}</h4>
      <h5>{{ $t("register.codeSent") }}</h5>
      <div class="block-header my-3">
        {{ $t("register.verificationAccount") }}
      </div>
      <div class="" v-if="registerOTP">
        <form @submit.prevent="otpVerification()">
          <b-form-group>
            <label for="l-name">otp</label>
            <span class="requried">*</span>
            <b-form-input id="l-name" v-model="form.code" required />
          </b-form-group>
          <b-button type="submit" variant="danger">
            <font-awesome-icon icon="fas fa-lock" />
            {{ $t("register.verification") }}
          </b-button>
        </form>
        <div class="my-3 resend" @click="resendCode()">
          {{ $t("register.notArrive") }}
        </div>
      </div>
      <div class="" v-else>
        <form @submit.prevent="otpChangingVerification()">
          <b-form-group>
            <label for="l-name">otp</label>
            <span class="requried">*</span>
            <b-form-input id="l-name" v-model="form.code" required />
          </b-form-group>
          <b-button type="submit" variant="danger">
            <font-awesome-icon icon="fas fa-lock" />
            {{ $t("register.verification") }}
          </b-button>
        </form>
        <div class="my-3 resend" @click="resendCode()">
          {{ $t("register.notArrive") }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import auth from "@/services/auth";

export default {
  data() {
    return {
      form: {
        code: "",
      },
      massageErr: "",
      registerOTP: true,
    };
  },
  mounted() {
    if (!this.$route.query.type) {
      this.emailVerify();
    }
    if (this.$route.query.type) {
      this.registerOTP = false;
      this.emailChangingVerify();
    }
  },
  methods: {
    /**
     * @vuese
     * emailVerify function 
     */
    emailVerify() {
      if (this.$route.query.uuid) {
        const payload = {
          uuid: this.$route.query.uuid,
          email: this.$route.query.email,
          code: this.$route.query.code,
        };
        auth
          .emailVerify(payload)
          .then((res) => {
            this.sucessMsg(res.data.message);
            localStorage.removeItem("massege");
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    /**
     * @vuese
     * otpVerification function
     */
    otpVerification() {
      auth
        .verificationMobile(this.form)
        .then(() => {
          this.$router.push("/profile/account-information-b2b");
          this.$store.dispatch("getUserInfo");
        })
        .catch((error) => {
          const err = Object.values(error)[2].data.message;
          this.massageErr = err;
        });
    },
    /**
     * @vuese
     * resendCode function 
     */
    resendCode() {
      auth
        .resendCodeMobile()
        .then((res) => {
          this.sucessMsg(res.data.message);
        })
        .catch((error) => {
          const err = Object.values(error)[2].data.message;
          this.errMsg(err.message);
        });
    },

    /**
     * @vuese
     * emailChangingVerify function
     */
    emailChangingVerify() {
      if (this.$route.query.uuid) {
        const payload = {
          uuid: this.$route.query.uuid,
          email: this.$route.query.email,
          code: this.$route.query.code,
        };
        auth
          .emailVerify(payload)
          .then((res) => {
            this.sucessMsg(res.data.message);
            localStorage.removeItem("massege");
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    /**
     * @vuese
     * otpChangingVerification function
     */
    otpChangingVerification() {
      auth
        .otpChangingVerification(this.form)
        .then(() => {
          this.$router.push("/profile/account-information-b2b");
          this.$store.dispatch("getUserInfo");
        })
        .catch((error) => {
          const err = Object.values(error)[2].data.message;
          this.massageErr = err;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
/**
 * page style
*/
.otp-verification {
  text-align: center;

  h1 {
    color: black;
  }

  .otp-form {
    .block-header {
      background: linear-gradient(135deg, #bf2718 0, #ea6153 100%) !important;
      display: flex;
      padding: 12px;
      color: white;
      display: inline-block;
    }

    input {
      max-width: 50%;
      margin: auto;
    }

    .resend {
      transition: all 0.5s ease-in-out;
      cursor: pointer;

      &:hover {
        color: $main-color;
      }
    }
  }
}
</style>
