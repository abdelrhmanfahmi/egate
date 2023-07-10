<template>
  <div>
    <div class="wrapper">
      <v-app >
        <v-container>
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
import {useMeta} from "vue-meta"
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
    product: null,
    id: null

  }),
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
      await this.$store.dispatch('getProduct', this.id)
    },
  },
  async mounted() {
    this.checkID()
    this.getProduct()
    this.$nextTick(() => {
      document.dispatchEvent(new Event("render-complete"));
    });
  },
  computed: {
    product() {
      return this.$store.getters.product
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // this.id = this.$route.params.id
        // this.getProduct()
        location.reload()
      }
    )
  },
  setup() {
    useMeta({
      title: "Product Page",
      htmlAttrs: { lang: "en", amp: true },
    });
  },
};
</script>

<style></style>
