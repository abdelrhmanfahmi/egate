<template>
  <div class="contactUs">
    <div class="header">{{ $t("contactUs.contactUs") }}</div>
    <ContactUs></ContactUs>
  </div>
</template>
<script>
import ContactUs from "@/components/pages/contactUs/ContactUs.vue";
export default {
  components: {
    ContactUs,
  },
  data() {
    return { count: 0 };
  },
};
</script>
<style lang="scss" scoped>
.contactUs {
  .header {
    text-align: center;
    font-size: 24pt;
    margin: 4rem 0;
    color: #312620;
  }
}
</style>
