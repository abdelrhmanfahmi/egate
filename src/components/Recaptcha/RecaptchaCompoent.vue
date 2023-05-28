<template>
  <div class="test">
    <form action="" @submit.prevent="submit">
      <input type="text" />
      <VueSimpleRecaptcha
        sitekey="6Lc6rUgmAAAAAFnk-PkR0u62_Oy1PCaeIFylZTg6"
        ref="recaptcha"
        @callback="callback"
      />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import VueSimpleRecaptcha from "vue-simple-recaptcha";
export default {
  components: {
    VueSimpleRecaptcha,
  },
  methods: {
    onloadCallback() {
      alert("grecaptcha is ready!");
    },
  },
  mounted() {
    this.onloadCallback();
  },
};
</script>

<style>
</style>