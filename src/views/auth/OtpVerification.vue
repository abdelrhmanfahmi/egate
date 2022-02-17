<template>
  <section class="otp-verification">
    <b-alert variant="danger" show v-if="massageErr">
      {{ massageErr }}
    </b-alert>
    <b-row class="justify-content-center">
      <b-col lg="4" md="5" cols="10">
        <h1>welcome</h1>
        <h4>Please Verification Account</h4>
        <h5>The verification code has been sent to your phone</h5>
        <div class="block-header my-3">Verification Account</div>
        <form @submit.prevent="otpVerification()">
          <b-form-group>
            <label for="l-name">otp</label>
            <span class="requried">*</span>
            <b-form-input id="l-name" v-model="form.code" required />
          </b-form-group>
          <b-button type="submit" variant="danger"
            ><font-awesome-icon icon="fas fa-lock" /> Verification
          </b-button>
        </form>
        <div class="my-3 resend" @click="resendCode()">
          not arrived ? Resend
        </div>
      </b-col>
    </b-row>
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
  mounted() {},
  methods: {
    otpVerification() {
      auth
        .verificationMobile(this.form)
        .then(() => {
          // console.log(res);
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
  .block-header {
    background: linear-gradient(135deg, #bf2718 0, #ea6153 100%) !important;
    display: flex;
    padding: 12px;
    color: white;
    display: inline-block;
  }
  .resend {
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    &:hover {
      color: $main-color;
    }
  }
}
</style>
