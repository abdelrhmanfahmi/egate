<template>
  <div>
    <b-container> variants , id : {{ id }} </b-container>
    <Items />
  </div>
</template>

<script>
import Items from "../Items.vue"
export default {
  data() {
    return {
      id: this.$route.params.slug,
    };
  },
  components:{
    Items
  }
};
</script>

<style></style>
