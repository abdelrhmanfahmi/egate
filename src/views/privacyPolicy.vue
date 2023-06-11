<template>
  <!-- privacy & policy page  -->
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
// privacy policy page 
import profile from "@/services/profile";
export default {
  data() {
    return {
      privacy: null,
    };
  },
  methods: {
     /**
     * @vuese
     * this function used to get privacy and policy data
     */
    privacyPage() {
      profile
        .privacyPage()
        .then((res) => {
          this.privacy = res.data.items
        })
    },
  },
  mounted(){
    this.privacyPage()
  }
};
</script>
