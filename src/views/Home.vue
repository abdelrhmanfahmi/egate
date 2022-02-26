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
  },
  methods: {
    makeLoginSocail() {
      if (this.$route.query.code) {
        const payload = {
          redirect: this.mainDoamin,
          code: this.$route.query.code,
        };
        auth
          .makeLoginSocail("b2c", this.provider, payload)
          .then(async (res) => {
            await localStorage.setItem("token", res.data.items.access_token);
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
