<template>
  <div class="subscribe-newsletter">
    <h4 class="main-header">{{ $t("profile.subscribeNewsletter") }}</h4>
    <div class="sec-subscribe">
      <h6 class="main-header">{{ $t("profile.notSubscribed") }}</h6>
      <p>{{ $t("profile.exclusiveOffers") }}</p>
      <b-button type="submit" class="login-button">
        {{ $t("profile.subscribe") }}
      </b-button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.subscribe-newsletter {
  padding: 30px 0;

  .sec-subscribe {
    margin: 30px 0;
    padding: 30px 0;
    text-align: center;
    border-bottom: 2px solid #dee2e6;
    border-top: 2px solid #dee2e6;
    .login-button {
      margin: 10px auto 0;
      width: 20%;
    }
  }
}
html:lang(ar) {
  .subscribe-newsletter {
    text-align: right;
  }
}
</style>