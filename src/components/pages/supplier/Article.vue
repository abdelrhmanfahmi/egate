<template>
  <div class="article">
    <img :src="data.image" alt="Article Image" />
    <p>{{ data.content }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return { count: 0 };
  },
  props: {
    data: {
      type: Object,
      required: true,
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
