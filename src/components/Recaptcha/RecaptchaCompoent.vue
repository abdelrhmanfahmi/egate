<template>
  <div class="recaptchaComponent-holder">
    <vue-hcaptcha
      sitekey="6LediTEmAAAAALGYwvubar0pFsbsnpvdzUyPVB_3"
      @verify="onVerify"
      @expired="onExpire"
      @challenge-expired="onChallengeExpire"
      @error="onError"
    ></vue-hcaptcha>
  </div>
</template>

<script>
import VueHcaptcha from "@hcaptcha/vue-hcaptcha";
export default {
  components: { VueHcaptcha },
  methods: {
    onVerify: (token, eKey) => {
      console.log("Verified: ", { token, eKey });
    },
    onExpire: () => {
      console.log("Token expired");
    },
    onChallengeExpire: () => {
      console.log("Challenge expired");
    },
    onError: (err) => {
      console.log("Error", err);
    },
  },
};
</script>
<style lang="scss" scoped>
.recaptchaComponent-holder {
  position: fixed;
  bottom: 30px;
  left: 30px;
}
</style>