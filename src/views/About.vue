<template>
  <div>
    <v-app>
      <section class="styleCssSection" :style="{
        'background-image': 'url(' + require(`../assets/images/home/headerAbout.png`) + ')'
      }">
        <div class="row h-100 w-100">
          <div class="col-sm-12 col-md-6 col-lg-6 col-lg-6 d-flex justify-content-center align-items-center pt-3"
            v-for="(logo, idx) in logoAbout" :key="idx">
            <img :src="logo.image" class="styleImageWidthHeight" alt="">
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 col-lg-6 d-flex justify-content-center align-items-center my-5"
            v-for="(about, index) in aboutData" :key="index">
            <div>
              <h2 class="text-white" v-if="$i18n.locale == 'en'" v-html="about.value_en"></h2>
              <h2 class="text-white" v-else v-html="about.value_ar"></h2>
              <p class="description text-white" v-if="$i18n.locale == 'en'" v-html="about.description_en"></p>
              <p class="description text-white" v-else v-html="about.description_ar"></p>
            </div>
          </div>
        </div>
      </section>

      <section class="styleSectionTwo mb-5">
        <div class="row h-100 w-100">
          <div class="col-sm-12 col-md-6 col-lg-6 col-lg-6" v-for="(offerLogo, idx) in logoOffer" :key="idx">
            <img :src="offerLogo.image" class="styleImageWidthHeight" alt="">
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 col-lg-6 styleBackSectionTwo">
            <div v-for="(offer, index) in aboutData" :key="index">
              <h1 class="styleFontOffer">What Do We Offer In Our Online Store ?</h1>
              <br>
              <br>
              <div :class="{ styleOrderList: offer }" v-html="offer.website_offers">
              </div>
              <!-- <ul>
                <li v-for="i in 5" :key="i">
                  <p>
                    <span>
                      <img :src="require('@/assets/images/home/checkmark.png')" alt="">
                    </span>
                    &nbsp;&nbsp;
                    Lorem Ipsum
                  </p>
                </li>
              </ul> -->

            </div>
          </div>
        </div>
      </section>

      <section class="styleSectionTwo pt-5 mb-5">
        <div class="row h-100 w-100">
          <div class="col-md-12 text-center mb-5">
            <h1 class="styleFontOffer">Authorized Clients Of Our Services</h1>
          </div>
          <div class="col-md-3 d-flex justify-content-center mb-3" v-for="(logoClient, idx) in logoClients" :key="idx">
            <img :src="logoClient.image" class="styleImageWidthHeight" alt="">
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
    this.getBannersAbout();
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
      aboutData: [],
      logoAbout: [],
      logoOffer: [],
      logoClients: [],
    };
  },

  methods: {
    async getAboutData() {
      const response = await home.getSettings();
      let arrayFilterAboutData = response.data.items.data.filter((el) => {
        return el.key == 'about_us';
      });
      this.aboutData = arrayFilterAboutData;
    },
    async getBannersAbout() {
      const response = await home.getBanners();
      let arrayFilterLogoAbout = response.data.items.data.filter((el) => {
        return el.display_in == 'about_page_banner';
      });
      this.logoAbout = arrayFilterLogoAbout;

      let arrayFilterLogoOffer = response.data.items.data.filter((el) => {
        return el.display_in == 'about_page_offer';
      });
      this.logoOffer = arrayFilterLogoOffer;

      let arrayFilterLogoClients = response.data.items.data.filter((el) => {
        return el.display_in == 'about_page_clients';
      });
      this.logoClients = arrayFilterLogoClients;
    }
  }
};
</script>

<style lang="scss" scoped>
.styleOrderList>ol>li {
  list-style-type: none;
  color: blue;
}

.styleFontOffer {
  font-size: 50px;
}

.styleImageWidthHeight {
  width: 100%;
  height: 100%;
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
  color: #fff !important;
}

p {
  color: #5F5E58;
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
    height: 76vh;
  }
}

@media only screen and (width: 375px) {
  .styleCssSection {
    height: 85vh;
  }
}

@media only screen and (width: 390px) {
  .styleCssSection {
    height: 68vh;
  }
}

@media only screen and (width: 393px) {
  .styleCssSection {
    height: 67vh;
  }
}

@media only screen and (width: 412px) {
  .styleCssSection {
    height: 62vh;
  }
}

@media only screen and (width: 414px) {
  .styleCssSection {
    height: 63vh;
  }
}

@media only screen and (width: 540px) {
  .styleCssSection {
    height: 79vh;
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