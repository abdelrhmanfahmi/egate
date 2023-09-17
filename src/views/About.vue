<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { useMeta } from "vue-meta";
export default {
  setup() {
    useMeta({
      title: "About",
      htmlAttrs: { lang: "en", amp: true },
    });
  },
  mounted(){
    this.$nextTick(() => {
      document.dispatchEvent(new Event("render-complete"));
    });
  }
};
</script>