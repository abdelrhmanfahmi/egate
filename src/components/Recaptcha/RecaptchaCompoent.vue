<template>
  <div class="">
    <div :class="{ mx_recaptcha_failed: !recaptcha }">
      <VueRecaptcha

        sitekey="6Lc6rUgmAAAAAFnk-PkR0u62_Oy1PCaeIFylZTg6"
        @verify="mxVerify"
      />
      <br />
      <small>Doesn't complete!</small>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
export default {
  components: { VueRecaptcha },
  methods: {
    mxVerify(response) {
      this.recaptcha = response;
      this.$emit('psssrecaptcha' , response);
    },
  },
  data() {
    return {
      recaptcha: null,
    };
  },
};
</script>

<style lang="scss" scoped>
small {
  color: red;
  display: none;
}
.mx_form_inv .mx_empty_filed ~ small {
  display: block;
}
.mx_form_inv .mx_recaptcha_failed small {
  display: block;
}
</style>