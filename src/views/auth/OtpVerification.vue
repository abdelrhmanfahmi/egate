<template>
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
      <form @submit.prevent="otpVerification()">
        <b-form-group>
          <label for="l-name">otp</label>
          <span class="requried">*</span>
          <b-form-input id="l-name" v-model="form.code" required />
        </b-form-group>
        <b-button type="submit" variant="danger"
          ><font-awesome-icon icon="fas fa-lock" />
          {{ $t("register.verification") }}
        </b-button>
      </form>
      <div class="my-3 resend" @click="resendCode()">
        {{ $t("register.notArrive") }}
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
    };
  },
  mounted() {
    this.emailVerify();
  },
  methods: {
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
            this.$bvToast.toast(res.data.message, {
              variant: "success",
              title: "success",
              autoHideDelay: 5000,
            });
            localStorage.removeItem("massege");
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    otpVerification() {
      auth
        .verificationMobile(this.form)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          const err = Object.values(error)[2].data.message;
          this.massageErr = err;
        });
    },
    resendCode() {
      auth
        .resendCodeMobile()
        .then((res) => {
          this.$bvToast.toast(res.data.message, {
            variant: "success",
            title: "success",
            autoHideDelay: 5000,
          });
        })
        .catch((error) => {
          const err = Object.values(error)[2].data.message;
          this.$bvToast.toast(err, {
            variant: "danger",
            title: "Error",
            autoHideDelay: 5000,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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
