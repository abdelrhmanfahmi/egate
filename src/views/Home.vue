<template>
  <div class="home">
    <h1>is login {{isLoggined}}</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import auth from "@/services/auth";

export default {
  name: "Home",
  components: {},
  mounted() {
    this.makeLoginSocail();
  },
  methods: {
    makeLoginSocail() {
      if (this.$route.query.code) {
        const payload = {
          redirect: "http://localhost:8081/",
          code: this.$route.query.code,
        };
        auth
          .makeLoginSocail("b2c", "google", payload)
          .then((res) => {
            window.location.href = res.data.items.url;
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