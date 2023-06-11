<template>
  <div
    class="download-wrapper d-flex justify-content-center align-items-center foot py-4"
  >
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-6 col-sm-12 my-5">
          <div class="title">
            <h2 class="h1 mb-5 mt-0">{{ $t("home.downloadApp") }}</h2>
          </div>
          <div class="footer-social d-flex">
            <div v-if="google_play">
              <a :href="google_play.value" target="_blank">
                <img
                  src="@/assets/images/play_store1.png"
                  :alt="google_play.key"
                  class="download-img"
                />
              </a>
            </div>
            <div v-if="app_store" class="mx-4">
              <a :href="app_store.value" target="_blank">
                <img
                  src="@/assets/images/app_store1.png"
                  :alt="app_store.key"
                  class="download-img"
                />
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-sm-12">
          <div class="imag-holder">
            <img
              src="@/assets/images/mobile.png"
              alt=""
              srcset=""
              class="img-fluid download-image"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import profile from "@/services/profile";
export default {
  data() {
    return {
      google_play: null,
      app_store: null,
    };
  },
  methods: {
    /**
     * @vuese
     * get footer links
     */
    footerLinks() {
      profile
        .footerLinks()
        .then((res) => {
          this.links = res.data.items.data;
          for (let index = 0; index < res.data.items.data.length; index++) {
            const element = res.data.items.data[index];
            if (element.key === "google_play") {
              this.google_play = element;
            }
            if (element.key === "app_store") {
              this.app_store = element;
            }
          }
        })
    },
  },
  mounted() {
    this.footerLinks();
  },
};
</script>

<style lang="scss" scoped>
.download-wrapper {
  min-height: 500px;
  background: $main-color;
  color: #fff;
}
.download-image {
  height: 400px;
  width: 100%;
  object-fit: contain;
}
</style>
