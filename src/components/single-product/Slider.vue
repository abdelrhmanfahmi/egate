<template>
  <!-- product images slider  -->
  <div class="product-slider" v-if="mediaExist">
    <div class="content">
      <!-- curent image ( selected image to show ) -->
      <div class="main-img mb-2">
        <img id="main-img" :src="currentImage" v-if="currentImage" />
        <img id="main-img" :src="firstImage" v-else />
      </div>
      <!-- other product images  -->
      <div class="images d-flex">
        <div
          class="product-img mb-2"
          v-for="(img, index) in images"
          :key="index"
        >
          <img
            v-if="img.image_path"
            :src="img.image_path"
            @click="changeImage(index)"
            :class="[index === active ? 'active' : null]"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import categories from "@/services/categories";

export default {
  props: {
    // selected Product prop
    myProduct: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      id: this.$route.query.id,
      active: -1,
      currentImage: "",
      // myProduct: null,
      firstImage: null,
      images: [],
      mediaExist: false,
    };
  },
  methods: {
    /**
     * @vuese
     *  change product selected image
     */
    changeImage(i) {
      this.currentImage = this.images[i].image_path;
      this.active = i;
    },
    /**
     * @vuese
     *  get product details to show images
     */
    // productDetails() {
    //   this.loading = true;
    //   categories
    //     .productDetails(this.id)
    //     .then((res) => {
    //       this.myProduct = res.data.items;
    //       if (res.data.items.images.length !== 0) {
    //         /**
    //          *  take 6 images only of product images for responsive view
    //          */
    //         this.images = res.data.items.images.slice(0, 6);
    //         this.firstImage = res.data.items.images[0].image_path;
    //         this.mediaExist = true;
    //       }

    //       if (
    //         res.data.items.images.length == 0 &&
    //         res.data.items.product.images.length !== 0
    //       ) {
    //         this.images = res.data.items.product.images;
    //         this.firstImage = res.data.items.product.images[0].image_path;
    //         this.mediaExist = true;
    //       }
    //       if (
    //         res.data.items.images.length === 0 &&
    //         res.data.items.product.images.length === 0 &&
    //         res.data.items.product.image_path
    //       ) {
    //         this.firstImage = res.data.items.product.image_path;
    //         this.mediaExist = true;
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       this.loading = false;
    //     });
    // },
    settingProduct() {
      if (this.myProduct.images.length !== 0) {
        /**
         *  take 6 images only of product images for responsive view
         */
        this.images = this.myProduct.images.slice(0, 6);
        this.firstImage = this.myProduct.images[0].image_path;
        this.mediaExist = true;
      }

      if (
        this.myProduct.images.length == 0 &&
        this.myProduct.product.images.length !== 0
      ) {
        this.images = this.myProduct.product.images;
        this.firstImage = this.myProduct.product.images[0].image_path;
        this.mediaExist = true;
      }
      if (
        this.myProduct.images.length === 0 &&
        this.myProduct.product.images.length === 0 &&
        this.myProduct.product.image_path
      ) {
        this.firstImage = this.myProduct.product.image_path;
        this.mediaExist = true;
      }
    },
  },
  mounted() {
    // this.productDetails();
    this.settingProduct();
    /**
     * @vuese
     *  setting active = 0 to show first image of product images first
     */
    this.active = 0;
  },
};
</script>
<style lang="scss" scoped>
/**
   * component style.
   * @style
*/
.product-slider {
  color: #000;

  .content {
    color: #000;

    .images {
      margin-inline-end: 0.5rem;

      .product-img {
        color: #000;

        img {
          width: 5rem;
          height: 5rem;
          cursor: pointer;
          border-radius: 0.5rem;
          border: 3px solid #ebebeb;
          transition: all ease-out 0.5s;
          margin: 0 10px;

          &.active {
            border-color: #ff6000;
          }
        }
      }

      @media (max-width: 992px) {
        flex-direction: row !important;
      }
    }

    .main-img {
      border-radius: 0.5rem;

      img {
        border-radius: 0.5rem;
        width: 35rem;
        height: 30rem;
        transition: all ease-out 0.5s;
      }
    }

    @media (max-width: 992px) {
      display: block !important;
    }
  }
}
</style>
