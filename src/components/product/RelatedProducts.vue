<template>
  <div>
    <section >
      <OffersComponent :productsCategory="productsCategory" :sectionTitle="'More About Air Conditioner'" />
    </section>
    <section>
      <OffersComponentBrand :productsBrand="productsBrand" :sectionTitle="'More About Fresh'" />
    </section>
  </div>
</template>

<script>
import OffersComponent from "@/components/home/OffersComponent.vue";
import OffersComponentBrand from "@/components/home/OffersComponentBrand.vue";
import globalAxios from "@/services/global-axios";
export default {
  data(){
    return {
      productsCategory:[],
      productsBrand:[],
      category_ids:[]
    }
  },
  mounted(){
    this.getProductsPerCategory();
    this.getProductsPerBrand();
  },
  methods:{
    async getProductsPerCategory(){
      let productData = JSON.parse(localStorage.getItem('dataProduct'));
      this.category_ids = productData.categories.map(function (el){
          return el.id;
      });
    
      const response = await globalAxios.get('client/products/relational/products' , {params: {category_ids: this.category_ids}});
      this.productsCategory = response.data.items.data;
    },

    async getProductsPerBrand(){
      let productData = JSON.parse(localStorage.getItem('dataProduct'));
      const response = await globalAxios.get('client/products/relational/products' , {params: {brand_id: productData.brand_id}});
      this.productsBrand = response.data.items.data;
    }
  },
  components: {
    OffersComponent,
    OffersComponentBrand
  },
  props:['product'],
};
</script>

<style lang="scss" scoped>
section{
    margin:5% 0
}
</style>
