<template>
  <div>
    <b-form-rating
      id="rating-inline"
      inline
      :value="rateValue"
      color="#000"
      @change="changevalue"
    ></b-form-rating>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rateValue: 0,
    };
  },
  methods: {
    changevalue(rateValue) {
      this.rateValue = rateValue;
      this.$emit('changeTitle',rateValue)
    },
  },
};
</script>

<style></style>
