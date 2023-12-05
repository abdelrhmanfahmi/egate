<template>
  <div class="counter-wrapper">
    <div class="counter d-flex aligned-row">
      <div class="minus-holder ">
        <button class="minus-value action" @click.stop="decrement">-</button>
      </div>
      <div class="value-holder ">
        <div class="current-value action">
          <input type="number" name="" id="" :value="currentValue" min="1" @keypress="changeInputValue" />
        </div>
      </div>
      <div class="plus-holder ">
        <button class="plus-value action" @click.stop="increment">+</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentValue: this.quantity ? this.quantity : 1 ,
    };
  },
  methods:{
    increment(){
        this.currentValue ++;
        this.$emit('changValue' , this.currentValue)
    },
    decrement(){
        if(this.currentValue >1){
            this.currentValue --
            this.$emit('changValue' , this.currentValue)
        }
    },
    changeInputValue(){
        setTimeout(() => {
            this.$emit('changValue' , this.currentValue)
        }, 500);
    }
  },
  props:{
    quantity:{
      type:Number,
      required:true
    }
  }
};
</script>

<style lang="scss" scoped>
.action {
  border: 1px solid #a3a3a1;
  padding: 3px 10px;
  border-radius: 5px;
}
.current-value {
    input{
        max-width: 30px;
        text-align: center;

    }
}
</style>
