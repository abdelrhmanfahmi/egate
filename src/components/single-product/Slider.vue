<template>
  <div class="product-slider">
    <div class="content d-flex">
      <div class="images d-flex flex-column">
        <div
          class="product-img mb-2"
          v-for="(img, index) in images"
          :key="index"
        >
          <img :src="img" @click="changeImage(index)" />
        </div>
      </div>
      <div class="main-img">
        <img id="main-img" :src="currentImage" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentImage: "",
      images: [
        "https://media.istockphoto.com/photos/orange-picture-id185284489",
        "https://media.istockphoto.com/photos/red-apple-picture-id184276818",
        "https://media.istockphoto.com/photos/green-apple-fruit-with-green-leaf-isolated-on-white-picture-id920478620",
      ],
    };
  },
  methods: {
    changeImage(i) {
      let mainImg = document.getElementById("main-img");
      mainImg.style.opacity = 0;
      this.currentImage = this.images[i];
      mainImg.style.opacity = 1;
    },
  },
  mounted() {
    this.currentImage = this.images[0];
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
