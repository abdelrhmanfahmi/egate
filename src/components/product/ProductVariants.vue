<template>
  <div>
    <div class="wrapper">
      <!-- <template v-if="product.variants.length > 0"> -->
      <div class="details-filter-row details-row-size">
        <div class="product-nav product-nav-dots" v-for="(variant, index) in product.variantData" :key="index">
          <div>
              <label>{{ index }}</label>
              <a
              href="#"
              v-for="(value, idx) in variant.values"
              :key="idx"
              :dataname="index"
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
  methods: {
    async checkID() {
      if (this.$route.params.id) {
        this.id = this.$route.params.id
      } else if (this.$route.query.id) {
        this.id = this.$route.query.id
      }
    },
    async selectColor(event,idx1 ,item , value){
      if(idx1 == event.target.getAttribute('dataname')){
        event.target.classList.toggle("active");
      }

      if(event.target.classList.contains('active')){
        this.newObj.attribute_id = item.attribute_name_id;
        this.newObj.attribute_value_id = value.attribute_value_id;
        this.variants.push({...this.newObj});

        const response = await globalAxios.get(`client/products/${this.id}/variant` , {params: {variants: JSON.stringify(this.variants)}});
        this.totalPrice += response.data.items.price;
        console.log(this.totalPrice , 'from product variant');
        console.log(this.variants);
        this.$emit('updatePrice', this.totalPrice);
      }else{
        let newArrFiltered = this.removeObjectWithId(this.variants , item.attribute_name_id , value.attribute_value_id);

        const response = await globalAxios.get(`client/products/${this.id}/variant` , {params: {variants: JSON.stringify(newArrFiltered)}});
        this.totalPrice -= response.data.items.price;
        this.$emit('updatePrice', this.totalPrice);

        console.log(newArrFiltered);
      }
    },
    removeObjectWithId(arr, attribute_id , attribute_value_id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.attribute_id == attribute_id && obj.attribute_value_id == attribute_value_id);

      if (objWithIdIndex > -1) {
        arr.splice(objWithIdIndex, 1);
      }

      return arr;
    },
    // selectColor: function (item) {
    //   if (item == this.selectedVariant.color) {
    //     this.selectedVariant = {
    //       ...this.selectedVariant,
    //       color: null,
    //       colorName: null,
    //       price: item.price,
    //     };
    //   } else {
    //     this.selectedVariant = {
    //       ...this.selectedVariant,
    //       color: item,
    //       colorName: item.colorName,
    //       price: item.price,
    //     };
    //   }
    //   //   this.refreshSelectableGroup();
    // },
    // refreshSelectableGroup: function () {
    //   let tempArray = [...this.variationGroup];
    //   if (this.selectedVariant.color) {
    //     tempArray = this.variationGroup.reduce((acc, cur) => {
    //       if (this.selectedVariant.color !== cur.color) {
    //         return acc;
    //       }
    //       return [...acc, cur];
    //     }, []);
    //   }

    //   this.sizeArray = tempArray.reduce((acc, cur) => {
    //     if (acc.findIndex((item) => item.size == cur.size) !== -1) return acc;
    //     return [...acc, cur];
    //   }, []);

    //   tempArray = [...this.variationGroup];
    //   if (this.selectedVariant.size) {
    //     tempArray = this.variationGroup.reduce((acc, cur) => {
    //       if (this.selectedVariant.size !== cur.size) {
    //         return acc;
    //       }
    //       return [...acc, cur];
    //     }, []);
    //   }

    //   this.colorArray = this.product.variants.reduce((acc, cur) => {
    //     if (tempArray.findIndex((item) => item.color == cur.color) == -1) {
    //       return [
    //         ...acc,
    //         {
    //           color: cur.color,
    //           colorName: cur.color_name,
    //           price: cur.price,
    //           disabled: true,
    //         },
    //       ];
    //     }
    //     return [
    //       ...acc,
    //       {
    //         color: cur.color,
    //         colorName: cur.color_name,
    //         price: cur.price,
    //         disabled: false,
    //       },
    //     ];
    //   }, []);
    // },
  },
  data() {
    return {
      id:null,
      totalPrice:0,
      variants:[],
      newObj:{}
      // colorArray: [
      //   "#E0E0E0",
      //   "#D30E0E",
      //   "#1C2E95",
      //   "#3A8B1C",
      // ],
      // selectedVariant: {
      //   color: null,
      //   colorName: null,
      //   price: null,
      //   size: null,
      // },
    };
  },
  mounted(){
    // this.selectedVariant.color = this.colorArray[0]
    this.checkID();
  },
  props:['product']
  // props: {
  //   product: {
  //     type: Object,
  //     required: true
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.product-nav {
  display: flex;
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
