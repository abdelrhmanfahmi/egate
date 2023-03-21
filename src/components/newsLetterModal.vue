<template>
  <!-- b2c , b2b (buyer) , guest modal appears in home page  -->
  <div class="">
    <div class="" v-if="newsletterShow && ImageUrl">
      <div class="">
        <div class="container newsletter-popup-container" id="newsletter-popup-form">
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="row justify-content-center align-items-center newsletter-popup-content">
                <div class="col-12">
                  <img :src="ImageUrl" height="420" class="newsletter-img" width="800" alt="ad" />
                </div>
              </div>
            </div>
          </div>
          <button title="Close (Esc)" type="button" class="mfp-close" @click="closeModal">
            <!-- <span>×</span> -->
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
          <div class="viewProduct" v-if="newsletterShow.model_type === 'product'">
            <router-link :to="{ path: 'details', query: { id: newsletterShow.model_id } }" class="">
              <b><span>{{ $t("profile.viewDetails") }}
                  <font-awesome-icon icon="fa-solid fa-store" /></span></b>
            </router-link>
          </div>
          <div class="viewProduct" v-if="newsletterShow.model_type === 'category'">
            <router-link :to="`categories/${newsletterShow.model_id}`" class="">
              <b><span>{{ $t("profile.viewDetails") }}
                  <font-awesome-icon icon="fa-solid fa-store" /></span></b>
            </router-link>
          </div>
          <div class="viewProduct" v-if="newsletterShow.model_type === 'supplier'">
            <router-link :to="`suppliers/${newsletterShow.model_id}`" class="">
              <b><span>{{ $t("profile.viewDetails") }}
                  <font-awesome-icon icon="fa-solid fa-store" /></span></b>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data: function () {
    return {
      checkState: false,
      isLoaded: false,
      loadingPercent: 0,
      loadTime: 0,
      interval: null,
    };
  },
  watch: {
    /**
     * @vuese
     *   watch route
     */
    $route: function () {
      this.$emit("close");
    },
    /**
     * @vuese
     *   check when page loaded
     */
    loadingPercent(val) {
      if (val >= 100) {
        clearInterval(this.interval);
      }
    },
  },
  methods: {
    ...mapMutations("demo", { hideNewsletter: "HIDE_NEWSLETTER" }),
    /**
     *  close modal
     */
    closeModal: function () {
      this.$emit("close");
    },
    /**
     *   check when page loaded
     */
    doProgress() {
      let step = this.loadTime / 100;
      this.interval = setInterval(() => {
        this.loadingPercent++;
      }, step);
    },
  },
  /**
   *  pass add modal data as prop
   */
  props: ["newsletterShow", "ImageUrl"],
  mounted() {
    /**
     *  start check when page loaded
     */
    console.log('this.ImageUrl', this.ImageUrl);
    let perfData = window.performance.timing;
    let estimatedTime = Math.abs(
      perfData.loadEventEnd - perfData.navigationStart
    );
    this.loadTime = parseInt((estimatedTime / 1000) % 60) * 100;
    this.doProgress();

    /**
     *  end check when page loaded
     */
  },
  computed: {
    loaded() {
      return this.loadingPercent + "%";
    },
  },
};
</script>
