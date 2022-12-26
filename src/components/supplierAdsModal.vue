<template>
  <!-- supplier add modal appears in home page -->
  <div class="container newsletter-popup-container" id="newsletter-popup-form" v-if="isLoaded && supplierAds && supplierAds.bannar">
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="row justify-content-center align-items-center newsletter-popup-content">
          <div class="col-12">
            <img :src="supplierAds.bannar" height="420" class="newsletter-img" width="800" alt="supplier-ad"
              @load="onImgLoad" />
          </div>
        </div>
      </div>
    </div>
    <button title="Close (Esc)" type="button" class="mfp-close" @click="closeModal">
      <!-- <span>×</span> -->
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </button>
    <div class="viewProduct" v-if="supplierAds.product_id">
      <b-button class="p-0 m-0" @click="postSupplierShowenAd">
        <b><span>{{ $t("profile.viewDetails") }}
            <font-awesome-icon icon="fa-solid fa-store" /> </span></b>
      </b-button>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import auth from "@/services/auth";
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
     /**
      * @vuese
      *   check when page loaded
    */
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
    /**
     * @vuese
      *  close modal
    */
    closeModal: function () {
      this.$emit("close");
      this.postSupplierShowenAd();
    },
    /**
     * @vuese
      *   send supplier wa shown the add to backend
    */
    postSupplierShowenAd() {
      auth
        .postSupplierShowenAd(this.supplierAds.id)
        .then(() => {
          this.$router.push({
            path: "details",
            query: { id: this.supplierAds.product_id },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
      *   check when image loaded
    */
    onImgLoad() {
      return (this.isLoaded = true);
    },
    /**
     * @vuese
      *   check when page loaded
    */
    doProgress() {
      let step = this.loadTime / 100;
      this.interval = setInterval(() => {
        this.loadingPercent++
      }, step);
    }
  },
  props: ["supplierAds"],
  mounted() {
    /**
      *   start check when page loaded
    */
    let perfData = window.performance.timing;
    let estimatedTime = Math.abs(perfData.loadEventEnd - perfData.navigationStart);
    this.loadTime = parseInt((estimatedTime / 1000) % 60) * 100;
    this.doProgress();

    /**
      *   end check when page loaded
    */

  },
  computed: {
    /**
      *  check when page loaded
    */
    loaded() {
      return this.loadingPercent + '%'
    }
  },
};
</script>
