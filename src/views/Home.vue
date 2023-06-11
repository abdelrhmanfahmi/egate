<template>
  <!-- home page  -->
  <div class="home">

    <!-- new search  -->

    <NewHomeSearch />
    <!-- new slider  -->
    <NewHomeSlider />
    <!-- New Daily Offers section  -->
    <NewDailyOffers />

    
    <NewCategoriesTabs />
    <!-- <NewMonthlyOffers /> -->

    <!-- <ProductSilder /> -->
    <NewProductSilder />
    <NewAppsDownloadSec />
    <SuppliersSlider />
    <!-- <ClientsSlider /> -->
  </div>
</template>

<script>
// home page
import auth from "@/services/auth";
import NewProductSilder from "@/components/pages/home/NewProductSlider";
import SuppliersSlider from "@/components/pages/home/SuppliersSlider";

import NewCategoriesTabs from "@/components/pages/home/NewCategoriesTabs.vue";

import NewsLetterModal from "@/components/newsLetterModal.vue";
import supplierAdsModal from "@/components/supplierAdsModal.vue";
import NewHomeSearch from "@/components/pages/home/NewSearch.vue";
import NewHomeSlider from "@/components/pages/home/NewHomeSlider.vue";
import NewDailyOffers from "@/components/pages/home/NewDailyOffers.vue";
import NewAppsDownloadSec from "@/components/pages/home/NewAppsDownloadSec.vue";

export default {
  name: "Home",
  components: {
    NewProductSilder,
    SuppliersSlider,
    NewCategoriesTabs,
    NewHomeSearch,
    NewHomeSlider,
    NewDailyOffers,
    NewAppsDownloadSec,
  },

  methods: {
    /**
     * @vuese
     * this function used to Verify email
     */
    emailVerify() {
      if (this.$route.query.uuid) {
        const payload = {
          uuid: this.$route.query.uuid,
          email: this.$route.query.email,
          code: this.$route.query.code,
        };
        auth
          .emailVerify(payload)
          .then((res) => {
            this.sucessMsg(res.data.message);
            localStorage.removeItem("massege");
            location.reload();
          })
      }
    },
    // Step 2 forget Password
    /**
     * @vuese
     * this function used to check Email Forget PassWord
     */
    checkEmailForgetPassWord() {
      if (this.$route.query.email && this.$route.query.token) {
        const payload = {
          email: this.$route.query.email,
          token: this.$route.query.token,
        };
        auth
          .checkEmailForgetPassWord(payload)
          .then((res) => {
            this.sucessMsg(res.data.message);
            this.$router.push("/Forget-Password");
          })
      }
    },
    /**
     * @vuese
     * this function used to get Supplier Ads
     */
    async getSupplierAds() {
      await auth
        .getSupplierAds()
        .then((res) => {
          this.supplierAds = res.data.items.ads[0];
          if (
            res.data.items.ads.length > 0 &&
            res.data?.items?.ads[0]?.bannar
          ) {
            this.existSupplierAds = true;
            this.showSupplierADsModal();
          } else {
            this.existSupplierAds = false;
            if (this.main_banner) {
              this.getAdsModal();
            }
          }
        })
    },
    /**
     * @vuese
     * this function used to get Ads for buyer and b2c and guest
     */
    async getAdsModal() {
      if (
        (this.buyerUserData && this.buyerUserData.type === "buyer") ||
        (this.buyerUserData && this.buyerUserData.type === "supplier")
      ) {
        let payload = {
          type: "b2b",
        };
        await auth
          .getAdsModal(payload)
          .then((res) => {
            this.newsletterShow = res.data.items;
          })
          .then(() => {
            this.showADsModal()
          })
      } else if (this.buyerUserData && this.buyerUserData.type === "b2c") {
        let payload = {
          type: "b2c",
        };
        await auth
          .getAdsModal(payload)
          .then((res) => {
            this.newsletterShow = res.data.items;
          })
          .then(() => {
            this.showADsModal()
          })
      } else if (!this.buyerUserData) {
        let payload = {
          type: "b2c",
        };
        await auth
          .getGuestAdsModal(payload)
          .then((res) => {
            this.newsletterShow = res.data.items;
          }).then(() => {
            this.showADsModal()
          })
      }
    },
    /**
     * @vuese
     * this function used to login as buyer if you aren't and want to see corporate Categories
     */
    loginAsBuyer() {
      this.$router.push("/b2b-register");
    },
    showSupplierADsModal() {
      if (this.$route.path == "/" && this.supplierAds?.bannar) {
        setTimeout(() => {
          let ImageUrl = "";
          fetch(this.supplierAds.bannar)
            //                         vvvv
            .then((response) => response.blob())
            .then((imageBlob) => {
              // Then create a local URL for that image and print it
              const imageObjectURL = URL.createObjectURL(imageBlob);
              ImageUrl = imageObjectURL;
            })
            .then(() => {
              this.$modal.show(
                supplierAdsModal,
                {
                  supplierAds: this.supplierAds,
                  ImageUrl: ImageUrl,
                },
                { width: "970", height: "auto", adaptive: true }
              );
            });
        }, 5000);
      }
    },
    showADsModal() {
      if (
        this.$route.path == "/" &&
        this.newsletterShow &&
        this.newsletterShow.image_path
      ) {
        setTimeout(() => {
          let ImageUrl = "";
          fetch(this.newsletterShow.image_path)
            //                         vvvv
            .then((response) => response.blob())
            .then((imageBlob) => {
              // Then create a local URL for that image and print it
              const imageObjectURL = URL.createObjectURL(imageBlob);
              ImageUrl = imageObjectURL;
            })
            .then(() => {
              this.$modal.show(
                NewsLetterModal,
                {
                  newsletterShow: this.newsletterShow,
                  ImageUrl: ImageUrl,
                },
                { width: "970", height: "auto", adaptive: true }
              );
            });
        }, 5000);
      }
    },
  },
  data() {
    return {
      newsletterShow: null,
      supplierAds: null,
      existSupplierAds: true,
    };
  },
  created() {
    if (this.banner_ads) {
      this.getSupplierAds();
    } else {
      if (this.main_banner) {
        this.getAdsModal();
      }
    }
  },
  mounted() {

    this.emailVerify();
  },
};
</script>
<style lang="scss" scoped>
h1:first-letter {
  text-transform: uppercase;
}
</style>
