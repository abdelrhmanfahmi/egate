<template>
  <div class="product-slider" v-if="mediaExist">
    <div class="content d-flex">
      <div class="main-img mr-2">
        <img id="main-img" :src="currentImage" v-if="currentImage" />
        <img id="main-img" :src="firstImage" v-else />
      </div>
      <div class="images d-flex flex-column">
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
import categories from "@/services/categories";
export default {
  data() {
    return {
      id: this.$route.query.id,
      active: -1,
      currentImage: "",
      myProduct: null,
      firstImage: null,
      // images: [
      //   "https://media.istockphoto.com/photos/orange-picture-id185284489",
      //   "https://media.istockphoto.com/photos/red-apple-picture-id184276818",
      //   "https://media.istockphoto.com/photos/green-apple-fruit-with-green-leaf-isolated-on-white-picture-id920478620",
      // ],
      images: [],

      mediaExist: false,
    };
  },
  methods: {
    changeImage(i) {
      this.currentImage = this.images[i].image_path;
      this.active = i;
    },
    productDetails() {
      this.loading = true;
      categories
        .productDetails(this.id)
        .then((res) => {
          this.myProduct = res.data.items;
          // this.images = res.data.items.images;

          // product.image_path == null && product.product.image_path
          if (res.data.items.images.length !== 0) {
            this.images = res.data.items.images;
            this.firstImage = res.data.items.images[0].image_path;
            this.mediaExist = true;
          }

          if (
            res.data.items.images.length == 0 &&
            res.data.items.product.images.length !== 0
          ) {
            this.images = res.data.items.product.images;
            this.firstImage = res.data.items.product.images[0].image_path;
            this.mediaExist = true;
          }

          // this.images = res.data.items.images;
          // if (res.data.items.images.length > 0) {
          //   this.firstImage = res.data.items.images[0].image_path;
          // }

          // console.log(res.data.items.images.length == 0);

          if (
            res.data.items.images.length === 0 &&
            res.data.items.product.images.length === 0 &&
            res.data.items.product.image_path
          ) {
            this.firstImage = res.data.items.product.image_path;
            this.mediaExist = true;
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  mounted() {
    this.productDetails();
    this.active = 0;
  },
};
</script>
<style lang="scss" scoped>
.product-slider {
  color: #000;
  .content {
    color: #000;
    .images {
      margin-inline-end: 0.5rem;
      .product-img {
        color: #000;
        img {
          width: 6rem;
          height: 6rem;
          cursor: pointer;
          border-radius: 0.5rem;
          border: 3px solid #ebebeb;
          transition: all ease-out 0.5s;

          &.active {
            border-color: #ff6000;
          }
        }
      }
    }
    .main-img {
      border-radius: 0.5rem;
      img {
        border-radius: 0.5rem;
        width: 35rem;
        height: 35rem;
        transition: all ease-out 0.5s;
      }
    }
  }
}
</style>
