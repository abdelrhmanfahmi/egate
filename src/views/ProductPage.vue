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
        <ProductPage :product="product"/>
      </v-app>
    </div>
  </div>
</template>

<script>
import ProductPage from "@/components/product/ProductPage.vue";
import globalAxios from "@/services/global-axios";
import {useMeta} from "vue-meta";

export default {
  data: () => ({
    items: [
      {
        title: "ELECTRONICS",
        disabled: false,
        href: "breadcrumbs_dashboard",
      },

      {
        title: "COMPUTERS COMPONENTS & ACCESSORIES",
        disabled: false,
        href: "breadcrumbs_link_1",
      },
      {
        title: "LAPTOPS & NOTEBOOKS",
        disabled: true,
        href: "breadcrumbs_link_2",
      },
    ],

    product: {},
    id: null,

  }),

  mounted() {
    this.checkID()
    this.getProduct()
  },

  components: {
    ProductPage,
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
      const response = await globalAxios.get(`client/products/${this.id}`);
      this.product = response.data.items;
      localStorage.setItem('dataProduct' , JSON.stringify(response.data.items));
    },

  },
  
};
</script>

<style></style>
