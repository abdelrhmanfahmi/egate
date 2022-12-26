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
     * @vuese
      * change rate value function
    */
    changevalue(rateValue) {
      this.rateValue = rateValue;
      // change rate value 
      this.$emit('changeRate',rateValue)
    },

  },
};
</script>

