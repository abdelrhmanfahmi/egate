<template>
  <div>
    <div class="container">
      <div class="text-center mt-3" v-if="privacy">
        <h1 v-if="privacy.title">
          {{privacy.title}}
        </h1>
        <p class="lead my-4" v-if="privacy.description" v-html="privacy.description"></p>
      </div>
    </div>
  </div>
</template>

<script>
import profile from "@/services/profile";
export default {
  data() {
    return {
      privacy: null,
    };
  },
  methods: {
    privacyPage() {
      profile
        .privacyPage()
        .then((res) => {
          console.log(res);
          this.privacy = res.data.items
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted(){
    this.privacyPage()
  }
};
</script>

<style></style>
