<template>
  <div class="article" v-if="supplier">
    <img :src="supplier.image_path" alt="Article Image" v-if="supplier.image_path" />
    <p v-if="supplier.brief" class="mt-2">{{ supplier.brief }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return { count: 0 };
  },
  props: {

    supplier: {
      type:Object,

      default: () => {},
    },
  },
};
</script>
<style lang="scss" scoped>
.article {
  img {
    height: auto;
    width: 100%;
  }
}
</style>
