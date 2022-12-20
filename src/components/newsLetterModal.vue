<template>
  <div class="container newsletter-popup-container" id="newsletter-popup-form" v-if="isLoaded && newsletterShow && newsletterShow.image_path">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="row justify-content-center align-items-center newsletter-popup-content">
          <div class="col-12">
            <img :src="newsletterShow.image_path" height="420" class="newsletter-img" width="800" alt="ad"
              @load="onImgLoad" />
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
      interval: null
    };
  },
  watch: {
    $route: function () {
      this.$emit("close");
    },
    loadingPercent(val) {
      if (val >= 100) {

        clearInterval(this.interval)
      }
      if (val >= 100 && this.newsletterShow?.image_path) {
        setTimeout(() => {
          this.onImgLoad()
        }, 6000);
      }
    }
  },
  methods: {
    ...mapMutations("demo", { hideNewsletter: "HIDE_NEWSLETTER" }),
    changeCheck: function () {
      this.checkState = !this.checkState;
    },
    closeModal: function () {
      if (this.checkState) {
        this.hideNewsletter();
      }

      this.$emit("close");
    },
    onImgLoad() {
      return (this.isLoaded = true);
    },
    doProgress() {
      let step = this.loadTime / 100;
      this.interval = setInterval(() => {
        this.loadingPercent++
      }, step);
    }
  },
  props: ["newsletterShow"],
  mounted() {
    let perfData = window.performance.timing;
    let estimatedTime = Math.abs(perfData.loadEventEnd - perfData.navigationStart);
    this.loadTime = parseInt((estimatedTime / 1000) % 60) * 100;
    this.doProgress();

    console.log('test me ' , this.newsletterShow.image_path);

  },
  computed: {
    loaded() {
      return this.loadingPercent + '%'
    }
  },
};
</script>
