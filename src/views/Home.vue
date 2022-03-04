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

export default {
  name: "Home",
  components: {
    ProgressSlider,
    ProductSilder,
    CatrgoriesHome,
  },
  data() {
    return {
      provider: localStorage.getItem("provider"),
    };
  },
  mounted() {
    this.makeLoginSocail();
    this.emailVerify();
  },
  methods: {
    makeLoginSocail() {
      if (this.$route.query.code && !this.$route.query.uuid) {
        const payload = {
          redirect: this.mainDoamin,
          code: this.$route.query.code,
        };
        auth
          .makeLoginSocail("b2c", this.provider, payload)
          .then(async (res) => {
            await localStorage.setItem("userInfo",JSON.stringify(res.data.items));
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

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
            this.$bvToast.toast(res.data.message, {
              variant: "success",
              title: "success",
              autoHideDelay: 5000,
            });
            localStorage.removeItem("massege");
            location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
<style scoped>
h1:first-letter {
  text-transform: uppercase;
}
</style>
