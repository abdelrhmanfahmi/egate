<template>
  <div
    class="container newsletter-popup-container"
    id="newsletter-popup-form"
    v-if="isLoaded"
  >
    <div class="row justify-content-center">
      <div class="col-12">
        <!-- <div class="row no-gutters bg-white newsletter-popup-content"> -->
        <div
          class="row justify-content-center align-items-center newsletter-popup-content"
        >
          <div class="col-12">
            <b-img-lazy
              :src="supplierAds.bannar"
              height="420"
              class="newsletter-img"
              width="800"
              alt="supplier-ad"
              @load="onImgLoad"
            ></b-img-lazy>
          </div>
        </div>
      </div>
    </div>
    <button
      title="Close (Esc)"
      type="button"
      class="mfp-close"
      @click="closeModal"
    >
      <!-- <span>×</span> -->
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </button>
    <div class="viewProduct" v-if="supplierAds.product_id">
      <b-button class="p-0 m-0" @click="postSupplierShowenAd">
        <b
          ><span
            >{{ $t("profile.viewDetails") }}
            <font-awesome-icon icon="fa-solid fa-store" /> </span
        ></b>
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
    };
  },
  watch: {
    $route: function () {
      this.$emit("close");
    },
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
  },
  props: ["supplierAds"],
};
</script>
