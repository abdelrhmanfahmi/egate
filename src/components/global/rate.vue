<template>
  <div>
    <!-- rate component  -->
    <b-form-rating
      id="rating-inline"
      inline
      :value="rateValue"
      color="#000"
      @change="changevalue "
      @click="testMe()"
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
    /**
      * change rate value
    */
    changevalue(rateValue) {
      this.rateValue = rateValue;
      this.$emit('changeRate',rateValue)
    },

  },
};
</script>

