<template>
  <!-- home page  -->
  <div class="home">
    <!-- remove this according to new edit  -->
    <ProgressSlider />
    <!--(tabs) if user is b2c or guest  -->
    <div class="container text-center home-tabs"
      v-if="!buyerUserData || (buyerUserData && buyerUserData.type !== 'buyer')">
      <span class="categories-info py-5">
        <h5 class="top-header">{{ $t("profile.categories") }}</h5>
      </span>

      <div class="tabs-holder">
        <b-tabs content-class="mt-3">
          <b-tab :title="$t('home.consumerCategory')" active>
            <NewCatrgoriesHome />
          </b-tab>
          <b-tab :title="$t('home.corporateCategory')" @click="loginAsBuyer">
            <span></span>
          </b-tab>
        </b-tabs>
      </div>
    </div>
    <!-- if user is buyer  -->
    <div class="" v-else>
      <CatrgoriesHome />
    </div>

    <!-- <ProductSilder /> -->
    <NewProductSilder />
    <SuppliersSlider />
  </div>
</template>

<script>
// home page
import auth from "@/services/auth";
import ProgressSlider from "@/components/pages/home/ProgressSlider";
// import ProductSilder from "@/components/pages/home/ProductSilder";
import NewProductSilder from "@/components/pages/home/NewProductSlider";
import SuppliersSlider from "@/components/pages/home/SuppliersSlider";
import NewCatrgoriesHome from "@/components/pages/home/NewCategoriesHome";
import CatrgoriesHome from "@/components/pages/home/CatrgoriesHome";

import NewsLetterModal from "@/components/newsLetterModal.vue";
import supplierAdsModal from "@/components/supplierAdsModal.vue";

export default {
  name: "Home",
  components: {
    ProgressSlider,
    // ProductSilder,
    NewProductSilder,
    SuppliersSlider,
    CatrgoriesHome,
    NewCatrgoriesHome
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
          .catch((err) => {
            console.log(err);
          });
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
          .catch((err) => {
            console.log(err);
          });
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
          if (res.data.items.ads.length > 0 && res.data?.items?.ads[0]?.bannar) {
            this.existSupplierAds = true;
          } else {
            this.existSupplierAds = false;
            this.getAdsModal();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * @vuese
     * this function used to get Ads for buyer and b2c and guest
     */
    async getAdsModal() {
      if (this.buyerUserData && this.buyerUserData.type === "buyer" || this.buyerUserData && this.buyerUserData.type === "supplier") {
        let payload = {
          type: "b2b",
          // model_type: "product",
        };
        await auth
          .getAdsModal(payload)
          .then((res) => {
            this.newsletterShow = res.data.items;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.buyerUserData && this.buyerUserData.type === "b2c") {
        let payload = {
          type: "b2c",
        };
        await auth
          .getAdsModal(payload)
          .then((res) => {
            this.newsletterShow = res.data.items;
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (!this.buyerUserData) {
        let payload = {
          type: "b2c",
        };
        await auth
          .getGuestAdsModal(payload)
          .then((res) => {
            this.newsletterShow = res.data.items;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    /**
    * @vuese
    * this function used to login as buyer if you aren't and want to see corporate Categories
    */
    loginAsBuyer() {
      this.$router.push('/b2b-register')
    }
  },
  data() {
    return {
      newsletterShow: null,
      supplierAds: null,
      existSupplierAds: true,
    };
  },
  created() {
    this.getSupplierAds();
  },
  mounted() {
    setTimeout(() => {
      if (
        this.$route.path == "/" &&
        this.supplierAds?.bannar
      ) {

        this.$modal.show(
          supplierAdsModal,
          { supplierAds: this.supplierAds },
          { width: "970", height: "auto", adaptive: true }
        );
      }
    }, 5000);

    setTimeout(() => {
      if (
        this.$route.path == "/" &&
        this.newsletterShow &&
        this.newsletterShow.image_path
      ) {
        this.$modal.show(
          NewsLetterModal,
          { newsletterShow: this.newsletterShow },
          { width: "970", height: "auto", adaptive: true }
        );
      }
    }, 5000);

    this.emailVerify();
    // this.checkEmailForgetPassWord()
  },
};
</script>
<style lang="scss" scoped>
h1:first-letter {
  text-transform: uppercase;
}
</style>
