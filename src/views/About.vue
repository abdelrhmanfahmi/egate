<template>
  <div>
    <v-app>
      <section class="styleCssSection" :style="{
        'background-image': 'url(' + require(`../assets/images/home/headerAbout.png`) + ')'
      }">
        <div class="row h-100">
          <div class="col-sm-12 col-md-6 col-lg-6 col-lg-6 d-flex justify-content-center align-items-center">
            <img :src="require('@/assets/images/home/logoAbout.png')" class="styleImageWidthHeight" alt="">
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 col-lg-6 d-flex justify-content-center align-items-center my-5"
            v-for="(about, index) in aboutData" :key="index">
            <div>
              <h2 class="text-white">{{ about.value }}</h2>
              <p class="description">{{ about.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="styleSectionTwo mb-5">
        <div class="row h-100">
          <div class="col-sm-12 col-md-6 col-lg-6 col-lg-6">
            <img :src="require('@/assets/images/home/shoppingAbout.png')" class="styleImageWidthHeightSecond" alt="">
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 col-lg-6 styleBackSectionTwo">
            <div>
              <h1 class="styleFontOffer">What Do We Offer In Our Online Store ?</h1>
              <br>
              <br>
              <ul>
                <li v-for="i in 5" :key="i">
                  <p>
                    <span>
                      <img :src="require('@/assets/images/home/checkmark.png')" alt="">
                    </span>
                    &nbsp;&nbsp;
                    Lorem Ipsum
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="styleSectionTwo pt-5 mb-5">
        <div class="row h-100">
          <div class="col-md-12 text-center mb-5">
            <h1 class="styleFontOffer">Authorized Clients Of Our Services</h1>
          </div>
          <div class="col-md-3 d-flex justify-content-center">
            <img :src="require('@/assets/images/home/MaskGroup17.png')" class="styleImageWidthHeight" alt="">
          </div>
          <div class="col-md-3 d-flex justify-content-center">
            <img :src="require('@/assets/images/home/MaskGroup17.png')" class="styleImageWidthHeight" alt="">
          </div>
          <div class="col-md-3 d-flex justify-content-center">
            <img :src="require('@/assets/images/home/MaskGroup17.png')" class="styleImageWidthHeight" alt="">
          </div>
          <div class="col-md-3 d-flex justify-content-center">
            <img :src="require('@/assets/images/home/MaskGroup17.png')" class="styleImageWidthHeight" alt="">
          </div>
          <div class="col-md-3 d-flex justify-content-center">
            <img :src="require('@/assets/images/home/MaskGroup17.png')" class="styleImageWidthHeight" alt="">
          </div>
          <div class="col-md-3 d-flex justify-content-center">
            <img :src="require('@/assets/images/home/MaskGroup17.png')" class="styleImageWidthHeight" alt="">
          </div>
          <div class="col-md-3 d-flex justify-content-center">
            <img :src="require('@/assets/images/home/MaskGroup17.png')" class="styleImageWidthHeight" alt="">
          </div>
          <div class="col-md-3 d-flex justify-content-center">
            <img :src="require('@/assets/images/home/MaskGroup17.png')" class="styleImageWidthHeight" alt="">
          </div>
        </div>
      </section>

    </v-app>
  </div>
</template>
<script>
import home from "@/services/home";
import { useMeta } from "vue-meta";
export default {
  mounted() {
    this.getAboutData();
  },

  setup() {
    useMeta({
      title: "About",
      htmlAttrs: { lang: "en", amp: true },
    });
  },

  data() {
    return {
      items: [
        {},
        {
          title: "ABOUT US",
          disabled: true,
          href: "about",
        },
      ],
      aboutData: []
    };
  },

  methods: {
    async getAboutData() {
      const response = await home.getSettings();
      let arrayFilterAboutData = response.data.items.data.filter((el) => {
        return el.key == 'about_us';
      });
      this.aboutData = arrayFilterAboutData;
    }
  }
};
</script>

<style lang="scss" scoped>
.styleFontOffer {
  font-size: 50px;
}

.styleImageWidthHeightSecond {
  width: 106.5%;
  height: 100%;
}

.styleCssSection {
  height: 60vh;
}

.styleBackSectionTwo {
  background-color: #e1f4f7;
  height: 74%;
  padding: 2rem;
  margin-bottom: 11rem;
}

.styleSectionTwo {
  background-color: #F2F5F7;
}

.description {
  line-height: 2.5;
  color: #fff;
}

img.img-responsive {
  width: 100%;
  min-height: 300px;
  object-fit: cover;
}

.images-holder {
  position: relative;

  @media (max-width: 960px) {
    justify-content: space-between;
    align-items: center;
  }

  .top-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 65%;
    z-index: 2;

    img {
      width: 100%;
    }

    @media (max-width: 960px) {
      position: relative;
      transform: none;

      img {
        width: 90% !important;
      }
    }
  }

  .bottom-image {
    z-index: 1;
    position: absolute;
    top: 30%;
    right: 0;
    transform: translate(0%, 30%);
    width: 65%;

    img {
      width: 100%;
    }

    @media (max-width: 960px) {
      position: relative;
      transform: none;

      img {
        width: 90% !important;
      }
    }
  }
}

.wrapper * {
  text-transform: capitalize;
}

@media only screen and (width: 360px) {
  .styleCssSection {
    height: 75vh;
  }
}

@media only screen and (width: 375px) {
  .styleCssSection {
    height: 83vh;
  }
}

@media only screen and (width: 390px) {
  .styleCssSection {
    height: 65vh;
  }
}

@media only screen and (width: 393px) {
  .styleCssSection {
    height: 65vh;
  }
}

@media only screen and (width: 540px) {
  .styleCssSection {
    height: 76vh;
  }
}

@media only screen and (max-width: 600px) {
  .styleImageWidthHeight {
    width: 90%;
    height: 90%;
  }

  .styleImageWidthHeightSecond {
    width: 90%;
    height: 90%;
  }

  .styleFontOffer {
    font-size: 20px;
  }
}

@media only screen and (min-width: 768px) and (max-width: 1023px) {
  .styleImageWidthHeight {
    width: 90%;
    height: 90%;
  }

  .styleImageWidthHeightSecond {
    width: 108%;
    height: 100%;
  }

  .styleBackSectionTwo {
    margin-bottom: 4.5rem;
  }

  .styleCssSection {
    height: 50vh;
  }

  .styleFontOffer {
    font-size: 20px;
  }
}

@media only screen and (width: 912px) {
  .styleCssSection {
    height: 42vh;
  }

  .styleImageWidthHeightSecond {
    width: 107%;
  }
}
</style>