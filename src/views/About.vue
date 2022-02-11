<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import auth from "@/services/auth";
export default {
  mounted() {
    this.getAllCountires();
  },
  methods: {
    getAllCountires() {
      auth.getAllCountires().then((res) => {
        console.log(res);
      }).catch((err) => {
          console.log(err);
      });
    },
  },
};
</script>
