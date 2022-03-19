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
    // this.checkEmailForgetPassWord()
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
  },
};
</script>
<style scoped>
h1:first-letter {
  text-transform: uppercase;
}
</style>
