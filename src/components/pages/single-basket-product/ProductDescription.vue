<template>
  <div>
    <!-- product description  -->
    <p
      class="description"
      v-if="myProduct.description !== null"
      v-html="myProduct.description"
    ></p>
  </div>
</template>

<script>
export default {
  /**
   * @vuese
   *  pass product data as prop
   */

  props: {
    // selected Product prop
    myProduct: {
      type: Object,
      required: true,
    },
  },
};
</script>
