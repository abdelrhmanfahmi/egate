<template>
  <div class="wrapper">
    <v-img :src="imageSrc" alt="image" class="coverImage"></v-img>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.coverImage {
  min-height: 50vh;
}
</style>
