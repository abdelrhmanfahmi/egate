<template>
  <div>
    <div class="wrapper">
      <!-- <template v-if="product.variants.length > 0"> -->
      <div class="details-filter-row details-row-size">
        <div class="product-nav product-nav-dots" v-for="(variant, index) in product.variantData" :key="index">
          <label>{{ index }}</label>
          <div class="d-flex">
              <a
              href="#"
              v-for="(value, idx) in variant.values"
              :key="idx"
              :dataname="index"
              :class="'choosen '+ index"
              :dataAttributeId="variant.attribute_name_id"
              :dataAttributeValueId="value.attribute_value_id"
              :style="{ 'background-color': value.attribute_code }"
              @click.prevent="selectColor($event,index,variant,value)"
            ></a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- :class="{
                active: item == selectedVariant.color,
                disabled: item.disabled,
              }" -->
</template>

<script>
import globalAxios from '@/services/global-axios';

export default {
  mounted(){
    this.checkID();
  },

  data() {

    return {
      id:null,
      totalPrice:0,
      variants:[]
    };
  },

  props:['product'],

  methods: {
    async checkID() {
      if (this.$route.params.id) {
        this.id = this.$route.params.id
      } else if (this.$route.query.id) {
        this.id = this.$route.query.id
      }
    },

    async selectColor(event,idx1 ,item , value){

      console.log('sayed here');

      if(idx1 == event.target.getAttribute('dataname')){
        this.totalPrice = 0;
        let choosenAttributeValues = document.getElementsByClassName('choosen ' + idx1);
        for(let i = 0 ; i < choosenAttributeValues.length ; i++){
          choosenAttributeValues[i].classList.remove("active");
          this.removeObjectWithId(this.variants , choosenAttributeValues[i].getAttribute('dataAttributeId') , choosenAttributeValues[i].getAttribute('dataAttributeValueId'));
        }
        event.target.classList.add("active");

        let newObj = {};
        newObj.attribute_id = item.attribute_name_id;
        newObj.attribute_value_id = value.attribute_value_id;
        this.variants.push(newObj);

        const response = await globalAxios.get(`client/products/${this.id}/variant` , {params: {variants: JSON.stringify(this.variants)}});
        this.totalPrice += response.data.items.price;
        console.log(this.totalPrice , 'from product variant');
        console.log(this.variants);
        this.$emit('updatePrice', this.totalPrice);
      }
    },

    removeObjectWithId(arr, attribute_id , attribute_value_id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.attribute_id == attribute_id && obj.attribute_value_id == attribute_value_id);

      if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex, 1);
      }

      return arr;
    },
  }
};
</script>

<style lang="scss" scoped>
.product-nav {
  // display: flex;
  padding-bottom: 0.5rem;
  align-items: center;
}
.product-nav-dots a {
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 0.2rem solid #fff;
  margin-right: 0.5rem;
  transition: box-shadow 0.35s ease;
  background-repeat: no-repeat;
  background-position: center center;
}
.product-nav-dots a,
.product-nav-dots span {
  width: 2rem;
  height: 2rem;
}
.product-nav-dots a.active {
  box-shadow: 0 0 0 0.1rem #cccccc;
}
</style>
