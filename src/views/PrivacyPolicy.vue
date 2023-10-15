<template>
  <!-- privacy page  -->
  <div>
    <v-app>
      <div class="wrapper">
        <v-container>
          <v-breadcrumbs :items="items" class="text-gray">
            <template v-slot:prepend>
              <v-icon size="small" icon="mdi-home"></v-icon>
            </template>
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>

          <h1>PRIVACY POLICY</h1>
          <v-row>
            <v-col cols="12" lg="7" md="7" sm="12">
              <div v-for="(privacy, index) in privacies" :key="index" class="my-5">
                <h2>{{ privacy.value }}</h2>
                <p class="description">{{ privacy.description }}</p>
              </div>
            </v-col>
            <v-col cols="12" lg="5" md="5" sm="12">
              <div class="d-flex images-holder" justify="start">
                <div class="top-image">
                  <img :src="require('@/assets/images/home/Braun-Desktop-EN.png')" class="img-responsive" />
                </div>
                <div class="bottom-image">
                  <img :src="require('@/assets/images/home/Braun-Desktop-EN.png')" class="img-responsive" />
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-app>
  </div>
</template>

<script>
import home from "@/services/home";
import { useMeta } from "vue-meta";
export default {
  mounted() {
    this.getPrivacy();
  },

  setup() {
    useMeta({
      title: "Privacy-Policy",
      htmlAttrs: { lang: "en", amp: true },
    });
  },

  data() {
    return {
      items: [
        {},
        {
          title: "PRIVACY POLICY",
          disabled: true,
          href: "privacyPolicy",
        },
      ],
      privacies: []
    };
  },
  methods: {
    async getPrivacy() {
      const response = await home.getSettings();
      let arrayFilterPrivacyPolicy = response.data.items.data.filter((el) => {
        return el.key == 'privacy_policy';
      });
      this.privacies = arrayFilterPrivacyPolicy;
    }
  }

};
</script>

<style lang="scss" scoped>
.description {
  line-height: 1.7;
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
</style>
