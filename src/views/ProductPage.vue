<template>
  <div>
    <div class="wrapper">
      <v-app >
        <v-container fluid>
          <v-breadcrumbs :items="items">
            <template v-slot:prepend>
              <v-icon size="small" icon="mdi-home"></v-icon>
            </template>
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>
        </v-container>
        <ProductPage :product="product" />
      </v-app>
    </div>
  </div>
</template>

<script>
import ProductPage from "@/components/product/ProductPage.vue";
import globalAxios from "@/services/global-axios";

export default {
  data: () => ({
    // items: [
    //   {
    //     title: "ELECTRONICS",
    //     disabled: false,
    //     href: "breadcrumbs_dashboard",
    //   },

    //   {
    //     title: "COMPUTERS COMPONENTS & ACCESSORIES",
    //     disabled: false,
    //     href: "breadcrumbs_link_1",
    //   },
    //   {
    //     title: "LAPTOPS & NOTEBOOKS",
    //     disabled: true,
    //     href: "breadcrumbs_link_2",
    //   },
    // ],

    items:[
        {
            title: "",
            disabled: false,
            href: "",
        },
    ],

    product: {},
    id: null,

  }),

  components: {
    ProductPage,
  },

  mounted(){
    this.checkID();
    this.getProduct();
  },

  methods: {
    async checkID() {
      if (this.$route.params.id) {
        this.id = this.$route.params.id
      } else if (this.$route.query.id) {
        this.id = this.$route.query.id
      }
    },
    async getProduct() {
      try{
        const response = await globalAxios.get(`client/products/${this.$route.params.id}`);
        this.product = response.data.items;
        localStorage.setItem('dataProduct' , JSON.stringify(response.data.items));
        this.items[0].title = response.data.items.name_en;
        this.items[0].disabled = false;
        this.items[0].href = "/productPage/"+response.data.items.id;
      }catch(e){
        console.log(e);
      }
    },
  },
  watch: {
      '$route.params.id' (newVal,oldVal) {
        if(newVal != oldVal){
          this.getProduct();
        }
      }
  },
  
};
</script>

<style></style>
