<template>
  <div>
    <b-container> variants , id : {{ id }} </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.slug,
    };
  },
};
</script>

<style></style>
