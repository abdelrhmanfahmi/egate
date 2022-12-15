<template>
  <div class="container newsletter-popup-container" id="newsletter-popup-form" v-if="isLoaded">
    <div class="row justify-content-center">
      <div class="col-12">
        <!-- <div class="row no-gutters bg-white newsletter-popup-content"> -->
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
      this.postSupplierShowenAd();
    },
    postSupplierShowenAd() {
      auth
        .postSupplierShowenAd(this.supplierAds.id)
        .then((res) => {
          console.log(res);
          this.$router.push({
            path: "details",
            query: { id: this.supplierAds.product_id },
          });
        })
        .catch((err) => {
          console.log(err);
        });
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
  props: ["supplierAds"],
  mounted() {
    let perfData = window.performance.timing;
    let estimatedTime = Math.abs(perfData.loadEventEnd - perfData.navigationStart);
    this.loadTime = parseInt((estimatedTime / 1000) % 60) * 100;
    this.doProgress();

  },
  computed: {
    loaded() {
      return this.loadingPercent + '%'
    }
  },
};
</script>
