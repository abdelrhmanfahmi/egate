<template>
  <div class="product-gallery product-gallery-vertical">
    <div class="row m-0">
      <v-row class="" v-if="product">
        <v-col cols="12" md="2" sm="12" class="thumbnails-holder">
          <div id="product-zoom-gallery" class="product-image-gallery">
            <a class="product-gallery-item h-100 h-lg-auto carousel-dot p-0 m-0"
              :class="{ active: currentIndex == index }" href="#" v-for="(smPicture, index) in product.images" :key="index"
              @click.prevent="changePicture(index)">
              <img :src="smPicture.full_url" width="75" height="75" alt="product side" class="p-0 m-0" />
            </a>
          </div>
        </v-col>
        <v-col cols="12" md="10" sm="12" class="main-image-holder">
          <figure class="product-main-image position-relative">
            <span class="product-label label-new position-absolute" v-if="product.status == 'new'">New</span>
            <span class="product-label label-sale position-absolute" v-if="product.status == 'sale'">Sale</span>
            <span class="product-label label-top position-absolute" v-if="product.status == 'top'">Top</span>
            <span class="product-label label-out position-absolute out-of-stock" v-if="product.in_stock == false">Out Of Stock</span>

            <v-img id="product-zoom" v-if="product.images &&
             product.images[currentIndex] &&
             product.images[currentIndex].full_url"
             :lazy-src="product.images[currentIndex].full_url"
             :src="product.images[currentIndex].full_url" alt="product"
              class="img-fluid"></v-img>

              <v-img id="product-zoom" v-else
             :lazy-src="product.image"
             :src="product.image" alt="product"
              class="img-fluid"></v-img>
              <a href="#" id="btn-product-gallery" class="btn-product-gallery" @click.prevent="openLightBox">
                <i class="icon-arrows"></i>
              </a>
          </figure>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
sm_pictures: []
export default {
  data: function () {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    changePicture: function (index) {
      this.currentIndex = index;
    },
    openLightBox: function () {
      this.$refs.lightbox.showImage(this.currentIndex);
    },
  },
  props:['product']
};
</script>
<style lang="scss" scoped>
.product-image-gallery {
  display: flex;
  flex-flow: row wrap;
  margin-left: -0.5rem;
  margin-right: -0.5rem;

}

.product-image-gallery,
.product-main-image {
  width: 100%;
  overflow: hidden;

  @media (max-width: 992px) {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    margin: 0;
    padding: 0;
  }
}

.thumbnails-holder {
  order: 2;
}

.main-image-holder {
  order: 3;
}

@media (max-width: 992px) {
  .thumbnails-holder {
    order: 3;
  }

  .main-image-holder {
    order: 2;
  }
}

#product-zoom {
  transition: all .3s ease-in-out;
}

.product-main-image:hover {
  #product-zoom {
    transform: scale(1.2);
  }
}

.product-main-image {
  border: 1px solid #A3A3A1;
  border-radius: 15px;
}

.product-image-gallery a {
  overflow: hidden;
  width: 100%;
  height: 41% !important;
  display: flex;
  margin: 5px 0;
  border-radius: 10px;

  img {
    border-radius: 10px;
  }
}

a.active {
  img {
    border: 2px solid $main-color;
  }
}
</style>
