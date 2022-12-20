<template>
  <div class="home">
    <ProgressSlider />
    <CatrgoriesHome />
    <ProductSilder />
  </div>
</template>

<script>
// @ is an alias to /src
import auth from "@/services/auth";
import ProgressSlider from "@/components/pages/home/ProgressSlider";
import ProductSilder from "@/components/pages/home/ProductSilder";
import CatrgoriesHome from "@/components/pages/home/CatrgoriesHome";

import NewsletterModal from "@/components/newsLetterModal.vue";
import supplierAdsModal from "@/components/supplierAdsModal.vue";

export default {
  name: "Home",
  components: {
    ProgressSlider,
    ProductSilder,
    CatrgoriesHome,
  },

  methods: {
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

    async getSupplierAds() {
      await auth.getSupplierAds().then(res => {
        console.log(res);
        this.supplierAds = res.data.items.ads[0];
        if (res.data.items.ads.length > 0 && res.data.items.ads[0].banner) {
          this.existSupplierAds = true
        } else {
          this.existSupplierAds = false
          this.getAdsModal()

        }
      }).catch(err => {
        console.log(err);
      })
    },

    async getAdsModal() {
      if (this.buyerUserData && this.buyerUserData.type === "buyer") {
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


  },
  data() {
    return {
      newsletterShow: null,
      supplierAds: null,
      existSupplierAds: true
    }
  },
  created() {
    this.getSupplierAds();
  },
  mounted() {

    setTimeout(() => {
      if (this.$route.path == '/' && this.supplierAds &&  this.supplierAds[0]?.bannar) {
        this.$modal.show(
          supplierAdsModal,
          { supplierAds: this.supplierAds },
          { width: "970", height: "auto", adaptive: true }
        );
      }
    }, 5000);



    setTimeout(() => {
      if (this.$route.path == '/' && this.newsletterShow && this.newsletterShow.image_path) {
        this.$modal.show(
          NewsletterModal,
          { newsletterShow: this.newsletterShow },
          { width: "970", height: "auto", adaptive: true }
        );
      }
    }, 5000);



    this.emailVerify();
    // this.checkEmailForgetPassWord()
  }
};
</script>
<style scoped>
h1:first-letter {
  text-transform: uppercase;
}
</style>
